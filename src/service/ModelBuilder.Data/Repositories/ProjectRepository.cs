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
        private readonly INodeRepository _nodeRepository;
        private readonly IEdgeRepository _edgeRepository;
        private readonly IAttributeRepository _attributeRepository;
        private readonly DatabaseConfiguration _databaseConfiguration;
        private readonly ITransportRepository _transportRepository;
        private readonly IConnectorRepository _connectorRepository;
        private readonly IInterfaceRepository _interfaceRepository;
        private readonly ISimpleRepository _simpleRepository;
        private readonly ICacheRepository _cacheRepository;

        public ProjectRepository(ModelBuilderDbContext dbContext, IMapper mapper, INodeRepository nodeRepository,
            IEdgeRepository edgeRepository, IAttributeRepository attributeRepository,
            IOptions<DatabaseConfiguration> databaseConfiguration, ITransportRepository transportRepository,
            IConnectorRepository connectorRepository, IInterfaceRepository interfaceRepository,
            ISimpleRepository simpleRepository, ICacheRepository cacheRepository) : base(dbContext)
        {
            _mapper = mapper;
            _nodeRepository = nodeRepository;
            _edgeRepository = edgeRepository;
            _attributeRepository = attributeRepository;
            _databaseConfiguration = databaseConfiguration?.Value;
            _transportRepository = transportRepository;
            _connectorRepository = connectorRepository;
            _interfaceRepository = interfaceRepository;
            _simpleRepository = simpleRepository;
            _cacheRepository = cacheRepository;
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

                    _nodeRepository.BulkUpsert(bulk, conn, data.NodeUpdateInsert);
                    _connectorRepository.BulkUpsert(bulk, conn, data.RelationUpdateInsert);
                    _connectorRepository.BulkUpsert(bulk, conn, data.TerminalUpdateInsert);
                    _transportRepository.BulkUpsert(bulk, conn, data.TransportUpdateInsert);
                    _interfaceRepository.BulkUpsert(bulk, conn, data.InterfaceUpdateInsert);
                    _simpleRepository.BulkUpsert(bulk, conn, data.SimpleUpdateInsert);
                    _attributeRepository.BulkUpsert(bulk, conn, data.AttributeUpdateInsert);
                    _edgeRepository.BulkUpsert(bulk, conn, data.EdgeUpdateInsert);

                    // Delete
                    _edgeRepository.BulkDelete(bulk, conn, data.EdgeDelete);
                    _attributeRepository.BulkDelete(bulk, conn, data.AttributeDelete);
                    _transportRepository.BulkDelete(bulk, conn, data.TransportDelete);
                    _interfaceRepository.BulkDelete(bulk, conn, data.InterfaceDelete);
                    _simpleRepository.BulkDelete(bulk, conn, data.SimpleDelete);
                    _connectorRepository.BulkDelete(bulk, conn, data.RelationDelete);
                    _connectorRepository.BulkDelete(bulk, conn, data.TerminalDelete);
                    _nodeRepository.BulkDelete(bulk, conn, data.NodeDelete);
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

                    _nodeRepository.BulkUpsert(bulk, conn, data.Nodes);
                    _connectorRepository.BulkUpsert(bulk, conn, data.Relations);
                    _connectorRepository.BulkUpsert(bulk, conn, data.Terminals);
                    _transportRepository.BulkUpsert(bulk, conn, data.Transports);
                    _interfaceRepository.BulkUpsert(bulk, conn, data.Interfaces);
                    _simpleRepository.BulkUpsert(bulk, conn, data.Simples);
                    _attributeRepository.BulkUpsert(bulk, conn, data.Attributes);
                    _edgeRepository.BulkUpsert(bulk, conn, data.Edges);
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
                    _edgeRepository.BulkDelete(bulk, conn, data.Edges);
                    _attributeRepository.BulkDelete(bulk, conn, data.Attributes);
                    _transportRepository.BulkDelete(bulk, conn, data.Transports);
                    _interfaceRepository.BulkDelete(bulk, conn, data.Interfaces);
                    _simpleRepository.BulkDelete(bulk, conn, data.Simples);
                    _connectorRepository.BulkDelete(bulk, conn, data.Relations);
                    _connectorRepository.BulkDelete(bulk, conn, data.Terminals);
                    _nodeRepository.BulkDelete(bulk, conn, data.Nodes);

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

        #region Private methods

        /// <summary>
        /// Get complete project async
        /// </summary>
        /// <param name="id"></param>
        /// <param name="iri"></param>
        /// <returns></returns>
        private Task<Project> GetProjectAsync(string id, string iri)
        {
            var project =
                FindBy(x => x.Id == id || x.Iri == iri)
                    .Include(x => x.Edges)
                    .Include("Edges.FromNode")
                    .Include("Edges.ToNode")
                    .Include("Edges.FromConnector")
                    .Include("Edges.ToConnector")
                    .Include("Edges.Transport")
                    .Include("Edges.Transport.Attributes")
                    .Include("Edges.Transport.InputTerminal")
                    .Include("Edges.Transport.InputTerminal.Attributes")
                    .Include("Edges.Transport.OutputTerminal")
                    .Include("Edges.Transport.OutputTerminal.Attributes")
                    .Include("Edges.Interface")
                    .Include("Edges.Interface.Attributes")
                    .Include("Edges.Interface.InputTerminal")
                    .Include("Edges.Interface.InputTerminal.Attributes")
                    .Include("Edges.Interface.OutputTerminal")
                    .Include("Edges.Interface.OutputTerminal.Attributes")
                    .Include(x => x.Nodes)
                    .Include("Nodes.Attributes")
                    .Include("Nodes.Connectors")
                    .Include("Nodes.Connectors.Attributes")
                    .Include("Nodes.Simples")
                    .Include("Nodes.Simples.Attributes")
                    .AsNoTracking()
                    .AsSplitQuery()
                    .FirstOrDefault();

            if (project != null && project.Nodes.Any())
                project.Nodes = project.Nodes.OrderBy(x => x.Order).ToList();

            return Task.FromResult(project);
        }

        #endregion
    }
}