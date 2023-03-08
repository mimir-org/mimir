using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mimirorg.Common.Exceptions;
using Mb.Models.Extensions;
using Mb.Models.Records;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SqlBulkTools;
using Mb.Models.Client;

// ReSharper disable IdentifierTypo
// ReSharper disable StringLiteralTypo

namespace Mb.Data.Repositories
{
    public class ProjectRepository : GenericRepository<ModelBuilderDbContext, Project>, IProjectRepository
    {
        private readonly IMapper _mapper;
        private readonly IAspectObjectRepository _aspectObjectRepository;
        private readonly IConnectionRepository _connectionRepository;
        private readonly IConnectorRepository _connectorRepository;
        private readonly IAttributeRepository _attributeRepository;
        private readonly DatabaseConfiguration _databaseConfiguration;
        private readonly ICacheRepository _cacheRepository;
        private readonly IModelBuilderProcRepository _modelBuilderProcRepository;

        public ProjectRepository(ModelBuilderDbContext dbContext, IMapper mapper, IAspectObjectRepository aspectObjectRepository,
            IConnectionRepository connectionRepository, IAttributeRepository attributeRepository,
            IOptions<DatabaseConfiguration> databaseConfiguration, IConnectorRepository connectorRepository,
            ICacheRepository cacheRepository, IModelBuilderProcRepository modelBuilderProcRepository) : base(dbContext)
        {
            _mapper = mapper;
            _aspectObjectRepository = aspectObjectRepository;
            _connectionRepository = connectionRepository;
            _connectorRepository = connectorRepository;
            _attributeRepository = attributeRepository;
            _databaseConfiguration = databaseConfiguration?.Value;
            _cacheRepository = cacheRepository;
            _modelBuilderProcRepository = modelBuilderProcRepository;
        }

        /// <summary>
        /// Get complete project
        /// </summary>
        /// <param name="id">Project id</param>
        /// <param name="iri">Project Iri</param>
        /// <returns>Complete project</returns>
        public async Task<Project> GetAsyncComplete(string id, string iri)
        {
            if (string.IsNullOrWhiteSpace(id) && string.IsNullOrWhiteSpace(iri))
                throw new MimirorgNullReferenceException("The ID and IRI can't both be null.");

            var key = !string.IsNullOrWhiteSpace(id) ? id.ResolveKey() : iri.ResolveKey();

            if (!string.IsNullOrWhiteSpace(key))
            {
                var project = await _cacheRepository.GetOrCreateAsync(key, async () => await GetProjectAsync(id, iri));
                return project;
            }
            else
            {
                var project = await GetProjectAsync(id, iri);
                return project;
            }
        }

        /// <summary>
        /// Get complete project async not read from cache
        /// </summary>
        /// <param name="id"></param>
        /// <param name="iri"></param>
        /// <returns>Complete project</returns>
        public Task<Project> GetProjectAsync(string id, string iri)
        {
            var project =
                FindBy(x => x.Id == id || x.Iri == iri)
                    .Include(x => x.Connections)
                    .Include("Connections.FromAspectObject")
                    .Include("Connections.ToAspectObject")
                    .Include("Connections.FromConnector")
                    .Include("Connections.ToConnector")
                    .Include(x => x.AspectObjects)
                    .Include("AspectObjects.Attributes")
                    .Include("AspectObjects.Connectors")
                    .Include("AspectObjects.Connectors.Attributes")
                    .AsNoTracking()
                    .AsSplitQuery()
                    .FirstOrDefault();

            if (project != null && project.AspectObjects.Any())
                project.AspectObjects = project.AspectObjects.OrderBy(x => x.Order).Select(x =>
                {
                    x.Hidden = false;
                    x.BlockHidden = false;
                    x.Selected = false;
                    x.BlockSelected = false;
                    return x;
                })
                    .ToList();

            return Task.FromResult(project);
        }

