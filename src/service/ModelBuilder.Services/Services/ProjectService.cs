using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Data.Extensions;
using Mb.Models.Abstract;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using Mb.Models.Exceptions;
using Mb.Models.Extensions;
using Mb.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

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
        private readonly IConnectorRepository _connectorRepository;
        private readonly ICommonRepository _commonRepository;
        private readonly IModuleService _moduleService;
        private readonly IRemapService _remapService;
        private readonly ICooperateService _cooperateService;
        private readonly ILogger<ProjectService> _logger;

        public ProjectService(IProjectRepository projectRepository, IMapper mapper,
            IHttpContextAccessor contextAccessor, INodeRepository nodeRepository, IEdgeRepository edgeRepository,
            ICommonRepository commonRepository, IConnectorRepository connectorRepository, IModuleService moduleService,
            IAttributeRepository attributeRepository, ILogger<ProjectService> logger, IRemapService remapService, ICooperateService cooperateService)
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
        /// <param name="iri"></param>
        /// <param name="ignoreNotFound"></param>
        /// <returns></returns>
        public async Task<Project> GetProject(string id, string iri, bool ignoreNotFound = false)
        {
            var project = await _projectRepository.GetAsyncComplete(id, iri);

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
                    if (node.Simples != null)
                    {
                        foreach (var simple in node.Simples)
                        {
                            if (simple.Attributes != null)
                            {
                                foreach (var attribute in simple.Attributes)
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
                var existingProject = await GetProject(project.Id, null, true);

                if (existingProject != null)
                    throw new ModelBuilderDuplicateException($"Project already exist - id: {project.Id}");

                if (_edgeRepository.GetAll().AsEnumerable().Any(x => project.Edges.Any(y => y.Id == x.Id)))
                    throw new ModelBuilderDuplicateException("One or more edges already exist");

                if (_nodeRepository.GetAll().AsEnumerable().Any(x => project.Nodes.Any(y => y.Id == x.Id)))
                    throw new ModelBuilderDuplicateException("One or more nodes already exist");

                var allConnectors = project.Nodes.AsEnumerable().SelectMany(x => x.Connectors).ToList();
                if (_connectorRepository.GetAll().AsEnumerable().Any(x => allConnectors.Any(y => y.Id == x.Id)))
                    throw new ModelBuilderDuplicateException("One or more connectors already exist");

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

                var updatedProject = await GetProject(newProject.Id, null);
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
            try
            {
                if (subProjectAm == null)
                    throw new ModelBuilderInvalidOperationException("Sub-project is null");

                var validation = subProjectAm.ValidateObject();
                if (!validation.IsValid)
                    throw new ModelBuilderBadRequestException($"Couldn't create sub-project with name: {subProjectAm.Name}", validation);

                var fromProject = await _projectRepository.GetAsyncComplete(subProjectAm.FromProjectId, null);
                if (fromProject == null)
                    throw new ModelBuilderInvalidOperationException("The original project does not exist");

                fromProject.Nodes = fromProject.Nodes.Where(x => x.IsRoot || subProjectAm.Nodes.Any(y => x.Id == y)).ToList();
                fromProject.Edges = fromProject.Edges.Where(x => subProjectAm.Edges.Any(y => x.Id == y)).ToList();

                var projectAm = _mapper.Map<ProjectAm>(fromProject);
                projectAm.Name = subProjectAm.Name;
                projectAm.Description = subProjectAm.Description;
                projectAm.IsSubProject = true;

                _ = _remapService.Clone(projectAm);

                var newSubProject = _mapper.Map<Project>(projectAm);
                await _projectRepository.CreateAsync(newSubProject);
                await _projectRepository.SaveAsync();

                return newSubProject;

            }
            catch (Exception e)
            {
                _logger.LogError($"Can not create sub project from project id: {subProjectAm?.FromProjectId}. Error: {e.Message}");
                throw;
            }
            finally
            {
                ClearAllChangeTracker();
            }
        }

        ///// <summary>
        ///// Update a project, if the project does not exist, a ModelBuilderNotFoundException will be thrown.
        ///// </summary>
        ///// <param name="id"></param>
        ///// <param name="projectAm"></param>
        ///// <param name="invokedByDomain"></param>
        ///// <param name="iri"></param>
        ///// <returns></returns>
        //public async Task<ProjectResultAm> UpdateProject(string id, string iri, ProjectAm projectAm, string invokedByDomain)
        //{
        //    ClearAllChangeTracker();

        //    if (string.IsNullOrWhiteSpace(invokedByDomain))
        //        throw new ModelBuilderInvalidOperationException("Domain can't be null or empty");
        //    try
        //    {
        //        var originalProject = await _projectRepository.GetAsyncComplete(id, iri);

        //        if (originalProject == null)
        //            throw new ModelBuilderNotFoundException($"The project with id:{id}, could not be found.");

        //        // Remap and create new id's
        //        var remap = _remapService.Remap(projectAm);

        //        // Edges
        //        var originalEdges = originalProject.Edges.ToList();
        //        var deleteEdges = originalEdges.Where(x => projectAm.Edges.All(y => y.Id != x.Id)).ToList();
        //        var edgeChangeMap = await _edgeRepository.DeleteEdges(deleteEdges, projectAm.Id, invokedByDomain);

        //        // Nodes
        //        var originalNodes = originalProject.Nodes.ToList();
        //        var deleteNodes = originalNodes.Where(x => projectAm.Nodes.All(y => y.Id != x.Id)).ToList();
        //        var nodeChangeMap = _nodeRepository.DeleteNodes(deleteNodes, projectAm.Id, invokedByDomain).ToList();

        //        //Determine if project version should be incremented
        //        SetProjectVersion(originalProject, projectAm);

        //        // Map new data from projectAm to originalProject
        //        _mapper.Map(projectAm, originalProject);

        //        //New data from projectAm is now mapped to originalProject.
        //        //To avoid confusion we now call originalProject 'updatedProject'
        //        var updatedProject = originalProject;

        //        nodeChangeMap = nodeChangeMap.Concat(_nodeRepository.UpdateInsert(originalNodes, updatedProject, invokedByDomain)).ToList();
        //        edgeChangeMap = edgeChangeMap.Concat(_edgeRepository.UpdateInsert(originalEdges, updatedProject, invokedByDomain)).ToList();

        //        ResolveLevelAndOrder(updatedProject);

        //        _projectRepository.Update(updatedProject);
        //        _ = _cooperateService.SendNodeUpdates(nodeChangeMap.ToList(), updatedProject.Id);
        //        _ = _cooperateService.SendEdgeUpdates(edgeChangeMap.ToList(), updatedProject.Id);
        //        await _projectRepository.SaveAsync();

        //        return new ProjectResultAm
        //        {
        //            Project = updatedProject,
        //            IdChanges = remap
        //        };
        //    }
        //    catch (Exception e)
        //    {
        //        _logger.LogError($"Can not update project with id: {id}. Error: {e.Message}");
        //        throw;
        //    }
        //    finally
        //    {
        //        ClearAllChangeTracker();
        //    }
        //}

        /// <summary>
        /// Update a project, if the project does not exist, a ModelBuilderNotFoundException will be thrown.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="projectAm"></param>
        /// <param name="invokedByDomain"></param>
        /// <param name="iri"></param>
        /// <returns></returns>
        public async Task<ProjectResultAm> UpdateProject(string id, string iri, ProjectAm projectAm, string invokedByDomain)
        {
            ClearAllChangeTracker();

            if (string.IsNullOrWhiteSpace(invokedByDomain))
                throw new ModelBuilderInvalidOperationException("Domain can't be null or empty");
            try
            {
                var original = await _projectRepository.GetAsyncComplete(id, iri);

                if (original == null)
                    throw new ModelBuilderNotFoundException($"The project with id:{id}, could not be found.");

                // Remap and create new id's
                var remap = _remapService.Remap(projectAm);

                // Map updated project
                var updated = _mapper.Map<Project>(projectAm);

                // Get create edit data
                var projectEditData = await _remapService.CreateEditData(original, updated);

                // Update
                await _projectRepository.UpdateProject(original, updated, projectEditData);

                // Send websocket data.
                await _cooperateService.SendDataUpdates(projectEditData, id);

                // TODO: Remove this when client create id is implemented
                var pro = await _projectRepository.GetAsyncComplete(id, iri);

                return new ProjectResultAm
                {
                    Project = pro,
                    IdChanges = remap
                };
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
        }

        /// <summary>
        /// Delete a project from given id
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public async Task DeleteProject(string projectId)
        {
            var existingProject = await GetProject(projectId, null);
            if (existingProject == null)
                throw new ModelBuilderNotFoundException($"There is no project with id: {projectId}");

            _ = await _edgeRepository.DeleteEdges(existingProject.Edges, projectId, _commonRepository.GetDomain());
            _ = _nodeRepository.DeleteNodes(existingProject.Nodes, projectId, _commonRepository.GetDomain()).ToList();
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
            var project = await GetProject(projectId, null);

            if (_moduleService.Modules.All(x => x.ModuleDescription != null && x.ModuleDescription.Id != Guid.Empty && !string.Equals(x.ModuleDescription.Id.ToString(), id.ToString(), StringComparison.CurrentCultureIgnoreCase)))
                throw new ModelBuilderModuleException($"There is no parser with id: {id}");

            var par = _moduleService.Resolve<IModelBuilderParser>(id);
            var data = await par.SerializeProject(project);
            return (data, par.GetFileFormat());
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

            var project = await GetProject(package.ProjectId, null);
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
        /// <param name="projectIri"></param>
        /// <returns></returns>
        public bool ProjectExist(string projectId, string projectIri)
        {
            var exist =
                _projectRepository.Context.Projects.Any(x => x.Id == projectId) ||
                _projectRepository.Context.Projects.Any(x => x.Iri == projectIri);

            ClearAllChangeTracker();

            return exist;
        }

        #region Private

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
                ProjectIri = projectIri,
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