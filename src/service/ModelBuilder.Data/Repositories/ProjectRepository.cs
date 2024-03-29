using AutoMapper;
using AutoMapper.QueryableExtensions;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Client;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Extensions;
using Mb.Models.Records;
using Microsoft.Extensions.Options;
using Mimirorg.Common.Exceptions;
using SqlBulkTools;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

// ReSharper disable IdentifierTypo
// ReSharper disable StringLiteralTypo

namespace Mb.Data.Repositories;

public class ProjectRepository : GenericRepository<ModelBuilderDbContext, Project>, IProjectRepository
{
    private readonly IMapper _mapper;
    private readonly IBlockRepository _blockRepository;
    private readonly IConnectorRepository _connectorRepository;
    private readonly IConnectionRepository _connectionRepository;
    private readonly IAttributeRepository _attributeRepository;
    private readonly DatabaseConfiguration _databaseConfiguration;
    private readonly ICacheRepository _cacheRepository;
    private readonly IModelBuilderProcRepository _modelBuilderProcRepository;

    public ProjectRepository(ModelBuilderDbContext dbContext, IMapper mapper, IBlockRepository blockRepository,
        IAttributeRepository attributeRepository, IOptions<DatabaseConfiguration> databaseConfiguration, IConnectorRepository connectorRepository,
        ICacheRepository cacheRepository, IModelBuilderProcRepository modelBuilderProcRepository, IConnectionRepository connectionRepository) : base(dbContext)
    {
        _mapper = mapper;
        _blockRepository = blockRepository;
        _connectorRepository = connectorRepository;
        _attributeRepository = attributeRepository;
        _databaseConfiguration = databaseConfiguration?.Value;
        _cacheRepository = cacheRepository;
        _modelBuilderProcRepository = modelBuilderProcRepository;
        _connectionRepository = connectionRepository;
    }

    /// <summary>
    /// Get complete project
    /// </summary>
    /// <param name="id">Project id</param>
    /// <returns>Complete project</returns>
    public async Task<Project> GetAsyncComplete(Guid? id)
    {
        if (id == Guid.Empty)
            throw new MimirorgNullReferenceException("The Id can't be null.");

        var project = GetProjectAsync(id);

        return project == null ? null : await _cacheRepository.GetOrCreateAsync(id.ToString(), () => project);
    }

    /// <summary>
    /// Get complete project async not read from cache
    /// </summary>
    /// <param name="id"></param>
    /// <returns>Complete project</returns>
    public Task<Project> GetProjectAsync(Guid? id)
    {
        var project = FindBy(x => x.Id == id)?.FirstOrDefault();

        if (project == null)
            return null;

        project.Connections = _connectionRepository.GetAll().Where(x => x.Project == id).ToList();
        project.Blocks = _blockRepository.GetAll().Where(x => x.Project == id).ToList();

        foreach (var block in project.Blocks)
        {
            block.Connectors.AddRange(_connectorRepository.GetAll().Where(x => x.BlockId == block.Id).ToList());
            block.Attributes.AddRange(_attributeRepository.GetAll().Where(x => x.BlockId == block.Id).ToList());
        }

        return Task.FromResult(project);
    }

    /// <summary>
    /// Get project list
    /// </summary>
    /// <param name="name">The project to search for</param>
    /// <param name="from">Get project from</param>
    /// <param name="number">Get number of project</param>
    /// <returns>A list of project information</returns>
    public IEnumerable<ProjectResponse> GetProjectList(string name, int from, int number)
    {
        if (string.IsNullOrEmpty(name))
            return GetAll()
                .OrderByDescending(x => x.Updated)
                .Skip(from)
                .Take(number)
                .ProjectTo<ProjectResponse>(_mapper.ConfigurationProvider)
                .ToList();

        return GetAll()
            .Where(x => x.Name.ToLower().StartsWith(name.ToLower()))
            .OrderByDescending(x => x.Updated)
            .Skip(from)
            .Take(number)
            .ProjectTo<ProjectResponse>(_mapper.ConfigurationProvider)
            .ToList();
    }

    /// <summary>
    /// Get project version list
    /// </summary>
    /// <param name="isSubProject">Get sub-projects or projects</param>
    /// <returns>A list of project version information</returns>
    public async Task<List<VersionData>> GetProjectVersions(bool isSubProject)
    {
        var procParams = new Dictionary<string, object>
        {
            {"@IsSubProject", isSubProject}
        };

        var subProjects = await _modelBuilderProcRepository.ExecuteStoredProc<VersionData>("GetProjectVersion", procParams);
        return subProjects;
    }

