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
    public async Task<ProjectResponse> GetById(Guid id)
    {
        if (id == Guid.Empty)
            throw new MimirorgNotFoundException("Id can't be empty.");

        //projectDm.Id = _commonRepository.IsValidGuid(projectAm.Id)
        //    ? _commonRepository.CreateIdAsIri(ServerEndpoint.Project, projectAm.Id)
        //    : _commonRepository.CreateIdAsIri(ServerEndpoint.Project, projectId.ToString());

        var project = await _projectRepository.GetAsyncComplete(id);

        return project == null ? throw new MimirorgNotFoundException($"Could not find project with id: {id}") : _mapper.Map<ProjectResponse>(project);
    }

    /// <summary>
    /// Get a project by Id or Iri. The project will include all connections, blocks,
    /// attributes and connectors.
    /// </summary>
    /// <param name="id"></param>
    /// <returns>The actual project as AM</returns>
    /// <exception cref="MimirorgNotFoundException">Throws if the project does not exist</exception>
    public async Task<ProjectRequest> GetAmById(Guid id)
    {
        if (id == Guid.Empty)
            throw new MimirorgNotFoundException("Id can't be null og empty.");

        var projectId = id;
        var project = await _projectRepository.GetAsyncComplete(projectId);

        return project == null ? throw new MimirorgNotFoundException($"Could not find project with id: {id}") : _mapper.Map<ProjectRequest>(project);
    }

    /// <summary>
    /// Get a list of project items from start index and a max number that will be returned.
    /// The list will be filtered on the name parameter.
    /// </summary>
    /// <param name="name">Name search filter</param>
    /// <param name="from">From number</param>
    /// <param name="number">Number of items</param>
    /// <returns>A list project list items</returns>
    public IEnumerable<ProjectResponse> GetBySearch(string name, int from, int number)
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
    public async Task<Guid> Create(ProjectRequest projectAm)
    {
        if (projectAm == null)
            throw new MimirorgNullReferenceException("The project that should be created is null.");

        var validation = projectAm.ValidateObject();

        if (!validation.IsValid)
            throw new MimirorgBadRequestException($"Validation failed! Unable to create project with name: {projectAm.Name}", validation);

        return await CreateProject(projectAm);

    }

    /// <summary>
    /// Create or update a new project
    /// </summary>
    /// <param name="projectAm">The project that should be created or updated</param>
    /// <returns>A create project task</returns>
    /// <exception cref="MimirorgNullReferenceException">Throws if project is null</exception>
    /// <exception cref="MimirorgBadRequestException">Throws if project is not valid</exception>
    public async Task<Guid> Update(ProjectRequest projectAm)
    {
        if (projectAm == null)
            throw new MimirorgNullReferenceException("The project that should be created is null.");

        var validation = projectAm.ValidateObject();

        if (!validation.IsValid)
            throw new MimirorgBadRequestException($"Validation failed! Unable to create project with name: {projectAm.Name}", validation);

        var originalProject = await _projectRepository.GetAsyncComplete(projectAm.Id);
        if (originalProject == null)
            throw new MimirorgBadRequestException($"Could not find project to update. Project name: {projectAm.Name}, project id: {projectAm.Id}");
        return await UpdateProject(projectAm, originalProject);

    }

    ///// <summary>
    ///// Create or update a new project
    ///// </summary>
    ///// <param name="projectAm">The project that should be created or updated</param>
    ///// <returns>A create project task</returns>
    ///// <exception cref="MimirorgNullReferenceException">Throws if project is null</exception>
    ///// <exception cref="MimirorgBadRequestException">Throws if project is not valid</exception>
    //public async Task<Guid> Update(ProjectAm projectAm)
    //{
    //    if (projectAm == null)
    //        throw new MimirorgNullReferenceException("The project that should be created is null.");

    //    var validation = projectAm.ValidateObject();

    //    if (!validation.IsValid)
    //        throw new MimirorgBadRequestException($"Validation failed! Unable to create project with name: {projectAm.Name}", validation);

    //    if (projectAm.Id != null)
    //    {
    //        var originalProject = await _projectRepository.GetAsyncComplete(projectAm.Id);
    //        if (originalProject != null)
    //            return await UpdateProject(projectAm, originalProject);
    //    }
    //    return Guid.Empty;
    //}

    /// <summary>
    /// Convert or inverse sub project
    /// </summary>
    /// <param name="projectId"></param>
    /// <returns>Completed Task</returns>
    public async Task ConvertSubProject(Guid projectId)
    {
        var am = await GetAmById(projectId);
        am.SubProject = !am.SubProject;
        await Create(am); //Create or update here? check on incoming value
    }

    /// <summary>
    /// Create a new sub project based on an existing project. 
    /// </summary>
    /// <param name="subProjectAm"></param>
    /// <returns></returns>
    public async Task<ProjectResponse> CreateSubProject(SubProjectRequest subProjectAm)
    {
        try
        {
            if (subProjectAm == null)
                throw new MimirorgNullReferenceException("Sub-project is null");

            //subProjectAm.FromProjectId = HttpUtility.UrlDecode(subProjectAm.FromProjectId);

            var validation = subProjectAm.ValidateObject();
            if (!validation.IsValid)
                throw new MimirorgBadRequestException(
                    $"Couldn't create sub-project with name: {subProjectAm.Name}", validation);

            var fromProject = await _projectRepository.GetAsyncComplete(subProjectAm.FromProjectId);

            if (fromProject == null)
                throw new MimirorgInvalidOperationException("The original project does not exist");

            var projectAm = _mapper.Map<ProjectRequest>(fromProject);

            projectAm.Name = subProjectAm.Name;
            projectAm.Description = subProjectAm.Description;
            projectAm.SubProject = true;
            //projectAm.Blocks = projectAm.Blocks.Where(x => x.BlockType == BlockType.Root || subProjectAm.Blocks.Any(y => x.Id == y)).ToList();
            //projectAm.Connections = projectAm.Connections.Where(x => subProjectAm.Connections.Any(y => x.Id == y)).ToList();

            _ = _remapService.Clone(projectAm);

            // Map data
            var newSubProject = _mapper.Map<Project>(projectAm);

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
    public async Task Delete(Guid? projectId)
    {
        if (projectId == Guid.Empty)
            throw new MimirorgNullReferenceException("Id is null or empty");


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
    public async Task<(byte[] file, FileFormat format)> Download(Guid projectId, Guid id)
    {
        if (projectId == Guid.Empty)
            throw new MimirorgNullReferenceException("Id is null or empty");

        var project = await _projectRepository.GetAsyncComplete(projectId);

        if (_moduleService.Modules.All(x =>
                x.ModuleDescription != null && x.ModuleDescription.Id != Guid.Empty && !string.Equals(
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
    public bool Exist(Guid? projectId)
    {
        if (projectId == Guid.Empty)
            throw new MimirorgNullReferenceException("Id is null or empty");


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
    public async Task<PrepareResponse> PrepareForMerge(PrepareRequest prepare)
    {
        if (prepare == null)
            throw new MimirorgNullReferenceException("PrepareAm is null");

        var subProject = await _projectRepository.GetAsyncComplete(prepare.SubProject);

        if (subProject == null)
            throw new MimirorgNotFoundException("There is no sub-project with current id");

        if (subProject.Version != prepare.Version)
            subProject = await _versionService.GetGetByVersion(prepare.SubProject, prepare.Version);

        if (subProject == null)
            throw new MimirorgNotFoundException("There is no sub-project with current id and version");

        var projectAm = _mapper.Map<ProjectRequest>(subProject);

        // Save the project as a temporary project, the cleanup hosted service will remove this temp project later
        projectAm.Name = $"temp_{Guid.NewGuid()}_{projectAm.Name}";
        projectAm.Description = "This is a temporary project";
        projectAm.SubProject = true;

        _ = _remapService.Clone(projectAm);
        var newSubProject = _mapper.Map<Project>(projectAm);
        var projectData = new ProjectData();
        await _remapService.DeConstruct(newSubProject, projectData);
        await _projectRepository.CreateProject(newSubProject, projectData);

        // Get the created project
        var updatedProject = await _projectRepository.GetAsyncComplete(newSubProject.Id);

        // Identify root blocks
        var rootBlocks = updatedProject.Blocks.Where(x => x.BlockType == "Root").Select(x => x.Id).ToList();

        // Position block
        var rootOrigin = updatedProject.Blocks.Where(x => rootBlocks.All(y => y != x.Id)).MinBy(x => JsonConvert.DeserializeObject<Position>(x.PositionTree).PosY);

        // Set block and connections project id to merge project, and calculate position
        updatedProject.Blocks = updatedProject.Blocks.Where(x => rootBlocks.All(y => y != x.Id)).Select(x =>
        {
            x.Project = prepare.Project;
            x.Project = Guid.Empty;
            return x.CalculatePosition(rootOrigin, prepare);
        }).ToList();

        // Set root origin to center
        if (rootOrigin != null)
        {
            JsonConvert.DeserializeObject<Position>(rootOrigin.PositionTree).PosX = (int) prepare.DropPositionX;
            JsonConvert.DeserializeObject<Position>(rootOrigin.PositionTree).PosY = (int) prepare.DropPositionY;
        }

        // TODO: Resolve this
        //updatedProject.Connections = updatedProject.Connections.Where(x => !rootBlocks.Any(y => (y == x.FromBlock || y == x.ToBlock))).Select(x =>
        //{
        //    x.Project = prepare.ProjectId;
        //    return x;
        //}).ToList();

        var prepareCm = new PrepareResponse
        {
            SubProjectId = prepare.SubProject,
            Blocks = _mapper.Map<List<BlockResponse>>(updatedProject.Blocks),
            Connections = _mapper.Map<List<ConnectionResponse>>(updatedProject.Connections)
        };

        return prepareCm;
    }

    #region Private

    /// <summary>
    /// Create a new empty project. The project wil include the aspect root blocks.
    /// </summary>
    /// <param name="projectAm"></param>
    /// <returns></returns>
    private async Task<Guid> CreateProject(ProjectRequest projectAm)
    {
        try
        {
            //Guard check if guid format is correct on all guids

            var projectId = Guid.NewGuid();

            projectAm.Id = projectId;

            foreach (var item in projectAm.Blocks)
            {
                item.MainProject = projectId;
                item.Project = projectId;
            }

            var projectDm = _mapper.Map<Project>(projectAm);

            projectDm.Version = "1.0";
            projectDm.CreatedBy = _contextAccessor.GetName();
            projectDm.Created = DateTime.Now.ToUniversalTime();

            foreach (var block in projectDm.Blocks.Where(block => block.BlockType == "Root" || block.Id == Guid.Empty))
            {
                var blockId = Guid.NewGuid(); //This should come from frontend                
                block.Id = blockId;
            }

            await _projectRepository.CreateAsync(projectDm);
            await _projectRepository.SaveAsync();

            await _blockRepository.CreateAsync(projectDm.Blocks);
            await _blockRepository.SaveAsync();

            await _connectorRepository.CreateAsync(projectDm.Blocks.SelectMany(x => x.Connectors));
            await _blockRepository.SaveAsync();


            return projectId;

        }
        catch (Exception ex)
        {

            throw;
        }
    }

    /// <summary>
    /// Update en existing project.
    /// </summary>
    /// <param name="updatedAm"></param>
    /// <param name="originalDm"></param>
    /// <returns></returns>
    private async Task<Guid> UpdateProject(ProjectRequest updatedAm, Project originalDm)
    {
            if (updatedAm == null || originalDm == null)
                throw new MimirorgNullReferenceException("updated or original project is null");

            var updatedProject = _mapper.Map<Project>(updatedAm);

            updatedProject.Blocks = _mapper.Map<List<Block>>(updatedAm.Blocks);

            // Get create edit data
            var projectEditData = await _remapService.CreateEditData(originalDm, updatedProject);

            // Resolve version changes
            var projectVersionStatus = originalDm.CalculateVersionStatus(updatedProject, projectEditData);
            updatedProject.UpdateVersion(projectVersionStatus);

            var blocks = _blockRepository.GetAll().ToList(); //Must have projectguid in as parameter
            var blocksInProject = blocks.Where(x => x.Project == updatedProject.Id).ToList();

            // Resolve block versions
            foreach (var updatedBlock in updatedProject.Blocks)
            {
                var originalBlock = originalDm.Blocks.FirstOrDefault(x => x.Id == updatedBlock.Id);
                var blockFromDb = blocksInProject.FirstOrDefault(x => x.Id == updatedBlock.Id);
                if (originalBlock == null || blockFromDb == null)
                {
                    await _blockRepository.CreateAsync(updatedBlock);
                    await _blockRepository.SaveAsync();
                }        
            }

            // Save original project (if there is a version change)
            if (projectVersionStatus != VersionStatus.NoChange)
                await _versionService.CreateVersion(originalDm);

            //Update
            await _projectRepository.UpdateProject(originalDm, updatedProject, projectEditData);

            //Send websocket data.
            //await _cooperateService.SendDataUpdates(projectEditData, originalDm.Id, updatedProject.Version); //TODO Here

            //Get the updated project
            var updatedDm = await _projectRepository.GetAsyncComplete(updatedProject.Id);

            return updatedDm.Id;    
    }


    /// <summary>
    /// Create init aspect blocks
    /// </summary>
    /// <param name="aspect"></param>
    /// <param name="projectId"></param>
    /// <returns></returns>
    private Block CreateInitBlock(Aspect aspect, Guid projectId)
    {
        if (projectId == Guid.Empty)
            throw new MimirorgNullReferenceException("projectId is null or empty");

        var blockId = Guid.NewGuid();
        var aspectName = aspect == Aspect.Function ? "Function" : aspect == Aspect.Product ? "Product" : "Location";

        var block = new Block
        {
            Id = blockId,       
            Name = aspectName,      
            Description = $"The root {aspectName.ToLower()} block",
            Aspect = aspect,
            BlockType = "Root",       
            PositionTree = JsonConvert.SerializeObject(new Position
            {
                PosX = aspect == Aspect.Function ? 150 : aspect == Aspect.Product ? 600 : 1050,
                PosY = 5
            }),   
            CreatedBy = _contextAccessor.GetName(),
            Created = DateTime.Now.ToUniversalTime(),
            UpdatedBy = null,
            Updated = null,
            IsLocked = false,
            IsLockedStatusBy = null,
            IsLockedStatusDate = null,
            Attributes = new List<Models.Data.Attribute>(),
            Connectors = new List<Connector>
            {
                new Connector
                    {
                        Id = Guid.NewGuid(),
                        Name = "PartOf",
                        Inside = Guid.NewGuid().ToString(),
                        Outside = Guid.NewGuid().ToString(),
                        Direction = ConnectorDirection.Output,
                        BlockId = blockId
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