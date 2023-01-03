using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mimirorg.Common.Exceptions;
using Mb.Models.Records;
using Mb.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Mimirorg.Common.Extensions;
using Mimirorg.TypeLibrary.Enums;
using Mb.Models.Common;
using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Extensions;

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
        private readonly IVersionService _versionService;


        public ProjectService(IProjectRepository projectRepository, IMapper mapper,
            IHttpContextAccessor contextAccessor, INodeRepository nodeRepository, IEdgeRepository edgeRepository,
            ICommonRepository commonRepository, IConnectorRepository connectorRepository, IModuleService moduleService,
            IAttributeRepository attributeRepository, ILogger<ProjectService> logger, IRemapService remapService,
            ICooperateService cooperateService, IVersionService versionService)
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
            _versionService = versionService;
        }

        /// <summary>
        /// Get a list of project items from start index and a max number that will be returned.
        /// The list will be filtered on the name parameter.
        /// </summary>
        /// <param name="name">Name search filter</param>
        /// <param name="from">From number</param>
        /// <param name="number">Number of items</param>
        /// <returns>A list project list items</returns>
        public IEnumerable<ProjectItemCm> GetProjectList(string name, int from, int number)
        {
            return _projectRepository.GetProjectList(name, from, number);
        }

        /// <summary>
        /// Get a project by Id or Iri. The project will include all edges, nodes, transports, interfaces,
        /// attributes and connectors.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="iri"></param>
        /// <returns>The actual project</returns>
        /// <exception cref="MimirorgNotFoundException">Throws if the project does not exist</exception>
        public async Task<Project> GetProject(string id, string iri)
        {
            var project = await _projectRepository.GetAsyncComplete(id, iri);

            if (project == null)
                throw new MimirorgNotFoundException($"Could not find project with id: {id} or iri: {iri}");

            return project;
        }

        /// <summary>
        /// Create a new empty project. The project wil include the aspect root nodes.
        /// </summary>
        /// <param name="createProject"></param>
        /// <returns></returns>
        public async Task<Project> CreateProject(CreateProjectAm createProject)
        {
            var project = CreateInitProject(createProject, false);
            await _projectRepository.CreateAsync(project);
            await _projectRepository.SaveAsync();
            return project;
        }

        /// <summary>
        /// Convert or inverse sub project
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns>Completed Task</returns>
        public async Task ConvertSubProject(string projectId)
        {
            var project = await GetProject(projectId, null);
            var am = _mapper.Map<ProjectAm>(project);
            am.IsSubProject = !am.IsSubProject;
            await UpdateProject(am.Id, am.Iri, am, _commonRepository.GetDomain());
        }

        /// <summary>
        /// Create a new Mimir project based on data
        /// </summary>
        /// <param name="project">The project that should be created</param>
        /// <returns>A create project task</returns>
        /// <exception cref="MimirorgDuplicateException">Throws if there is already a project, node or edge with same id.</exception>
        /// <exception cref="MimirorgNullReferenceException">Throws if project is null</exception>
        /// <exception cref="MimirorgBadRequestException">Throws if project is not valid</exception>
        public async Task<Project> CreateProject(ProjectAm project)
        {
            if (project == null)
                throw new MimirorgNullReferenceException("The project that should be created is null.");

            var validation = project.ValidateObject();
            if (!validation.IsValid)
                throw new MimirorgBadRequestException($"Couldn't create project with name: {project.Name}",
                    validation);

            var existingProject = ProjectExist(project.Id, project.Iri);
            ClearAllChangeTracker();

            if (existingProject)
                throw new MimirorgDuplicateException($"Project already exist - id: {project.Id}");

            if (_edgeRepository.GetAll().AsEnumerable().Any(x => project.Edges.Any(y => y.Id == x.Id)))
                throw new MimirorgDuplicateException("One or more edges already exist");

            if (_nodeRepository.GetAll().AsEnumerable().Any(x => project.Nodes.Any(y => y.Id == x.Id)))
                throw new MimirorgDuplicateException("One or more nodes already exist");

            var allConnectors = project.Nodes.AsEnumerable().SelectMany(x => x.Connectors).ToList();
            if (_connectorRepository.GetAll().AsEnumerable().Any(x => allConnectors.Any(y => y.Id == x.Id)))
                throw new MimirorgDuplicateException("One or more connectors already exist");

            // Remap and create new id's
            var _ = _remapService.Remap(project);

            // Create an empty project
            var newProject = new Project
            {
                ProjectOwner = _contextAccessor.GetName(),
                UpdatedBy = _contextAccessor.GetName(),
                Updated = DateTime.Now.ToUniversalTime()
            };

            // Map data
            _mapper.Map(project, newProject);

            // Sort nodes
            ResolveLevelAndOrder(newProject);

            // Deconstruct project
            var projectData = new ProjectData();
            await _remapService.DeConstruct(newProject, projectData);
            await _projectRepository.CreateProject(newProject, projectData);

            var updatedProject = await GetProject(newProject.Id, null);
            return updatedProject;
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
                    throw new MimirorgNullReferenceException("Sub-project is null");

                var validation = subProjectAm.ValidateObject();
                if (!validation.IsValid)
                    throw new MimirorgBadRequestException(
                        $"Couldn't create sub-project with name: {subProjectAm.Name}", validation);

                var fromProject = await _projectRepository.GetAsyncComplete(subProjectAm.FromProjectId, null);
                if (fromProject == null)
                    throw new MimirorgInvalidOperationException("The original project does not exist");

                var projectAm = _mapper.Map<ProjectAm>(fromProject);

                projectAm.Name = subProjectAm.Name;
                projectAm.Description = subProjectAm.Description;
                projectAm.IsSubProject = true;
                projectAm.Nodes = projectAm.Nodes.Where(x => x.IsRoot || subProjectAm.Nodes.Any(y => x.Id == y)).ToList();
                projectAm.Edges = projectAm.Edges.Where(x => subProjectAm.Edges.Any(y => x.Id == y)).ToList();

                _ = _remapService.Clone(projectAm);

                // Map data
                var newSubProject = _mapper.Map<Project>(projectAm);

                // Sort nodes
                ResolveLevelAndOrder(newSubProject);

                // Deconstruct project
                var projectData = new ProjectData();
                await _remapService.DeConstruct(newSubProject, projectData);
                await _projectRepository.CreateProject(newSubProject, projectData);

                var updatedProject = await GetProject(newSubProject.Id, null);
                return updatedProject;
            }
            catch (Exception e)
            {
                _logger.LogError(
                    $"Can not create sub project from project id: {subProjectAm?.FromProjectId}. Error: {e.Message}");
                throw;
            }
            finally
            {
                ClearAllChangeTracker();
            }
        }

        /// <summary>
        /// Update a project
        /// </summary>
        /// <param name="id"></param>
        /// <param name="project"></param>
        /// <param name="invokedByDomain"></param>
        /// <param name="iri"></param>
        /// <returns>Update Project Task</returns>
        /// <exception cref="MimirorgInvalidOperationException">Throws if invoking domain is not set.</exception>
        /// <exception cref="MimirorgNotFoundException">Throws if project is missing from database.</exception>
        /// <exception cref="MimirorgNullReferenceException">Throws if project is null, or missing both id and iri.</exception>
        /// <exception cref="MimirorgBadRequestException">Throws if project is not valid.</exception>
        /// TODO: We need to handle invokedByDomain in update process
        public async Task UpdateProject(string id, string iri, ProjectAm project, string invokedByDomain)
        {
            if ((string.IsNullOrWhiteSpace(id) && string.IsNullOrWhiteSpace(iri)) || project == null)
                throw new MimirorgNullReferenceException("Id or Iri must have value. Project can't be null.");

            if (string.IsNullOrWhiteSpace(invokedByDomain))
                throw new MimirorgInvalidOperationException("Domain can't be null or empty");

            var validation = project.ValidateObject();
            if (!validation.IsValid)
                throw new MimirorgBadRequestException($"Couldn't update project with name: {project.Name}",
                    validation);

            var original = await _projectRepository.GetAsyncComplete(id, iri);
            ClearAllChangeTracker();

            if (original == null)
                throw new MimirorgNotFoundException($"The project with id:{id}, could not be found.");

            // Remap and create new id's
            _ = _remapService.Remap(project);

            // Map updated project
            var updated = _mapper.Map<Project>(project);
            updated.Updated = DateTime.Now.ToUniversalTime();
            updated.UpdatedBy = _contextAccessor.GetName() ?? "System";

            // Sort nodes
            ResolveLevelAndOrder(updated);

            // Resolve version changes
            var versionStatus = original.CalculateVersionStatus(project);
            updated.UpdateVersion(versionStatus);

            // Get create edit data
            var projectEditData = await _remapService.CreateEditData(original, updated);

            // Save last version if there is version changes
            if (versionStatus != VersionStatus.NoChange)
                await _versionService.CreateVersion(original);

            // Update
            await _projectRepository.UpdateProject(original, updated, projectEditData);

            // Send websocket data.
            await _cooperateService.SendDataUpdates(projectEditData, id);
        }

        /// <summary>
        /// Delete a project from given id
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public async Task DeleteProject(string projectId)
        {
            var existingProject = await _projectRepository.GetProjectAsync(projectId, null);
            if (existingProject == null)
                throw new MimirorgNotFoundException($"There is no project with id: {projectId}");

            var projectData = new ProjectData();
            await _remapService.DeConstruct(existingProject, projectData);
            await _projectRepository.DeleteProject(existingProject, projectData);
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

            if (_moduleService.Modules.All(x =>
                    x.ModuleDescription != null && x.ModuleDescription.Id != Guid.Empty.ToString() && !string.Equals(
                        x.ModuleDescription.Id.ToString(), id.ToString(), StringComparison.CurrentCultureIgnoreCase)))
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
        public async Task CommitProject(CommitPackageAm package)
        {
            // TODO: We are missing UX here to define what to do in this workflow. For now, we only send data.

            if (string.IsNullOrWhiteSpace(package?.ProjectId))
                throw new MimirorgNullReferenceException("Can't commit a null reference commit package");

            if (_moduleService.Modules.All(x =>
                    x.ModuleDescription != null && x.ModuleDescription.Id != Guid.Empty.ToString() && !string.Equals(
                        x.ModuleDescription.Id.ToString(), package.Parser, StringComparison.CurrentCultureIgnoreCase)))
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
            var exist = _projectRepository.Context.Projects.Any(x => x.Id == projectId || x.Iri == projectIri);
            ClearAllChangeTracker();
            return exist;
        }

        /// <summary>
        /// Create a prepare project clone that could be merged into another project
        /// </summary>
        /// <param name="prepare"></param>
        /// <returns></returns>
        /// <exception cref="MimirorgNotFoundException">Throws if the project is not found</exception>
        public async Task<PrepareCm> PrepareForMerge(PrepareAm prepare)
        {
            // TODO: We need to handle versions
            var subProject = await _projectRepository.GetAsyncComplete(prepare.SubProjectId, null);
            if (subProject == null)
                throw new MimirorgNotFoundException("There is no sub-project with current id");

            var projectAm = _mapper.Map<ProjectAm>(subProject);
            _ = _remapService.Clone(projectAm);

            // Save the project as a temporary project, the cleanup hosted service will remove this temp project later
            projectAm.Name = $"temp_{Guid.NewGuid()}_{projectAm.Name}";
            projectAm.Description = "This is a temporary project";
            projectAm.IsSubProject = true;

            _ = _remapService.Clone(projectAm);
            var newSubProject = _mapper.Map<Project>(projectAm);
            ResolveLevelAndOrder(newSubProject);
            var projectData = new ProjectData();
            await _remapService.DeConstruct(newSubProject, projectData);
            await _projectRepository.CreateProject(newSubProject, projectData);

            // Get the created project
            var updatedProject = await GetProject(newSubProject.Id, null);

            // Identify root nodes
            var rootNodes = updatedProject.Nodes.Where(x => x.IsRoot).Select(x => x.Id);

            // Position node
            var rootOrigin = updatedProject.Nodes.Where(x => rootNodes.All(y => y != x.Id)).MinBy(x => x.PositionY);

            // Set node and edges project id to merge project, and calculate position
            updatedProject.Nodes = updatedProject.Nodes.Where(x => rootNodes.All(y => y != x.Id)).Select(x =>
            {
                x.ProjectId = prepare.ProjectId;
                x.ProjectIri = null;
                return x.CalculatePosition(rootOrigin, prepare);
            }).ToList();

            // Set root origin to center
            if (rootOrigin != null)
            {
                rootOrigin.PositionX = (decimal) prepare.DropPositionX;
                rootOrigin.PositionY = (decimal) prepare.DropPositionY;
            }

            updatedProject.Edges = updatedProject.Edges.Where(x => !rootNodes.Any(y => (y == x.FromNodeId || y == x.ToNodeId))).Select(x =>
            {
                x.ProjectId = prepare.ProjectId;
                x.ProjectIri = null;
                return x;
            }).ToList();

            var prepareCm = new PrepareCm
            {
                SubProjectId = prepare.SubProjectId,
                Nodes = updatedProject.Nodes,
                Edges = updatedProject.Edges
            };

            return prepareCm;
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
                IsRoot = true,
                MasterProjectId = projectId,
                Aspect = aspect,
                Height = null,
                Width = null,
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
                Type = ConnectorDirection.Output,
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
            var connector = node.Connectors.OfType<Relation>().FirstOrDefault(x =>
                x.Type == ConnectorDirection.Output && x.RelationType == RelationType.PartOf);

            if (connector == null)
                return order;

            var edges = project.Edges.Where(x => x.FromConnectorId == connector.Id).ToList();
            var children = project.Nodes.Where(x => edges.Any(y => y.ToNodeId == x.Id)).ToList();
            return children.Aggregate(order,
                (current, child) => ResolveNodeLevelAndOrder(child, project, level + 1, current + 1));
        }

        private Project CreateInitProject(CreateProjectAm createProject, bool isSubProject)
        {
            const string version = "1.0.0";

            if (string.IsNullOrWhiteSpace(createProject?.Name))
                throw new MimirorgInvalidOperationException(
                    "You need to give the new project a name");

            if (createProject.Name.Length < 2)
                throw new MimirorgInvalidOperationException(
                    "Project name must be minimum 2 characters");

            var existingProject = _projectRepository.FindBy(x => x.Name.ToLower() == createProject.Name.ToLower()).FirstOrDefault();

            if (existingProject != null)
                throw new MimirorgInvalidOperationException(
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

        //private void SetProjectVersion(Project originalProject, ProjectAm projectAm)
        //{
        //    if (originalProject == null || string.IsNullOrWhiteSpace(originalProject.Id) ||
        //        projectAm == null || string.IsNullOrWhiteSpace(projectAm.Id))
        //        return;

        //    //TODO: The rules for when to trigger major/minor version incrementation is not finalized!

        //    if (originalProject.IsSubProject != projectAm.IsSubProject)
        //    {
        //        originalProject.IncrementMinorVersion();
        //        return;
        //    }

        //    if (originalProject.Name != projectAm.Name)
        //    {
        //        originalProject.IncrementMinorVersion();
        //        return;
        //    }

        //    if (originalProject.Description != projectAm.Description)
        //    {
        //        originalProject.IncrementMinorVersion();
        //        return;
        //    }

        //    if (originalProject.Nodes?.Count != projectAm.Nodes?.Count)
        //    {
        //        originalProject.IncrementMinorVersion();
        //        return;
        //    }

        //    if (originalProject.Edges?.Count != projectAm.Edges?.Count)
        //    {
        //        originalProject.IncrementMinorVersion();
        //    }

        //}



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