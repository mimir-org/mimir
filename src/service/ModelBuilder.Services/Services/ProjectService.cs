using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using Mb.Models.Exceptions;
using Mb.Models.Extensions;
using Mb.Services.Contracts;
using Mb.Services.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Attribute = Mb.Models.Data.Attribute;

namespace Mb.Services.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly IProjectRepository _projectRepository;
        private readonly IAttributeRepository _attributeRepository;
        private readonly INodeRepository _nodeRepository;
        private readonly IEdgeRepository _edgeRepository;
        private readonly ITransportRepository _transportRepository;
        private readonly IInterfaceRepository _interfaceRepository;
        private readonly IConnectorRepository _connectorRepository;
        private readonly ICommonRepository _commonRepository;
        private readonly IModuleService _moduleService;
        private readonly IRemapService _remapService;
        private readonly ICooperateService _cooperateService;
        private readonly ILogger<ProjectService> _logger;

        public ProjectService(IProjectRepository projectRepository, IMapper mapper,
            IHttpContextAccessor contextAccessor, INodeRepository nodeRepository, IEdgeRepository edgeRepository,
            ICommonRepository commonRepository, IConnectorRepository connectorRepository, IModuleService moduleService,
            IAttributeRepository attributeRepository, ILogger<ProjectService> logger, IRemapService remapService, ICooperateService cooperateService, ITransportRepository transportRepository, IInterfaceRepository interfaceRepository)
        {
            _projectRepository = projectRepository;
            _mapper = mapper;
            _contextAccessor = contextAccessor;
            _nodeRepository = nodeRepository;
            _edgeRepository = edgeRepository;
            _commonRepository = commonRepository;
            _connectorRepository = connectorRepository;
            _moduleService = moduleService;
            _attributeRepository = attributeRepository;
            _logger = logger;
            _remapService = remapService;
            _cooperateService = cooperateService;
            _transportRepository = transportRepository;
            _interfaceRepository = interfaceRepository;
        }

        /// <summary>
        /// Get a list of simple projects sorted by last edited
        /// from start index and a max number that will be returned
        /// </summary>
        /// <param name="name"></param>
        /// <param name="from"></param>
        /// <param name="number"></param>
        /// <returns></returns>
        public IEnumerable<ProjectItemCm> GetProjectList(string name, int from, int number)
        {
            return _projectRepository.GetProjectList(name, from, number);
        }

        /// <summary>
        /// Get a project by id. The project will include all edges, nodes,
        /// attributes and connectors.
        /// The method wil throw a ModelBuilderNotFoundException if not exist
        /// </summary>
        /// <param name="id"></param>
        /// <param name="ignoreNotFound"></param>
        /// <returns></returns>
        public async Task<Project> GetProject(string id, bool ignoreNotFound = false)
        {
            var project = await _projectRepository.GetAsyncComplete(id);

            if (!ignoreNotFound && project == null)
                throw new ModelBuilderNotFoundException($"Could not find project with id: {id}");

            if (project == null)
                return null;

            if (project.Nodes != null)
            {
                project.Nodes = project.Nodes.OrderBy(x => x.Order).ToList();
                foreach (var node in project.Nodes)
                {
                    // TODO: Må gjøres på en bedre måte, generell via mapper
                    if (node.Attributes != null)
                    {
                        foreach (var attribute in node.Attributes)
                        {
                            if (!string.IsNullOrEmpty(attribute.UnitString))
                                attribute.Units =
                                    JsonConvert.DeserializeObject<ICollection<Unit>>(attribute.UnitString);

                        }

                        if (!string.IsNullOrEmpty(node.PurposeString))
                        {
                            node.Purpose = JsonConvert.DeserializeObject<Purpose>(node.PurposeString);
                        }
                    }
                    // TODO: Må gjøres på en bedre måte, generell via mapper
                    if (node.Connectors != null)
                    {
                        foreach (var connector in node.Connectors.OfType<Terminal>())
                        {
                            if (connector.Attributes != null)
                            {
                                foreach (var attribute in connector.Attributes)
                                {
                                    if (!string.IsNullOrEmpty(attribute.UnitString))
                                        attribute.Units =
                                            JsonConvert.DeserializeObject<ICollection<Unit>>(attribute.UnitString);
                                }
                            }
                        }
                    }
                    // TODO: Må gjøres på en bedre måte, generell via mapper
                    if (node.Composites != null)
                    {
                        foreach (var composite in node.Composites)
                        {
                            if (composite.Attributes != null)
                            {
                                foreach (var attribute in composite.Attributes)
                                {
                                    if (!string.IsNullOrEmpty(attribute.UnitString))
                                        attribute.Units =
                                            JsonConvert.DeserializeObject<ICollection<Unit>>(attribute.UnitString);
                                }
                            }
                        }
                    }

                }
            }

            return project;
        }

        /// <summary>
        /// Create a new empty project. The project wil include the aspect root nodes.
        /// </summary>
        /// <param name="createProject"></param>
        /// <returns></returns>
        public async Task<Project> CreateProject(CreateProject createProject)
        {
            var project = CreateInitProject(createProject, false);
            await _projectRepository.CreateAsync(project);
            await _projectRepository.SaveAsync();
            return project;
        }

        /// <summary>
        /// Create a new project based on an existing project. If project, node, edge or connector already exist,
        /// a ModelBuilderDuplicateException will be thrown.
        /// </summary>
        /// <param name="project"></param>
        /// <returns></returns>
        public async Task<Project> CreateProject(ProjectAm project)
        {
            try
            {
                var existingProject = await GetProject(project.Id, true);

                if (existingProject != null)
                    throw new ModelBuilderDuplicateException($"Project already exist - id: {project.Id}");

                if (_edgeRepository.GetAll().AsEnumerable().Any(x => project.Edges.Any(y => y.Id == x.Id)))
                    throw new ModelBuilderDuplicateException("One or more edges already exist");

                if (_nodeRepository.GetAll().AsEnumerable().Any(x => project.Nodes.Any(y => y.Id == x.Id)))
                    throw new ModelBuilderDuplicateException("One or more nodes already exist");

                var allConnectors = project.Nodes.AsEnumerable().SelectMany(x => x.Connectors).ToList();
                if (_connectorRepository.GetAll().AsEnumerable().Any(x => allConnectors.Any(y => y.Id == x.Id)))
                    throw new ModelBuilderDuplicateException("One or more connectors already exist");

                // Cast connectors
                CastConnectors(project);

                // Remap and create new id's
                _remapService.Remap(project);

                // Create an empty project
                var newProject = new Project
                {
                    ProjectOwner = _contextAccessor.GetName(),
                    UpdatedBy = _contextAccessor.GetName(),
                    Updated = DateTime.Now.ToUniversalTime()
                };

                // Map data
                _mapper.Map(project, newProject);

                await _projectRepository.CreateAsync(newProject);
                await _projectRepository.SaveAsync();

                var updatedProject = await GetProject(newProject.Id);
                ClearAllChangeTracker();
                return updatedProject;
            }
            catch (Exception e)
            {
                _logger.LogError($"Can not create project with name: {project?.Name}. Error: {e.Message}");
                throw;
            }
            finally
            {
                ClearAllChangeTracker();
            }
        }

        /// <summary>
        /// Create a new sub project based on an existing project. 
        /// </summary>
        /// <param name="subProjectAm"></param>
        /// <returns></returns>
        public async Task<Project> CreateProject(SubProjectAm subProjectAm)
        {
            string newCreatedProject = null;

            try
            {
                if (subProjectAm == null)
                    throw new ModelBuilderInvalidOperationException("Sub-project is null");

                var validation = subProjectAm.ValidateObject();
                if (!validation.IsValid)
                    throw new ModelBuilderBadRequestException($"Couldn't create sub-project with name: {subProjectAm.Name}", validation);

                var fromProject = await GetProject(subProjectAm.FromProjectId, true);
                if (fromProject == null)
                    throw new ModelBuilderInvalidOperationException("The original project does not exist");

                // Create a new initial project
                var subProjectToCreate = new CreateProject
                {
                    Name = subProjectAm.Name,
                    Description = subProjectAm.Description
                };

                var toProject = CreateInitProject(subProjectToCreate, true);
                await _projectRepository.CreateAsync(toProject);
                await _projectRepository.SaveAsync();
                newCreatedProject = toProject.Id;

                // Remap project
                var subProject = _remapService.Remap(fromProject, toProject, subProjectAm.Nodes, subProjectAm.Edges);

                // Clean the change tracker
                ClearAllChangeTracker();

                var subProjectCreated = await UpdateProject(toProject.Id, subProject, _commonRepository.GetDomain());

                // Clean the change tracker
                ClearAllChangeTracker();

                return subProjectCreated;
            }
            catch (Exception e)
            {
                try
                {
                    // Project is already created, delete the project from db
                    if (!string.IsNullOrEmpty(newCreatedProject))
                    {
                        ClearAllChangeTracker();
                        await DeleteProject(newCreatedProject);
                        await _projectRepository.SaveAsync();
                    }
                }
                catch
                {
                    // ignored
                }

                _logger.LogError($"Can not create sub project with name: {subProjectAm?.Name}. Error: {e.Message}");
                throw;
            }
            finally
            {
                ClearAllChangeTracker();
            }
        }

        /// <summary>
        /// Update a project, if the project does not exist, a ModelBuilderNotFoundException will be thrown.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="projectAm"></param>
        /// <param name="invokedByDomain"></param>
        /// <returns></returns>
        public async Task<Project> UpdateProject(string id, ProjectAm projectAm, string invokedByDomain)
        {
            if (string.IsNullOrWhiteSpace(invokedByDomain))
                throw new ModelBuilderInvalidOperationException("Domain can't be null or empty");
            try
            {
                var originalProject = await _projectRepository.GetAsyncComplete(id);

                if (originalProject == null)
                    throw new ModelBuilderNotFoundException($"The project with id:{id}, could not be found.");

                // Cast connectors
                CastConnectors(projectAm);

                // Remap and create new id's
                _remapService.Remap(projectAm);

                // Edges
                var existingEdges = originalProject.Edges.ToList();
                var deleteEdges = existingEdges.Where(x => projectAm.Edges.All(y => y.Id != x.Id)).ToList();
                var edgeChangeMap = await _edgeRepository.DeleteEdges(deleteEdges, projectAm.Id, invokedByDomain);

                // Nodes
                var existingNodes = originalProject.Nodes.ToList();
                var deleteNodes = existingNodes.Where(x => projectAm.Nodes.All(y => y.Id != x.Id)).ToList();
                var nodeChangeMap = _nodeRepository.DeleteNodes(deleteNodes, projectAm.Id, invokedByDomain);

                //Determine if project version should be incremented
                SetProjectVersion(originalProject, projectAm);

                // Map new data
                _mapper.Map(projectAm, originalProject);

                nodeChangeMap = nodeChangeMap.Concat(_nodeRepository.UpdateInsert(existingNodes, originalProject, invokedByDomain)).ToList();
                edgeChangeMap = edgeChangeMap.Concat(_edgeRepository.UpdateInsert(existingEdges, originalProject, invokedByDomain)).ToList();

                ResolveLevelAndOrder(originalProject);

                _projectRepository.Update(originalProject);

                await _projectRepository.SaveAsync();
                await _cooperateService.SendNodeUpdates(nodeChangeMap.ToList(), originalProject.Id);
                await _cooperateService.SendEdgeUpdates(edgeChangeMap.ToList(), originalProject.Id);
            }
            catch (Exception e)
            {
                _logger.LogError($"Can not update project with id: {id}. Error: {e.Message}");
                throw;
            }
            finally
            {
                ClearAllChangeTracker();
            }

            // Return project from database
            return await GetProject(id);
        }

        /// <summary>
        /// Delete a project from given id
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public async Task DeleteProject(string projectId)
        {
            var existingProject = await GetProject(projectId);
            if (existingProject == null)
                throw new ModelBuilderNotFoundException($"There is no project with id: {projectId}");

            _ = await _edgeRepository.DeleteEdges(existingProject.Edges, projectId, _commonRepository.GetDomain());
            _ = _nodeRepository.DeleteNodes(existingProject.Nodes, projectId, _commonRepository.GetDomain());
            await _projectRepository.Delete(projectId);
            await _projectRepository.SaveAsync();
        }

        /// <summary>
        /// Create a json byte array based on project id
        /// </summary>
        /// <param name="projectId"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<(byte[] file, FileFormat format)> CreateFile(string projectId, Guid id)
        {
            var project = await GetProject(projectId);

            if (_moduleService.Modules.All(x => x.ModuleDescription != null && x.ModuleDescription.Id != Guid.Empty && !string.Equals(x.ModuleDescription.Id.ToString(), id.ToString(), StringComparison.CurrentCultureIgnoreCase)))
                throw new ModelBuilderModuleException($"There is no parser with id: {id}");

            var par = _moduleService.Resolve<IModelBuilderParser>(id);
            var data = await par.SerializeProject(project);
            return (data, par.GetFileFormat());
        }

        /// <summary>
        /// Lock or unlock an attribute
        /// </summary>
        /// <param name="lockUnlockEdgeAm"></param>
        /// <param name="save"></param>
        /// <returns>Status204NoContent</returns>
        public async Task LockUnlockEdge(LockUnlockEdgeAm lockUnlockEdgeAm, bool save)
        {
            if (string.IsNullOrWhiteSpace(lockUnlockEdgeAm?.Id) || string.IsNullOrWhiteSpace(lockUnlockEdgeAm.ProjectId))
                throw new ModelBuilderBadRequestException($"Error locking/unlocking Edge: Id or projectId can't be null or empty.");

            lockUnlockEdgeAm.IsLockedStatusBy = _contextAccessor.GetName();
            lockUnlockEdgeAm.IsLockedStatusDate = DateTime.Now.ToUniversalTime();

            var edge = await _edgeRepository.GetAsync(lockUnlockEdgeAm.Id);

            //Edge lock/unlockt
            if (edge != null)
            {
                edge.IsLocked = lockUnlockEdgeAm.IsLocked;
                edge.IsLockedStatusBy = lockUnlockEdgeAm.IsLockedStatusBy;
                edge.IsLockedStatusDate = lockUnlockEdgeAm.IsLockedStatusDate;

                if(save)
                    await _edgeRepository.SaveAsync();
            }

            //Send edge to client via webSocket 
            await _cooperateService.SendLockUnlockEdgeUpdates(
                new List<(LockUnlockEdgeAm am, WorkerStatus workerStatus)> { (lockUnlockEdgeAm, WorkerStatus.Update) }, lockUnlockEdgeAm.ProjectId);

            //Find all edge attributes
            var edgeConnectors = _connectorRepository.GetAll(false).Where(x => x.Id == edge.FromConnectorId || x.Id == edge.ToConnectorId);
            var transportObject = _transportRepository.FindBy(x => x.Id == edge.TransportId)?.FirstOrDefault() ?? new Transport();
            var interfaceObject = _interfaceRepository.FindBy(x => x.Id == edge.InterfaceId)?.FirstOrDefault() ?? new Interface();

            var edgeAttributes = _attributeRepository.GetAll(false)
                .Where(x => edgeConnectors.Any(y => y.Id == x.TerminalId) ||
                            x.TerminalId == transportObject.InputTerminalId  ||
                            x.TerminalId == transportObject.OutputTerminalId ||
                            x.TerminalId == interfaceObject.InputTerminalId ||
                            x.TerminalId == interfaceObject.OutputTerminalId);

            //Lock/unlock all edge attributes
            foreach (var attribute in edgeAttributes)
            {
                var lockUnlockAttribute = new LockUnlockAttributeAm { Id = attribute.Id, IsLocked = lockUnlockEdgeAm.IsLocked};
                await LockUnlockAttribute(lockUnlockAttribute, false);
            }

            if(save)
                await _attributeRepository.SaveAsync();
        }

        /// <summary>
        /// Lock or unlock an attribute
        /// </summary>
        /// <param name="lockUnlockAttributeAm"></param>
        /// <param name="save"></param>
        /// <returns>Status204NoContent</returns>
        public async Task LockUnlockAttribute(LockUnlockAttributeAm lockUnlockAttributeAm, bool save)
        {
            if (string.IsNullOrWhiteSpace(lockUnlockAttributeAm?.Id))
                throw new ModelBuilderBadRequestException($"Error locking/unlocking Attribute: Id pr projectId can't be null or empty.");

            var attribute = await _attributeRepository.GetAsync(lockUnlockAttributeAm.Id);

            if (attribute == null || attribute.IsLocked == lockUnlockAttributeAm.IsLocked)
                return;

            attribute.IsLocked = lockUnlockAttributeAm.IsLocked;
            attribute.IsLockedStatusBy = _contextAccessor.GetName();
            attribute.IsLockedStatusDate = DateTime.Now.ToUniversalTime();

            lockUnlockAttributeAm.IsLockedStatusBy = attribute.IsLockedStatusBy;
            lockUnlockAttributeAm.IsLockedStatusDate = attribute.IsLockedStatusDate;
            lockUnlockAttributeAm.NodeId = attribute.NodeId;
            lockUnlockAttributeAm.TransportId = attribute.TransportId;
            lockUnlockAttributeAm.InterfaceId = attribute.InterfaceId;
            lockUnlockAttributeAm.CompositeId = attribute.CompositeId;
            lockUnlockAttributeAm.TerminalId = attribute.TerminalId;

            if (save)
                await _attributeRepository.SaveAsync();

            //Send attribute to client via webSocket 
            await _cooperateService.SendLockUnlockAttributeUpdates(
                new List<(LockUnlockAttributeAm am, WorkerStatus workerStatus)> { (lockUnlockAttributeAm, WorkerStatus.Update) }, lockUnlockAttributeAm.ProjectId);
        }

        /// <summary>
        /// Locks or unlocks a node (including all attributes on the node) and all children nodes and attributes
        /// </summary>
        /// <param name="lockUnlockNodeAm"></param>
        /// <returns>Status204NoContent</returns>
        public async Task LockUnlockNode(LockUnlockNodeAm lockUnlockNodeAm)
        {
            if (lockUnlockNodeAm?.Id == null || lockUnlockNodeAm.ProjectId == null)
                throw new ModelBuilderBadRequestException($"Error locking/unlocking Node: Id or projectId can't be null or empty.");

            var allNodesInProject = _nodeRepository.GetAll(false).Where(x => x.ProjectId == lockUnlockNodeAm.ProjectId);
            var allConnectors = _connectorRepository.GetAll(false);
            var allAttributes = _attributeRepository.GetAll(false);
            var allEdgesInProject = _edgeRepository.GetAll(false).Where(x => x.ProjectId == lockUnlockNodeAm.ProjectId);
            
            if(!allEdgesInProject.Any())
                return;

            var node = allNodesInProject.FirstOrDefault(x => x.Id == lockUnlockNodeAm.Id);

            if(node == null)
                return;

            LockUnlockNodesRecursive(node, lockUnlockNodeAm, _contextAccessor.GetName(), DateTime.Now.ToUniversalTime(),
                allNodesInProject, allConnectors, allAttributes, allEdgesInProject);

            await _nodeRepository.SaveAsync();
            await _edgeRepository.SaveAsync();
            await _attributeRepository.SaveAsync();
        }

        //private async void LockUnlockNodesRecursive(Node node, LockUnlockNodeAm lockUnlockNodeAm, string userName, DateTime dateTimeNow,
        //    IQueryable<Node> allNodesInProject, IQueryable<Connector> allConnectors, IQueryable<Attribute> allAttributes, IQueryable<Edge> allEdgesInProject)

        /// <summary>
        /// Returns a list of all locked nodes id's
        /// If param 'projectId' is null all locked nodes in the database will be returned
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns>List of locked node id></returns>
        public IEnumerable<string> GetLockedNodes(string projectId)
        {
            return string.IsNullOrWhiteSpace(projectId)
                ? _nodeRepository.FindBy(x => x.IsLocked).Select(x => x.Id)
                : _nodeRepository.FindBy(x => x.IsLocked && x.MasterProjectId == projectId).Select(x => x.Id);
        }

        /// <summary>
        /// Returns a list of all locked attributes id's
        /// If param 'projectId' is null all locked attributes in the database will be returned
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns>List of locked attribute id></returns>
        public IEnumerable<string> GetLockedAttributes(string projectId)
        {
            return string.IsNullOrWhiteSpace(projectId)
                ? _attributeRepository.FindBy(x => x.IsLocked).Select(x => x.Id)
                : _attributeRepository.FindBy(x => x.IsLocked && x.Node.MasterProjectId == projectId).Select(x => x.Id);
        }

        /// <summary>
        /// Returns a list of all locked edges id's
        /// If param 'projectId' is null all locked edges in the database will be returned
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns>List of locked edges id></returns>
        public IEnumerable<string> GetLockedEdges(string projectId)
        {
            return string.IsNullOrWhiteSpace(projectId)
                ? _edgeRepository.FindBy(x => x.IsLocked).Select(y => y.Id)
                : _edgeRepository.FindBy(x => x.IsLocked && x.MasterProjectId == projectId).Select(y => y.Id);
        }

        /// <summary>
        /// Resolve commit package
        /// </summary>
        /// <param name="package"></param>
        /// <returns></returns>
        public async Task CommitProject(CommitPackage package)
        {
            // TODO: We are missing UX here to define what to do in this workflow. For now, we only send data.

            if (string.IsNullOrWhiteSpace(package?.ProjectId))
                throw new ModelBuilderNullReferenceException("Can't commit a null reference commit package");

            if (_moduleService.Modules.All(x => x.ModuleDescription != null && x.ModuleDescription.Id != Guid.Empty && !string.Equals(x.ModuleDescription.Id.ToString(), package.Parser, StringComparison.CurrentCultureIgnoreCase)))
                throw new ModelBuilderModuleException($"There is no parser with key: {package.Parser}");

            var senders = _moduleService.Modules.Where(x => x.Instance is IModelBuilderSyncService).ToList();

            if (!senders.Any())
                throw new ModelBuilderModuleException("There is no sender module");

            var parser = _moduleService.Resolve<IModelBuilderParser>(new Guid(package.Parser));

            var project = await GetProject(package.ProjectId);
            project.IsSubProject = true;

            var data = await parser.SerializeProject(project);
            var projectString = System.Text.Encoding.UTF8.GetString(data);

            var export = new ImfData
            {
                ProjectId = project.Id,
                Version = project.Version,
                Environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT"),
                Parser = package.Parser,
                CommitStatus = package.CommitStatus,
                SenderDomain = _commonRepository.GetDomain(),
                ReceivingDomain = package.ReceivingDomain,
                Document = projectString
            };

            foreach (var sender in senders)
            {
                if (sender.Instance is not IModelBuilderSyncService client)
                    continue;

                await client.SendData(export);
                await SetProjectCommitVersion(project.Id);
            }
        }

        /// <summary>
        /// Check if project exists
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public bool ProjectExist(string projectId)
        {
            return _projectRepository.Context.Projects.Any(x => x.Id == projectId);
        }

        #region Private

        private async void LockUnlockNodesRecursive(Node node, LockUnlockNodeAm lockUnlockNodeAm, string userName, DateTime dateTimeNow,
            IQueryable<Node> allNodesInProject, IQueryable<Connector> allConnectors, IQueryable<Attribute> allAttributes, IQueryable<Edge> allEdgesInProject)
        {
            if (node == null)
                return;
            lockUnlockNodeAm.Id = node.Id;
            lockUnlockNodeAm.IsLockedStatusBy = userName;
            lockUnlockNodeAm.IsLockedStatusDate = dateTimeNow;

            //Node lock/unlock
            if (node.IsLocked != lockUnlockNodeAm.IsLocked)
            {
                node.IsLocked = lockUnlockNodeAm.IsLocked;
                node.IsLockedStatusBy = lockUnlockNodeAm.IsLockedStatusBy;
                node.IsLockedStatusDate = lockUnlockNodeAm.IsLockedStatusDate;

                //Send node to client via webSocket 
                await _cooperateService.SendLockUnlockNodeUpdates(
                    new List<(LockUnlockNodeAm am, WorkerStatus workerStatus)> { (lockUnlockNodeAm, WorkerStatus.Update) }, lockUnlockNodeAm.ProjectId);

                //Find all node attributes
                var nodeConnectors = allConnectors.Where(x => x.NodeId == node.Id);
                var attributes = allAttributes.Where(x => nodeConnectors.Any(y => y.Id == x.TerminalId));

                //Lock/unlock all node attributes
                foreach (var attribute in attributes)
                {
                    var lockUnlockAttribute = new LockUnlockAttributeAm { Id = attribute.Id, IsLocked = lockUnlockNodeAm.IsLocked };
                    await LockUnlockAttribute(lockUnlockAttribute, false);
                }
            }

            var edgesInProject = allEdgesInProject.Where(x => x.FromNodeId == node.Id);

            //Edge lock/unlock (including all edge attributes)
            foreach (var edge in edgesInProject)
            {
                var lockUnlockEdgeAm = new LockUnlockEdgeAm
                {
                    Id = edge.Id,
                    IsLocked = lockUnlockNodeAm.IsLocked,
                    IsLockedStatusBy = userName,
                    IsLockedStatusDate = dateTimeNow,
                    ProjectId = lockUnlockNodeAm.ProjectId
                };

                await LockUnlockEdge(lockUnlockEdgeAm, false);

                var childNode = allNodesInProject.FirstOrDefault(x => x.Id == edge.ToNodeId);

                if (childNode != null && childNode.Level <= node.Level)
                    continue;
                
                LockUnlockNodesRecursive(childNode, lockUnlockNodeAm, userName, dateTimeNow, allNodesInProject, allConnectors, allAttributes, allEdgesInProject);
            }
        }

        private Node CreateInitAspectNode(Aspect aspect, string projectId, string projectIri)
        {
            const string version = "1.0";
            const decimal positionY = 5.0m;
            const string connectorName = "PartOf";

            string name;
            decimal positionX;

            switch (aspect)
            {
                case Aspect.Function:
                    name = "Function";
                    positionX = 150.0m;
                    break;

                case Aspect.Product:
                    name = "Product";
                    positionX = 600.0m;
                    break;

                case Aspect.Location:
                    name = "Location";
                    positionX = 1050.0m;
                    break;

                default:
                    name = "";
                    positionX = 0.0m;
                    break;
            }

            var userName = _contextAccessor.GetName();
            var dateTimeNow = DateTime.Now.ToUniversalTime();

            var (nodeId, nodeIri) = _commonRepository.CreateOrUseIdAndIri(null, null);

            var node = new Node
            {
                Id = nodeId,
                Iri = nodeIri,
                Name = name,
                Label = name,
                PositionX = positionX,
                PositionY = positionY,
                Connectors = new List<Connector>(),
                Version = version,
                Rds = string.Empty,
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                IsRoot = true,
                MasterProjectId = projectId,
                Aspect = aspect,
                Length = null,
                Height = null,
                Cost = null,
                Created = dateTimeNow,
                CreatedBy = userName,
                Updated = dateTimeNow,
                UpdatedBy = userName,
                LibraryTypeId = name,
                ProjectId = projectId,
                MasterProjectIri = projectIri
            };

            var (connectorId, connectorIri) = _commonRepository.CreateOrUseIdAndIri(null, null);

            var connector = new Relation
            {
                Id = connectorId,
                Iri = connectorIri,
                Name = connectorName,
                Type = ConnectorType.Output,
                NodeId = node.Id,
                NodeIri = node.Iri,
                RelationType = RelationType.PartOf
            };

            node.Connectors.Add(connector);
            return node;
        }

        private void ResolveLevelAndOrder(Project project)
        {
            if (project?.Nodes == null || project.Edges == null)
                return;

            var rootNodes = project.Nodes.Where(x => x.IsRoot).ToList();
            _ = rootNodes.Aggregate(0, (current, node) => ResolveNodeLevelAndOrder(node, project, 0, current) + 1);
        }

        private int ResolveNodeLevelAndOrder(Node node, Project project, int level, int order)
        {
            if (node == null)
                return order;

            node.Level = level;
            node.Order = order;
            var connector = node.Connectors.OfType<Relation>().FirstOrDefault(x => x.Type == ConnectorType.Output && x.RelationType == RelationType.PartOf);

            if (connector == null)
                return order;

            var edges = project.Edges.Where(x => x.FromConnectorId == connector.Id).ToList();
            var children = project.Nodes.Where(x => edges.Any(y => y.ToNodeId == x.Id)).ToList();
            return children.Aggregate(order, (current, child) => ResolveNodeLevelAndOrder(child, project, level + 1, current + 1));
        }

        private Project CreateInitProject(CreateProject createProject, bool isSubProject)
        {
            const string version = "1.0.0";

            if (string.IsNullOrWhiteSpace(createProject?.Name))
                throw new ModelBuilderInvalidOperationException(
                    "You need to give the new project a name");

            if (createProject.Name.Length < 2)
                throw new ModelBuilderInvalidOperationException(
                    "Project name must be minimum 2 characters");

            if (_projectRepository.GetAll().Any(x => x.Name.ToLower() == createProject.Name.ToLower()))
                throw new ModelBuilderInvalidOperationException(
                    "There already exist a project with the same name");

            var (projectId, projectIri) = _commonRepository.CreateOrUseIdAndIri(null, null);

            var project = new Project
            {
                Id = projectId,
                Iri = projectIri,
                Version = version,
                Name = createProject.Name,
                Description = createProject.Description,
                UpdatedBy = _contextAccessor.GetName(),
                Updated = DateTime.Now.ToUniversalTime(),
                IsSubProject = isSubProject,
                ProjectOwner = _contextAccessor.GetName(),
                Nodes = new List<Node>
                {
                    CreateInitAspectNode(Aspect.Function, projectId, projectIri),
                    CreateInitAspectNode(Aspect.Product, projectId, projectIri),
                    CreateInitAspectNode(Aspect.Location, projectId, projectIri)
                }
            };

            return project;
        }

        private void CastConnectors(ProjectAm project)
        {
            foreach (var node in project.Nodes)
            {
                var connectors = new List<ConnectorAm>();
                foreach (var connector in node.Connectors)
                {
                    if (string.IsNullOrEmpty(connector.TerminalCategoryId) && connector.RelationType != RelationType.NotSet)
                    {
                        var relationAm = new RelationAm();
                        _mapper.Map(connector, relationAm);
                        connectors.Add(relationAm);
                    }

                    else
                    {
                        var terminalAm = new TerminalAm();
                        _mapper.Map(connector, terminalAm);
                        connectors.Add(terminalAm);
                    }
                }

                node.Connectors = connectors;
            }
        }

        private void SetProjectVersion(Project originalProject, ProjectAm projectAm)
        {
            if (originalProject == null || string.IsNullOrWhiteSpace(originalProject.Id) ||
                projectAm == null || string.IsNullOrWhiteSpace(projectAm.Id))
                return;

            //TODO: The rules for when to trigger major/minor version incrementation is not finalized!

            if (originalProject.IsSubProject != projectAm.IsSubProject)
            {
                originalProject.IncrementMinorVersion();
                return;
            }

            if (originalProject.Name != projectAm.Name)
            {
                originalProject.IncrementMinorVersion();
                return;
            }

            if (originalProject.Description != projectAm.Description)
            {
                originalProject.IncrementMinorVersion();
                return;
            }

            if (originalProject.Nodes?.Count != projectAm.Nodes?.Count)
            {
                originalProject.IncrementMinorVersion();
                return;
            }

            if (originalProject.Edges?.Count != projectAm.Edges?.Count)
            {
                originalProject.IncrementMinorVersion();
            }

        }

        private async Task SetProjectCommitVersion(string projectId)
        {
            if (string.IsNullOrWhiteSpace(projectId))
                return;

            var projectCommitVersionUpdate = _projectRepository.FindBy(x => x.Id == projectId).First();
            projectCommitVersionUpdate.IncrementCommitVersion();
            _projectRepository.Update(projectCommitVersionUpdate);
            await _projectRepository.SaveAsync();
            _projectRepository.Detach(projectCommitVersionUpdate);
        }

        private void ClearAllChangeTracker()
        {
            _projectRepository?.Context?.ChangeTracker.Clear();
            _nodeRepository?.Context?.ChangeTracker.Clear();
            _edgeRepository?.Context?.ChangeTracker.Clear();
            _connectorRepository?.Context?.ChangeTracker.Clear();
            _attributeRepository?.Context?.ChangeTracker.Clear();
        }

        #endregion Private
    }
}