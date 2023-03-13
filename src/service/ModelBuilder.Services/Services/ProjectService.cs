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
using Newtonsoft.Json;

namespace Mb.Services.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly IProjectRepository _projectRepository;
        private readonly IAttributeRepository _attributeRepository;
        private readonly IAspectObjectRepository _aspectObjectRepository;
        private readonly IConnectionRepository _connectionRepository;
        private readonly IConnectorRepository _connectorRepository;
        private readonly ICommonRepository _commonRepository;
        private readonly IModuleService _moduleService;
        private readonly IRemapService _remapService;
        private readonly ICooperateService _cooperateService;
        private readonly ILogger<ProjectService> _logger;
        private readonly IVersionService _versionService;


        public ProjectService(IProjectRepository projectRepository, IMapper mapper,
            IHttpContextAccessor contextAccessor, IAspectObjectRepository aspectObjectRepository, IConnectionRepository connectionRepository,
            ICommonRepository commonRepository, IConnectorRepository connectorRepository, IModuleService moduleService,
            IAttributeRepository attributeRepository, ILogger<ProjectService> logger, IRemapService remapService,
            ICooperateService cooperateService, IVersionService versionService)
        {
            _projectRepository = projectRepository;
            _mapper = mapper;
            _contextAccessor = contextAccessor;
            _aspectObjectRepository = aspectObjectRepository;
            _connectionRepository = connectionRepository;
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
        /// Get a project by Id or Iri. The project will include all connections, aspectObjects,
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
        /// Create a new empty project. The project wil include the aspect root aspectObjects.
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
        /// <exception cref="MimirorgDuplicateException">Throws if there is already a project, aspectObject or connection with same id.</exception>
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

            if (_connectionRepository.GetAll().AsEnumerable().Any(x => project.Connections.Any(y => y.Id == x.Id)))
                throw new MimirorgDuplicateException("One or more connections already exist");

            if (_aspectObjectRepository.GetAll().AsEnumerable().Any(x => project.AspectObjects.Any(y => y.Id == x.Id)))
                throw new MimirorgDuplicateException("One or more aspectObjects already exist");

            var allConnectors = project.AspectObjects.AsEnumerable().SelectMany(x => x.Connectors).ToList();
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
                projectAm.AspectObjects = projectAm.AspectObjects.Where(x => x.AspectObjectType == AspectObjectType.Root || subProjectAm.AspectObjects.Any(y => x.Id == y)).ToList();
                projectAm.Connections = projectAm.Connections.Where(x => subProjectAm.Connections.Any(y => x.Id == y)).ToList();

                _ = _remapService.Clone(projectAm);

                // Map data
                var newSubProject = _mapper.Map<Project>(projectAm);

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
            project.Version = original.Version;
            ClearAllChangeTracker();

            if (original == null)
                throw new MimirorgNotFoundException($"The project with id:{id}, could not be found.");

            // Remap and create new id's
            _ = _remapService.Remap(project);

            // Map updated project
            var updated = _mapper.Map<Project>(project);
            updated.Updated = DateTime.Now.ToUniversalTime();
            updated.UpdatedBy = _contextAccessor.GetName() ?? "System";

            // Get create edit data
            var projectEditData = await _remapService.CreateEditData(original, updated);

            // Resolve version changes
            var versionStatus = original.CalculateVersionStatus(updated, projectEditData);
            updated.UpdateVersion(versionStatus);

            // Resolve aspectObject versions
            foreach (var aspectObject in updated.AspectObjects)
            {
                var originalAspectObject = original.AspectObjects.FirstOrDefault(x => x.Id == aspectObject.Id);
                if (originalAspectObject == null)
                    continue;

                var aspectObjectVersionStatus = originalAspectObject.CalculateVersionStatus(aspectObject, projectEditData);
                aspectObject.UpdateVersion(aspectObjectVersionStatus);
            }

            // Save last version if there is version changes
            if (versionStatus != VersionStatus.NoChange)
                await _versionService.CreateVersion(original);

            // Update
            await _projectRepository.UpdateProject(original, updated, projectEditData);

            // Find project versions

            // Send websocket data.
            await _cooperateService.SendDataUpdates(projectEditData, id, updated.Version);
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
            var subProject = await _projectRepository.GetAsyncComplete(prepare.SubProjectId, null);
            if (subProject == null)
                throw new MimirorgNotFoundException("There is no sub-project with current id");

            if (subProject.Version != prepare.Version)
                subProject = await _versionService.GetGetByVersion(prepare.SubProjectId, prepare.Version);

            if (subProject == null)
                throw new MimirorgNotFoundException("There is no sub-project with current id and version");

            var projectAm = _mapper.Map<ProjectAm>(subProject);

            // Save the project as a temporary project, the cleanup hosted service will remove this temp project later
            projectAm.Name = $"temp_{Guid.NewGuid()}_{projectAm.Name}";
            projectAm.Description = "This is a temporary project";
            projectAm.IsSubProject = true;

            _ = _remapService.Clone(projectAm);
            var newSubProject = _mapper.Map<Project>(projectAm);
            var projectData = new ProjectData();
            await _remapService.DeConstruct(newSubProject, projectData);
            await _projectRepository.CreateProject(newSubProject, projectData);

            // Get the created project
            var updatedProject = await GetProject(newSubProject.Id, null);

            // Identify root aspectObjects
            var rootAspectObjects = updatedProject.AspectObjects.Where(x => x.AspectObjectType == AspectObjectType.Root).Select(x => x.Id).ToList();

            // Position aspectObject
            var rootOrigin = updatedProject.AspectObjects.Where(x => rootAspectObjects.All(y => y != x.Id)).MinBy(x => JsonConvert.DeserializeObject<AspectObjectPosition>(x.Position).ThreePosY);

            // Set aspectObject and connections project id to merge project, and calculate position
            updatedProject.AspectObjects = updatedProject.AspectObjects.Where(x => rootAspectObjects.All(y => y != x.Id)).Select(x =>
            {
                x.ProjectId = prepare.ProjectId;
                x.ProjectIri = null;
                return x.CalculatePosition(rootOrigin, prepare);
            }).ToList();

            // Set root origin to center
            if (rootOrigin != null)
            {
                JsonConvert.DeserializeObject<AspectObjectPosition>(rootOrigin.Position).ThreePosX = (int) prepare.DropPositionX;
                JsonConvert.DeserializeObject<AspectObjectPosition>(rootOrigin.Position).ThreePosY = (int)prepare.DropPositionY;
            }

            // TODO: Resolve this
            //updatedProject.Connections = updatedProject.Connections.Where(x => !rootAspectObjects.Any(y => (y == x.FromAspectObject || y == x.ToAspectObject))).Select(x =>
            //{
            //    x.Project = prepare.ProjectId;
            //    return x;
            //}).ToList();

            var prepareCm = new PrepareCm
            {
                SubProjectId = prepare.SubProjectId,
                AspectObjects = updatedProject.AspectObjects,
                Connections = updatedProject.Connections
            };

            return prepareCm;
        }

        #region Private

        /// <summary>
        /// Create init aspect aspectObjects
        /// </summary>
        /// <param name="aspect"></param>
        /// <param name="projectId"></param>
        /// <param name="projectIri"></param>
        /// <returns></returns>
        private AspectObject CreateInitAspectObject(Aspect aspect, string projectId, string projectIri)
        {
            const string version = "1.0";
            const int positionY = 5;
            const string connectorName = "PartOf";

            string name;
            int positionX;

            switch (aspect)
            {
                case Aspect.Function:
                    name = "Function";
                    positionX = 150;
                    break;

                case Aspect.Product:
                    name = "Product";
                    positionX = 600;
                    break;

                case Aspect.Location:
                    name = "Location";
                    positionX = 1050;
                    break;

                default:
                    name = "";
                    positionX = 0;
                    break;
            }

            var userName = _contextAccessor.GetName();
            var dateTimeNow = DateTime.Now.ToUniversalTime();

            var (aspectObjectId, aspectObjectIri) = _commonRepository.CreateOrUseIdAndIri(null, null);

            var aspectObject = new AspectObject
            {
                Id = aspectObjectId,
                Name = name,
                Label = name,
                Position = JsonConvert.SerializeObject(new AspectObjectPosition
                {
                    ThreePosX = positionX,
                    ThreePosY = positionY
                }),
                Connectors = new List<Connector>(),
                Version = version,
                Rds = string.Empty,
                AspectObjectType = AspectObjectType.Root,
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
            var (connectorId, _) = _commonRepository.CreateOrUseIdAndIri(null, null);

            var connector = new ConnectorPartOf
            {
                Id = connectorId,
                Name = connectorName,
                Direction = ConnectorDirection.Output,
                AspectObjectId = aspectObject.Id
            };

            aspectObject.Connectors.Add(connector);
            return aspectObject;
        }

        /// <summary>
        /// Create a initial project
        /// </summary>
        /// <param name="createProject"></param>
        /// <param name="isSubProject"></param>
        /// <returns></returns>
        /// <exception cref="MimirorgInvalidOperationException"></exception>
        private Project CreateInitProject(CreateProjectAm createProject, bool isSubProject)
        {
            const string version = "1.0";

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
                AspectObjects = new List<AspectObject>
                {
                    CreateInitAspectObject(Aspect.Function, projectId, projectIri),
                    CreateInitAspectObject(Aspect.Product, projectId, projectIri),
                    CreateInitAspectObject(Aspect.Location, projectId, projectIri)
                }
            };

            return project;
        }

        /// <summary>
        /// Clear Entity Framework change-trackers 
        /// </summary>
        private void ClearAllChangeTracker()
        {
            _projectRepository?.Context?.ChangeTracker.Clear();
            _aspectObjectRepository?.Context?.ChangeTracker.Clear();
            _connectionRepository?.Context?.ChangeTracker.Clear();
            _connectorRepository?.Context?.ChangeTracker.Clear();
            _attributeRepository?.Context?.ChangeTracker.Clear();
        }

        #endregion Private
    }
}