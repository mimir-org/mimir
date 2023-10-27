using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Common;
using Mb.Models.Const;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Models.Extensions;
using Mb.Models.Records;
using Mb.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Mimirorg.Common.Exceptions;
using Mimirorg.Common.Extensions;
using Mimirorg.TypeLibrary.Enums;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Mb.Services.Services;

public class ProjectService : IProjectService
{
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _contextAccessor;
    private readonly IProjectRepository _projectRepository;
    private readonly IAttributeRepository _attributeRepository;
    private readonly IBlockRepository _blockRepository;
    private readonly IConnectionRepository _connectionRepository;
    private readonly IConnectorRepository _connectorRepository;
    private readonly ICommonRepository _commonRepository;
    private readonly IModuleService _moduleService;
    private readonly IRemapService _remapService;
    private readonly ICooperateService _cooperateService;
    private readonly ILogger<ProjectService> _logger;
    private readonly IVersionService _versionService;


    public ProjectService(IProjectRepository projectRepository, IMapper mapper,
        IHttpContextAccessor contextAccessor, IBlockRepository blockRepository, IConnectionRepository connectionRepository,
        ICommonRepository commonRepository, IConnectorRepository connectorRepository, IModuleService moduleService,
        IAttributeRepository attributeRepository, ILogger<ProjectService> logger, IRemapService remapService,
        ICooperateService cooperateService, IVersionService versionService)
    {
        _projectRepository = projectRepository;
        _mapper = mapper;
        _contextAccessor = contextAccessor;
        _blockRepository = blockRepository;
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
    /// Get a project by Id or Iri. The project will include all connections, blocks,
    /// attributes and connectors.
    /// </summary>
    /// <param name="id"></param>
    /// <returns>The actual project as CM</returns>
    /// <exception cref="MimirorgNotFoundException">Throws if the project does not exist</exception>
    public async Task<ProjectCm> GetById(string id)
    {
        if (string.IsNullOrWhiteSpace(id))
            throw new MimirorgNotFoundException("Id can't be null og empty.");

        id = HttpUtility.UrlDecode(id);

        var projectId = id.Length == GlobalSettings.GuidLength ? _commonRepository.GetEndpoint(ServerEndpoint.Project) + $"/{id}" : id;
        var project = await _projectRepository.GetAsyncComplete(projectId);

        return project == null ? throw new MimirorgNotFoundException($"Could not find project with id: {id}") : _mapper.Map<ProjectCm>(project);
    }

    /// <summary>
    /// Get a project by Id or Iri. The project will include all connections, blocks,
    /// attributes and connectors.
    /// </summary>
    /// <param name="id"></param>
    /// <returns>The actual project as AM</returns>
    /// <exception cref="MimirorgNotFoundException">Throws if the project does not exist</exception>
    public async Task<ProjectAm> GetAmById(string id)
    {
        if (string.IsNullOrWhiteSpace(id))
            throw new MimirorgNotFoundException("Id can't be null og empty.");

        id = HttpUtility.UrlDecode(id);

        var projectId = id.Length == GlobalSettings.GuidLength ? _commonRepository.GetEndpoint(ServerEndpoint.Project) + $"/{id}" : id;
        var project = await _projectRepository.GetAsyncComplete(projectId);

        return project == null ? throw new MimirorgNotFoundException($"Could not find project with id: {id}") : _mapper.Map<ProjectAm>(project);
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
    /// Create or update a new project
    /// </summary>
    /// <param name="projectAm">The project that should be created or updated</param>
    /// <returns>A create project task</returns>
    /// <exception cref="MimirorgNullReferenceException">Throws if project is null</exception>
    /// <exception cref="MimirorgBadRequestException">Throws if project is not valid</exception>
    public async Task<ProjectCm> CreateOrUpdate(ProjectAm projectAm)
    {
        if (projectAm == null)
            throw new MimirorgNullReferenceException("The project that should be created is null.");

        projectAm.Id = HttpUtility.UrlDecode(projectAm.Id);

        var validation = projectAm.ValidateObject();

        if (!validation.IsValid)
            throw new MimirorgBadRequestException($"Validation failed! Unable to create project with name: {projectAm.Name}", validation);

        var originalProject = _commonRepository.IsValidGuid(projectAm.Id)
            ? await _projectRepository.GetAsyncComplete(_commonRepository.GetEndpoint(ServerEndpoint.Project) + $"/{projectAm.Id}")
            : await _projectRepository.GetAsyncComplete(projectAm.Id);

        return originalProject == null
            ? await CreateProject(projectAm)
            : await UpdateProject(projectAm, originalProject);
    }

    /// <summary>
    /// Convert or inverse sub project
    /// </summary>
    /// <param name="projectId"></param>
    /// <returns>Completed Task</returns>
    public async Task ConvertSubProject(string projectId)
    {
        projectId = HttpUtility.UrlDecode(projectId);
        var am = await GetAmById(projectId);
        am.SubProject = !am.SubProject;
        await CreateOrUpdate(am);
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

            subProjectAm.FromProjectId = HttpUtility.UrlDecode(subProjectAm.FromProjectId);

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
            projectAm.SubProject = true;
            projectAm.Blocks = projectAm.Blocks.Where(x => x.BlockType == BlockType.Root || subProjectAm.Blocks.Any(y => x.Id == y)).ToList();
            projectAm.Connections = projectAm.Connections.Where(x => subProjectAm.Connections.Any(y => x.Id == y)).ToList();

            _ = _remapService.Clone(projectAm);

            // Map data
            var newSubProject = _mapper.Map<ProjectDm>(projectAm);

            // Deconstruct project
            var projectData = new ProjectData();

            await _remapService.DeConstruct(newSubProject, projectData);
            await _projectRepository.CreateProject(newSubProject, projectData);

            var updatedProject = await GetById(newSubProject.Id);

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
    /// Delete a project from given id
    /// </summary>
    /// <param name="projectId"></param>
    /// <returns></returns>
    public async Task Delete(string projectId)
    {
        if (string.IsNullOrWhiteSpace(projectId))
            throw new MimirorgNullReferenceException("Id is null or empty");

        projectId = HttpUtility.UrlDecode(projectId);

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
    public async Task<(byte[] file, FileFormat format)> Download(string projectId, Guid id)
    {
        if (string.IsNullOrWhiteSpace(projectId))
            throw new MimirorgNullReferenceException("Id is null or empty");

        projectId = HttpUtility.UrlDecode(projectId);

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
    /// <returns></returns>
    public bool Exist(string projectId)
    {
        if (string.IsNullOrWhiteSpace(projectId))
            throw new MimirorgNullReferenceException("Id is null or empty");

        projectId = HttpUtility.UrlDecode(projectId);

        var exist = _projectRepository.Context.Projects.Any(x => x.Id == projectId);
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
        if (prepare == null)
            throw new MimirorgNullReferenceException("PrepareAm is null");

        prepare.SubProject = HttpUtility.UrlDecode(prepare.SubProject);
        prepare.Project = HttpUtility.UrlDecode(prepare.Project);

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
        projectAm.SubProject = true;

        _ = _remapService.Clone(projectAm);
        var newSubProject = _mapper.Map<ProjectDm>(projectAm);
        var projectData = new ProjectData();
        await _remapService.DeConstruct(newSubProject, projectData);
        await _projectRepository.CreateProject(newSubProject, projectData);

        // Get the created project
        var updatedProject = await _projectRepository.GetAsyncComplete(newSubProject.Id);

        // Identify root blocks
        var rootBlocks = updatedProject.Blocks.Where(x => x.BlockType == BlockType.Root).Select(x => x.Id).ToList();

        // Position block
        var rootOrigin = updatedProject.Blocks.Where(x => rootBlocks.All(y => y != x.Id)).MinBy(x => JsonConvert.DeserializeObject<PositionDm>(x.PositionTree).PosY);

        // Set block and connections project id to merge project, and calculate position
        updatedProject.Blocks = updatedProject.Blocks.Where(x => rootBlocks.All(y => y != x.Id)).Select(x =>
        {
            x.Project = prepare.Project;
            x.Project = null;
            return x.CalculatePosition(rootOrigin, prepare);
        }).ToList();

        // Set root origin to center
        if (rootOrigin != null)
        {
            JsonConvert.DeserializeObject<PositionDm>(rootOrigin.PositionTree).PosX = (int) prepare.DropPositionX;
            JsonConvert.DeserializeObject<PositionDm>(rootOrigin.PositionTree).PosY = (int) prepare.DropPositionY;
        }

        // TODO: Resolve this
        //updatedProject.Connections = updatedProject.Connections.Where(x => !rootBlocks.Any(y => (y == x.FromBlock || y == x.ToBlock))).Select(x =>
        //{
        //    x.Project = prepare.ProjectId;
        //    return x;
        //}).ToList();

        var prepareCm = new PrepareCm
        {
            SubProjectId = prepare.SubProject,
            Blocks = _mapper.Map<List<BlockCm>>(updatedProject.Blocks),
            Connections = _mapper.Map<List<ConnectionCm>>(updatedProject.Connections)
        };

        return prepareCm;
    }

    #region Private

    /// <summary>
    /// Create a new empty project. The project wil include the aspect root blocks.
    /// </summary>
    /// <param name="projectAm"></param>
    /// <returns></returns>
    private async Task<ProjectCm> CreateProject(ProjectAm projectAm)
    {
        if (projectAm == null)
            throw new MimirorgNullReferenceException("ProjectAm is null");

        projectAm.Id = HttpUtility.UrlDecode(projectAm.Id);

        var projectDm = _mapper.Map<ProjectDm>(projectAm);

        projectDm.Id = _commonRepository.IsValidGuid(projectAm.Id)
            ? _commonRepository.CreateIdAsIri(ServerEndpoint.Project, projectAm.Id)
            : _commonRepository.CreateIdAsIri(ServerEndpoint.Project, Guid.NewGuid().ToString());

        projectDm.Version = "1.0";
        projectDm.CreatedBy = _contextAccessor.GetName();
        projectDm.Created = DateTime.Now.ToUniversalTime();

        foreach (var block in projectDm.Blocks.Where(block => block.BlockType == BlockType.Root))
        {
            var blockId = _commonRepository.CreateIdAsIri(ServerEndpoint.Block, Guid.NewGuid().ToString());
            block.LibraryType = blockId;
        }

        // projectDm.Blocks = new List<BlockDm>
        // {
        //     CreateInitBlock(Aspect.Function, projectDm.Id),
        //     CreateInitBlock(Aspect.Product, projectDm.Id),
        //     CreateInitBlock(Aspect.Location, projectDm.Id)
        // };

        await _projectRepository.CreateAsync(projectDm);
        await _projectRepository.SaveAsync();

        await _blockRepository.CreateAsync(projectDm.Blocks);
        await _blockRepository.SaveAsync();

        await _connectorRepository.CreateAsync(projectDm.Blocks.SelectMany(x => x.Connectors));
        await _blockRepository.SaveAsync();

        try
        {
            return _mapper.Map<ProjectCm>(projectDm);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    /// <summary>
    /// Update en existing project.
    /// </summary>
    /// <param name="updatedAm"></param>
    /// <param name="originalDm"></param>
    /// <returns></returns>
    private async Task<ProjectCm> UpdateProject(ProjectAm updatedAm, ProjectDm originalDm)
    {
        if (updatedAm == null || originalDm == null)
            throw new MimirorgNullReferenceException("updated or original project is null");

        updatedAm.Id = HttpUtility.UrlDecode(updatedAm.Id);

        var updatedProject = _mapper.Map<ProjectDm>(updatedAm);

        // Get create edit data
        var projectEditData = await _remapService.CreateEditData(originalDm, updatedProject);

        // Resolve version changes
        var projectVersionStatus = originalDm.CalculateVersionStatus(updatedProject, projectEditData);
        updatedProject.UpdateVersion(projectVersionStatus);

        // Resolve block versions
        foreach (var updatedBlock in updatedProject.Blocks)
        {
            var originalBlock = originalDm.Blocks.FirstOrDefault(x => x.Id == updatedBlock.Id);

            if (originalBlock == null) //TODO: New block
                continue;

            var blockVersionStatus = originalBlock.CalculateVersionStatus(updatedBlock, projectEditData);

            if (blockVersionStatus != VersionStatus.NoChange)
            {
                updatedBlock.Updated = DateTime.Now.ToUniversalTime();
                updatedBlock.UpdatedBy = _contextAccessor.GetName() ?? "Unknown";
                updatedBlock.UpdateVersion(blockVersionStatus);
            }
        }

        // Save original project (if there is a version change)
        if (projectVersionStatus != VersionStatus.NoChange)
            await _versionService.CreateVersion(originalDm);

        //Update
        await _projectRepository.UpdateProject(originalDm, updatedProject, projectEditData);

        //Send websocket data.
        await _cooperateService.SendDataUpdates(projectEditData, originalDm.Id, updatedProject.Version);

        //Get the updated project
        var updatedDm = await _projectRepository.GetAsyncComplete(updatedProject.Id);

        return _mapper.Map<ProjectCm>(updatedDm);
    }

    /// <summary>
    /// Create init aspect blocks
    /// </summary>
    /// <param name="aspect"></param>
    /// <param name="projectId"></param>
    /// <returns></returns>
    private BlockDm CreateInitBlock(Aspect aspect, string projectId)
    {
        if (string.IsNullOrWhiteSpace(projectId))
            throw new MimirorgNullReferenceException("projectId is null or empty");

        projectId = HttpUtility.UrlDecode(projectId);

        var blockId = _commonRepository.CreateIdAsIri(ServerEndpoint.Block, Guid.NewGuid().ToString());
        var aspectName = aspect == Aspect.Function ? "Function" : aspect == Aspect.Product ? "Product" : "Location";

        var block = new BlockDm
        {
            Id = blockId,
            Version = "1.0",
            Name = aspectName,
            Label = aspectName,
            Description = $"The root {aspectName.ToLower()} block",
            Aspect = aspect,
            BlockType = BlockType.Root,
            Project = projectId,
            MainProject = projectId,
            LibraryType = blockId,
            PositionTree = JsonConvert.SerializeObject(new PositionDm
            {
                PosX = aspect == Aspect.Function ? 150 : aspect == Aspect.Product ? 600 : 1050,
                PosY = 5
            }),
            ReferenceType = blockId,
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
            Attributes = new List<AttributeDm>(),
            Connectors = new List<ConnectorDm>
            {
                new ConnectorPartOfDm
                    {
                        Id = _commonRepository.CreateIdAsIri(ServerEndpoint.Connector, Guid.NewGuid().ToString()),
                        Name = "PartOf",
                        Inside = Guid.NewGuid().ToString(),
                        Outside = Guid.NewGuid().ToString(),
                        Direction = ConnectorDirection.Output,
                        Block = blockId
                    }
            }
        };

        return block;
    }

    /// <summary>
    /// Clear Entity Framework change-trackers 
    /// </summary>
    private void ClearAllChangeTracker()
    {
        _projectRepository?.Context?.ChangeTracker.Clear();
        _blockRepository?.Context?.ChangeTracker.Clear();
        _connectionRepository?.Context?.ChangeTracker.Clear();
        _connectorRepository?.Context?.ChangeTracker.Clear();
        _attributeRepository?.Context?.ChangeTracker.Clear();
    }

    #endregion Private
}