        /// <summary>
        /// Get project list
        /// </summary>
        /// <param name="name">The project to search for</param>
        /// <param name="from">Get project from</param>
        /// <param name="number">Get number of project</param>
        /// <returns>A list of project information</returns>
        public IEnumerable<ProjectItemCm> GetProjectList(string name, int from, int number)
        {
            if (string.IsNullOrEmpty(name))
                return GetAll()
                    .OrderByDescending(x => x.Updated)
                    .Skip(from)
                    .Take(number)
                    .ProjectTo<ProjectItemCm>(_mapper.ConfigurationProvider)
                    .ToList();

            return GetAll()
                .Where(x => x.Name.ToLower().StartsWith(name.ToLower()))
                .OrderByDescending(x => x.Updated)
                .Skip(from)
                .Take(number)
                .ProjectTo<ProjectItemCm>(_mapper.ConfigurationProvider)
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
                using (var conn = new SqlConnection(_databaseConfiguration.ConnectionString))
                {
                    // Upsert
                    bulk.Setup<Project>()
                        .ForObject(updated)
                        .WithTable("Project")
                        .AddColumn(x => x.Id)
                        .AddColumn(x => x.Iri)
                        .AddColumn(x => x.IsSubProject)
                        .AddColumn(x => x.Version)
                        .AddColumn(x => x.Name)
                        .AddColumn(x => x.Description)
                        .AddColumn(x => x.ProjectOwner)
                        .AddColumn(x => x.UpdatedBy)
                        .AddColumn(x => x.Updated)
                        .Upsert()
                        .MatchTargetOn(x => x.Id)
                        .Commit(conn);

                    _aspectObjectRepository.BulkUpsert(bulk, conn, data.AspectObjectUpdateInsert);
                    _connectorRepository.BulkUpsert(bulk, conn, data.RelationUpdateInsert);
                    _connectorRepository.BulkUpsert(bulk, conn, data.TerminalUpdateInsert);
                    _attributeRepository.BulkUpsert(bulk, conn, data.AttributeUpdateInsert);
                    _connectionRepository.BulkUpsert(bulk, conn, data.ConnectionUpdateInsert);

                    // Delete
                    _connectionRepository.BulkDelete(bulk, conn, data.ConnectionDelete);
                    _attributeRepository.BulkDelete(bulk, conn, data.AttributeDelete);
                    _connectorRepository.BulkDelete(bulk, conn, data.RelationDelete);
                    _connectorRepository.BulkDelete(bulk, conn, data.TerminalDelete);
                    _aspectObjectRepository.BulkDelete(bulk, conn, data.AspectObjectDelete);
                }

                trans.Complete();
            }

            var key = !string.IsNullOrWhiteSpace(updated.Id) ? updated.Id.ResolveKey() : updated.Iri.ResolveKey();
            await _cacheRepository.DeleteCacheAsync(key);
            _cacheRepository.RefreshList.Enqueue((updated.Id, updated.Iri));
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
                        .AddColumn(x => x.Iri)
                        .AddColumn(x => x.IsSubProject)
                        .AddColumn(x => x.Version)
                        .AddColumn(x => x.Name)
                        .AddColumn(x => x.Description)
                        .AddColumn(x => x.ProjectOwner)
                        .AddColumn(x => x.UpdatedBy)
                        .AddColumn(x => x.Updated)
                        .Upsert()
                        .MatchTargetOn(x => x.Id)
                        .Commit(conn);

                    _aspectObjectRepository.BulkUpsert(bulk, conn, data.AspectObjects);
                    _connectorRepository.BulkUpsert(bulk, conn, data.Relations);
                    _connectorRepository.BulkUpsert(bulk, conn, data.Terminals);
                    _attributeRepository.BulkUpsert(bulk, conn, data.Attributes);
                    _connectionRepository.BulkUpsert(bulk, conn, data.Connections);
                }

                trans.Complete();
            }

            _cacheRepository.RefreshList.Enqueue((project.Id, project.Iri));
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
                    _connectionRepository.BulkDelete(bulk, conn, data.Connections);
                    _attributeRepository.BulkDelete(bulk, conn, data.Attributes);
                    _connectorRepository.BulkDelete(bulk, conn, data.Relations);
                    _connectorRepository.BulkDelete(bulk, conn, data.Terminals);
                    _aspectObjectRepository.BulkDelete(bulk, conn, data.AspectObjects);

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

            var key = !string.IsNullOrWhiteSpace(project.Id) ? project.Id.ResolveKey() : project.Iri.ResolveKey();
            await _cacheRepository.DeleteCacheAsync(key);
        }
    }
}