    /// <summary>
    /// Update project
    /// </summary>
    /// <param name="original"></param>
    /// <param name="updated"></param>
    /// <param name="data"></param>
    /// <returns>A project update task</returns>
    public async Task UpdateProject(Project original, Project updated, ProjectEditData data)
    {
        if (original == null || updated == null || data == null)
            throw new MimirorgNullReferenceException(
                "Original project, updated project and project edit can't be null.");

        var bulk = new BulkOperations();

        using (var trans = new TransactionScope(TransactionScopeOption.Required, new TimeSpan(0, 0, 10, 0)))
        {
            await using (var conn = new SqlConnection(_databaseConfiguration.ConnectionString))
            {
                // Upsert
                bulk.Setup<Project>()
                    .ForObject(updated)
                    .WithTable("Project")
                    .AddColumn(x => x.Id)         
                    .AddColumn(x => x.Version)
                    .AddColumn(x => x.Name)
                    .AddColumn(x => x.Description)
                    .AddColumn(x => x.UpdatedBy)
                    .AddColumn(x => x.Updated)
                    .AddColumn(x => x.CreatedBy)
                    .AddColumn(x => x.Created)
                    .Upsert()
                    .MatchTargetOn(x => x.Id)
                    .Commit(conn);

                _blockRepository.BulkUpsert(bulk, conn, data.BlockUpdateInsert);                
                _attributeRepository.BulkUpsert(bulk, conn, data.AttributeUpdateInsert);

                // Delete attributes
                _attributeRepository.BulkDelete(bulk, conn, data.AttributeDelete);
         
                // Delete blocks
                _blockRepository.BulkDelete(bulk, conn, data.BlockDelete);

                //Delete connectors                              
                _connectorRepository.BulkDelete(bulk, conn, data.Connectors);

            }

            trans.Complete();
        }

        var key = updated.Id;
        await _cacheRepository.DeleteCacheAsync(key.ToString());
        _cacheRepository.RefreshList.Enqueue((updated.Id.ToString(), updated.Id.ToString()));
    }

    /// <summary>
    /// Create a project
    /// </summary>
    /// <param name="project">The project that should be created</param>
    /// <param name="data">Project data</param>
    /// <returns>A project create task</returns>
    public Task CreateProject(Project project, ProjectData data)
    {
        var bulk = new BulkOperations();

        using (var trans = new TransactionScope(TransactionScopeOption.Required, new TimeSpan(0, 0, 10, 0)))
        {
            using (var conn = new SqlConnection(_databaseConfiguration.ConnectionString))
            {
                // Upsert
                bulk.Setup<Project>()
                    .ForObject(project)
                    .WithTable("Project")
                    .AddColumn(x => x.Id)                    
                    .AddColumn(x => x.Version)
                    .AddColumn(x => x.Name)
                    .AddColumn(x => x.Description)
                    .AddColumn(x => x.UpdatedBy)
                    .AddColumn(x => x.Updated)
                    .AddColumn(x => x.CreatedBy)
                    .AddColumn(x => x.Created)
                    .Upsert()
                    .MatchTargetOn(x => x.Id)
                    .Commit(conn);

                _blockRepository.BulkUpsert(bulk, conn, data.Blocks);
                _connectorRepository.BulkUpsert(bulk, conn, data.Connectors);
                _attributeRepository.BulkUpsert(bulk, conn, data.Attributes);
            }

            trans.Complete();
        }

        _cacheRepository.RefreshList.Enqueue((project.Id.ToString(), project.Id.ToString()));
        return Task.CompletedTask;
    }

    /// <summary>
    /// Delete a project
    /// </summary>
    /// <param name="project">The project that should be deleted</param>
    /// <param name="data">Project data</param>
    /// <returns>A project delete task</returns>
    public async Task DeleteProject(Project project, ProjectData data)
    {
        var bulk = new BulkOperations();

        using (var trans = new TransactionScope(TransactionScopeOption.Required, new TimeSpan(0, 0, 10, 0)))
        {
            using (var conn = new SqlConnection(_databaseConfiguration.ConnectionString))
            {
                _attributeRepository.BulkDelete(bulk, conn, data.Attributes);
                _connectorRepository.BulkDelete(bulk, conn, data.Connectors);
                _blockRepository.BulkDelete(bulk, conn, data.Blocks);

                bulk.Setup<Project>()
                    .ForCollection(new List<Project> { project })
                    .WithTable("Project")
                    .AddColumn(x => x.Id)
                    .BulkDelete()
                    .MatchTargetOn(x => x.Id)
                    .Commit(conn);
            }

            trans.Complete();
        }

        await _cacheRepository.DeleteCacheAsync(project.Id.ToString());
    }
}