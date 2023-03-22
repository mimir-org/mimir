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
using Mb.Models.Const;
using Mb.Models.Extensions;
using Newtonsoft.Json;

namespace Mb.Services.Services;

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
    public IEnumerable<ProjectCm> GetBySearch(string name, int from, int number)
    {
        return _projectRepository.GetProjectList(name, from, number);
    }

    /// <summary>
    /// Get a project by Id or Iri. The project will include all connections, aspectObjects,
    /// attributes and connectors.
    /// </summary>
    /// <param name="id"></param>
    /// <returns>The actual project</returns>
    /// <exception cref="MimirorgNotFoundException">Throws if the project does not exist</exception>
    public async Task<ProjectCm> GetById(string id)
    {
        if (string.IsNullOrWhiteSpace(id))
            throw new MimirorgNotFoundException("Id can't be null og empty.");

        var projectId = id.Length == GlobalSettings.GuidLength ? _commonRepository.GetServerUrl(ServerEndpoint.Project) + $"/{id}" : id;

        var project = await _projectRepository.GetAsyncComplete(projectId);

        if (project == null)
            throw new MimirorgNotFoundException($"Could not find project with id: {id}");

        return _mapper.Map<ProjectCm>(project);
    }

    /// <summary>
    /// Create a new empty project. The project wil include the aspect root aspectObjects.
    /// </summary>
    /// <param name="projectCreateAm"></param>
    /// <returns></returns>
    public async Task<ProjectCm> CreateProject(ProjectCreateAm projectCreateAm)
    {
        if (_projectRepository.FindBy(x => x.Name.ToLower().Equals(projectCreateAm.Name.ToLower())).FirstOrDefault() != null)
            throw new MimirorgInvalidOperationException("There already exist a project with the same name");

        var projectDm = _mapper.Map<ProjectDm>(projectCreateAm);

        projectDm.AspectObjects = new List<AspectObjectDm>
        {
            CreateInitAspectObject(Aspect.Function, projectDm.Id),
            CreateInitAspectObject(Aspect.Product, projectDm.Id),
            CreateInitAspectObject(Aspect.Location, projectDm.Id)
        };

        await _projectRepository.CreateAsync(projectDm);
        await _projectRepository.SaveAsync();

        await _aspectObjectRepository.CreateAsync(projectDm.AspectObjects);
        await _aspectObjectRepository.SaveAsync();

        await _connectorRepository.CreateAsync(projectDm.AspectObjects.SelectMany(x => x.Connectors));
        await _aspectObjectRepository.SaveAsync();

        return _mapper.Map<ProjectCm>(projectDm);
    }

    /// <summary>
    /// Convert or inverse sub project
    /// </summary>
    /// <param name="projectId"></param>
    /// <returns>Completed Task</returns>
    public async Task ConvertSubProject(string projectId)
    {
        var project = await GetById(projectId);
        var am = _mapper.Map<ProjectAm>(project);
        am.IsSubProject = !am.IsSubProject;
        await UpdateProject(am.Id, am, _commonRepository.GetDomain());
    }

    /// <summary>
    /// Create a new Mimir project based on data
    /// </summary>
    /// <param name="project">The project that should be created</param>
    /// <returns>A create project task</returns>
    /// <exception cref="MimirorgDuplicateException">Throws if there is already a project, aspectObject or connection with same id.</exception>
    /// <exception cref="MimirorgNullReferenceException">Throws if project is null</exception>
    /// <exception cref="MimirorgBadRequestException">Throws if project is not valid</exception>
    public async Task<ProjectCm> UpdateProject(ProjectAm project)
    {
        if (project == null)
            throw new MimirorgNullReferenceException("The project that should be created is null.");

        var validation = project.ValidateObject();
        if (!validation.IsValid)
            throw new MimirorgBadRequestException($"Couldn't create project with name: {project.Name}",
                validation);

        var existingProject = Exist(project.Id, project.Id);
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
        var newProject = new ProjectDm
        {
            CreatedBy = _contextAccessor.GetName(),
            UpdatedBy = _contextAccessor.GetName(),
            Updated = DateTime.Now.ToUniversalTime()
        };

        // Map data
        _mapper.Map(project, newProject);

        // Deconstruct project
        var projectData = new ProjectData();
        await _remapService.DeConstruct(newProject, projectData);
        await _projectRepository.CreateProject(newProject, projectData);

        var updatedProject = await GetById(newProject.Id);
        return _mapper.Map<ProjectCm>(updatedProject);
    }

    /// <summary>
    /// Create a new sub project based on an existing project. 
    /// </summary>
    /// <param name="subProjectAm"></param>
    /// <returns></returns>
    public async Task<ProjectCm> CreateSubProject(SubProjectAm subProjectAm)
    {
        try
        {
            if (subProjectAm == null)
                throw new MimirorgNullReferenceException("Sub-project is null");

            var validation = subProjectAm.ValidateObject();
            if (!validation.IsValid)
                throw new MimirorgBadRequestException(
                    $"Couldn't create sub-project with name: {subProjectAm.Name}", validation);

            var fromProject = await _projectRepository.GetAsyncComplete(subProjectAm.FromProjectId);
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
            var newSubProject = _mapper.Map<ProjectDm>(projectAm);

            // Deconstruct project
            var projectData = new ProjectData();
            await _remapService.DeConstruct(newSubProject, projectData);
            await _projectRepository.CreateProject(newSubProject, projectData);

            var updatedProject = await GetById(newSubProject.Id);
            return _mapper.Map<ProjectCm>(updatedProject);
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
    /// <returns>Update Project Task</returns>
    /// <exception cref="MimirorgInvalidOperationException">Throws if invoking domain is not set.</exception>
    /// <exception cref="MimirorgNotFoundException">Throws if project is missing from database.</exception>
    /// <exception cref="MimirorgNullReferenceException">Throws if project is null, or missing both id and iri.</exception>
    /// <exception cref="MimirorgBadRequestException">Throws if project is not valid.</exception>
    /// TODO: We need to handle invokedByDomain in update process
    public async Task UpdateProject(string id, ProjectAm project, string invokedByDomain)
    {
        if (string.IsNullOrWhiteSpace(id) || project == null)
            throw new MimirorgNullReferenceException("Id must have value. Project can't be null.");

        if (string.IsNullOrWhiteSpace(invokedByDomain))
            throw new MimirorgInvalidOperationException("Domain can't be null or empty");

        var validation = project.ValidateObject();
        if (!validation.IsValid)
            throw new MimirorgBadRequestException($"Couldn't update project with name: {project.Name}",
                validation);

        var projectId = id.Length == GlobalSettings.GuidLength ? _commonRepository.GetServerUrl(ServerEndpoint.Project) + $"/{id}" : id;

        var original = await _projectRepository.GetAsyncComplete(projectId);
        project.Version = original.Version;
        ClearAllChangeTracker();

        if (original == null)
            throw new MimirorgNotFoundException($"The project with id:{id}, could not be found.");

        // Remap and create new id's
        _ = _remapService.Remap(project);

        // Map updated project
        var updated = _mapper.Map<ProjectDm>(project);
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
        var existingProject = await _projectRepository.GetProjectAsync(projectId);
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
    public async Task<(byte[] file, FileFormat format)> DownloadProject(string projectId, Guid id)
    {
        var project = await _projectRepository.GetAsyncComplete(projectId);

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
    public bool Exist(string projectId, string projectIri)
    {
        var exist = _projectRepository.Context.Projects.Any(x => x.Id == projectId || x.Id == projectIri);
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
        var subProject = await _projectRepository.GetAsyncComplete(prepare.SubProject);
        if (subProject == null)
            throw new MimirorgNotFoundException("There is no sub-project with current id");

        if (subProject.Version != prepare.Version)
            subProject = await _versionService.GetGetByVersion(prepare.SubProject, prepare.Version);

        if (subProject == null)
            throw new MimirorgNotFoundException("There is no sub-project with current id and version");

        var projectAm = _mapper.Map<ProjectAm>(subProject);

        // Save the project as a temporary project, the cleanup hosted service will remove this temp project later
        projectAm.Name = $"temp_{Guid.NewGuid()}_{projectAm.Name}";
        projectAm.Description = "This is a temporary project";
        projectAm.IsSubProject = true;

        _ = _remapService.Clone(projectAm);
        var newSubProject = _mapper.Map<ProjectDm>(projectAm);
        var projectData = new ProjectData();
        await _remapService.DeConstruct(newSubProject, projectData);
        await _projectRepository.CreateProject(newSubProject, projectData);

        // Get the created project
        var updatedProject = await _projectRepository.GetAsyncComplete(newSubProject.Id);

        // Identify root aspectObjects
        var rootAspectObjects = updatedProject.AspectObjects.Where(x => x.AspectObjectType == AspectObjectType.Root).Select(x => x.Id).ToList();

        // Position aspectObject
        var rootOrigin = updatedProject.AspectObjects.Where(x => rootAspectObjects.All(y => y != x.Id)).MinBy(x => JsonConvert.DeserializeObject<AspectObjectPositionDm>(x.Position).ThreePosY);

        // Set aspectObject and connections project id to merge project, and calculate position
        updatedProject.AspectObjects = updatedProject.AspectObjects.Where(x => rootAspectObjects.All(y => y != x.Id)).Select(x =>
        {
            x.Project = prepare.Project;
            x.Project = null;
            return x.CalculatePosition(rootOrigin, prepare);
        }).ToList();

        // Set root origin to center
        if (rootOrigin != null)
        {
            JsonConvert.DeserializeObject<AspectObjectPositionDm>(rootOrigin.Position).ThreePosX = (int) prepare.DropPositionX;
            JsonConvert.DeserializeObject<AspectObjectPositionDm>(rootOrigin.Position).ThreePosY = (int) prepare.DropPositionY;
        }

        // TODO: Resolve this
        //updatedProject.Connections = updatedProject.Connections.Where(x => !rootAspectObjects.Any(y => (y == x.FromAspectObject || y == x.ToAspectObject))).Select(x =>
        //{
        //    x.Project = prepare.ProjectId;
        //    return x;
        //}).ToList();

        var prepareCm = new PrepareCm
        {
            SubProjectId = prepare.SubProject,
            AspectObjects = _mapper.Map<List<AspectObjectCm>>(updatedProject.AspectObjects),
            Connections = _mapper.Map<List<ConnectionCm>>(updatedProject.Connections)
        };

        return prepareCm;
    }

    #region Private

    /// <summary>
    /// Create init aspect aspectObjects
    /// </summary>
    /// <param name="aspect"></param>
    /// <param name="projectId"></param>
    /// <returns></returns>
    private AspectObjectDm CreateInitAspectObject(Aspect aspect, string projectId)
    {
        var aspectObjectId = _commonRepository.CreateId(ServerEndpoint.AspectObject);
        var aspectName = aspect == Aspect.Function ? "Function" : aspect == Aspect.Product ? "Product" : "Location";

        var aspectObject = new AspectObjectDm
        {
            Id = aspectObjectId,
            Version = "1.0",
            Name = aspectName,
            Label = aspectName,
            Description = $"The root {aspectName.ToLower()} aspect object",
            Aspect = aspect,
            AspectObjectType = AspectObjectType.Root,
            Project = projectId,
            MainProject = projectId,
            LibraryType = aspectObjectId,
            Position = JsonConvert.SerializeObject(new AspectObjectPositionDm
            {
                ThreePosX = aspect == Aspect.Function ? 150 : aspect == Aspect.Product ? 600 : 1050,
                ThreePosY = 5
            }),
            ReferenceType = aspectObjectId,
            CreatedBy = _contextAccessor.GetName(),
            Created = DateTime.Now.ToUniversalTime(),
            UpdatedBy = null,
            Updated = null,
            Rds = null,
            Symbol = null,
            Purpose = null,
            IsLocked = false,
            IsLockedStatusBy = null,
            IsLockedStatusDate = null,

            Connectors = new List<ConnectorDm>
            {
                new ConnectorPartOfDm
                {
                    Id = _commonRepository.CreateId(ServerEndpoint.Connector),
                    Name = "PartOf",
                    Inside = Guid.NewGuid().ToString(),
                    Outside = Guid.NewGuid().ToString(),
                    Project = projectId,
                    Direction = ConnectorDirection.Output,
                    AspectObject = aspectObjectId
                }
            },
            Attributes = new List<AttributeDm>()
        };

        return aspectObject;
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