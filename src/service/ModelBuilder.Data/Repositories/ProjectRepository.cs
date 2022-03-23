using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Mb.Data.Contracts;
using Mb.Data.Extensions;
using Mb.Models.Abstract;
using Mb.Models.Application;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Exceptions;
using Mb.Models.Records;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SqlBulkTools;
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
        private readonly IServiceProvider _services;
        private readonly DatabaseConfiguration _databaseConfiguration;
        private readonly ILogger<ProjectRepository> _logger;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly ITransportRepository _transportRepository;
        private readonly IConnectorRepository _connectorRepository;
        private readonly IInterfaceRepository _interfaceRepository;
        private readonly ISimpleRepository _simpleRepository;
        private readonly ICacheRepository _cacheRepository;

        public ProjectRepository(ModelBuilderDbContext dbContext, IMapper mapper, INodeRepository nodeRepository, IEdgeRepository edgeRepository, IAttributeRepository attributeRepository, IServiceProvider services, IOptions<DatabaseConfiguration> databaseConfiguration, ILogger<ProjectRepository> logger, IHttpContextAccessor contextAccessor, ITransportRepository transportRepository, IConnectorRepository connectorRepository, IInterfaceRepository interfaceRepository, ISimpleRepository simpleRepository, ICacheRepository cacheRepository) : base(dbContext)
        {
            _mapper = mapper;
            _nodeRepository = nodeRepository;
            _edgeRepository = edgeRepository;
            _attributeRepository = attributeRepository;
            _services = services;
            _databaseConfiguration = databaseConfiguration?.Value;
            _logger = logger;
            _contextAccessor = contextAccessor;
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
                throw new ModelBuilderNullReferenceException("The ID and IRI can't both be null.");

            var key = GetKey(id, iri);

            if (!string.IsNullOrWhiteSpace(key))
            {
                var project = await _cacheRepository.GetOrCreateAsync(key, async () => await GetProjectAsync(id, iri));
                return project;
            }

            return await GetProjectAsync(id, iri);
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
            _logger.LogInformation("Starting updating");

            if (!original.Equals(updated))
            {
                updated.Updated = DateTime.Now.ToUniversalTime();
                updated.UpdatedBy = _contextAccessor?.GetName() ?? "System";

                // Update project
                await Task.WhenAny(Task.Run(() => UpsertProject(updated)));
            }

            _logger.LogInformation("Finished project");

            // Update all objects and create new nodes
            await Task.WhenAll(
                Task.Run(() => _nodeRepository.BulkCreate(data.NodeCreate)),
                Task.Run(() => _nodeRepository.BulkUpdate(data.NodeUpdate)),
                Task.Run(() => _connectorRepository.BulkUpdate(data.TerminalUpdate)),
                Task.Run(() => _connectorRepository.BulkUpdate(data.RelationUpdate)),
                Task.Run(() => _transportRepository.BulkUpdate(data.TransportUpdate)),
                Task.Run(() => _interfaceRepository.BulkUpdate(data.InterfaceUpdate)),
                Task.Run(() => _simpleRepository.BulkUpdate(data.SimpleUpdate)),
                Task.Run(() => _attributeRepository.BulkUpdate(data.AttributeUpdate)),
                Task.Run(() => _edgeRepository.BulkUpdate(data.EdgeUpdate))
            );

            _logger.LogInformation("Finished Update all objects and create new nodes");

            // Create all new Connectors and simples
            await Task.WhenAll(
                Task.Run(() => _connectorRepository.BulkCreate(data.RelationCreate)),
                Task.Run(() => _connectorRepository.BulkCreate(data.TerminalCreate)),
                Task.Run(() => _simpleRepository.BulkCreate(data.SimpleCreate)),
                Task.Run(() => _edgeRepository.BulkDelete(data.EdgeDelete))
            );

            _logger.LogInformation("Finished Create all new Connectors and simples");

            // Create all Transports, Interfaces
            await Task.WhenAll(
                Task.Run(() => _transportRepository.BulkCreate(data.TransportCreate)),
                Task.Run(() => _interfaceRepository.BulkCreate(data.InterfaceCreate))
            );

            _logger.LogInformation("Finished Create all Transports, Interfaces");

            // Create all new Attributes
            await Task.WhenAll(
                Task.Run(() => _attributeRepository.BulkCreate(data.AttributeCreate)),
                Task.Run(() => _attributeRepository.BulkDelete(data.AttributeDelete)),
                Task.Run(() => _edgeRepository.BulkCreate(data.EdgeCreate))
            );

            _logger.LogInformation("Finished Create all new Attributes");

            // Delete Transports, Interface and Simples
            await Task.WhenAll(
                Task.Run(() => _transportRepository.BulkDelete(data.TransportDelete)),
                Task.Run(() => _interfaceRepository.BulkDelete(data.InterfaceDelete)),
                Task.Run(() => _simpleRepository.BulkDelete(data.SimpleDelete))
            );

            _logger.LogInformation("Finished Delete Transports, Interface and Simples");

            // Delete all Connectors
            await Task.WhenAll(
                Task.Run(() => _connectorRepository.BulkDelete(data.RelationDelete)),
                Task.Run(() => _connectorRepository.BulkDelete(data.TerminalDelete))
            );

            _logger.LogInformation("Finished Delete all Connectors");

            // Delete all Nodes
            await Task.WhenAll(
                Task.Run(() => _nodeRepository.BulkDelete(data.NodeDelete))
            );

            _logger.LogInformation("Finished Delete all Nodes");

            var key = GetKey(updated.Id, updated.Iri);
            await _cacheRepository.CreateAsync(key, async () => await GetProjectAsync(updated.Id, updated.Iri));
        }

        /// <summary>
        /// Create a project
        /// </summary>
        /// <param name="project">The project that should be created</param>
        /// <param name="data">Project data</param>
        /// <returns>A project create task</returns>
        public async Task CreateProject(Project project, ProjectData data)
        {
            _logger.LogInformation("Starting creating");

            await Task.WhenAny(Task.Run(() => UpsertProject(project)));

            // Create all nodes
            await Task.WhenAny(
                Task.Run(() => _nodeRepository.BulkCreate(data.Nodes))
            );

            // Create all connectors and simples
            await Task.WhenAll(
                Task.Run(() => _connectorRepository.BulkCreate(data.Relations)),
                Task.Run(() => _connectorRepository.BulkCreate(data.Terminals)),
                Task.Run(() => _simpleRepository.BulkCreate(data.Simples))
            );

            // Create all transports and interfaces
            await Task.WhenAll(
                Task.Run(() => _transportRepository.BulkCreate(data.Transports)),
                Task.Run(() => _interfaceRepository.BulkCreate(data.Interfaces))
            );

            // Create all attributes and edges
            await Task.WhenAll(
                Task.Run(() => _attributeRepository.BulkCreate(data.Attributes)),
                Task.Run(() => _edgeRepository.BulkCreate(data.Edges))
            );
        }

        /// <summary>
        /// Delete a project
        /// </summary>
        /// <param name="project">The project that should be deleted</param>
        /// <param name="data">Project data</param>
        /// <returns>A project delete task</returns>
        public async Task DeleteProject(Project project, ProjectData data)
        {
            // Delete all attributes and edges
            await Task.WhenAll(
                Task.Run(() => _attributeRepository.BulkDelete(data.Attributes)),
                Task.Run(() => _edgeRepository.BulkDelete(data.Edges))
            );

            // Delete all transports and interfaces
            await Task.WhenAll(
                Task.Run(() => _transportRepository.BulkDelete(data.Transports)),
                Task.Run(() => _interfaceRepository.BulkDelete(data.Interfaces))
            );

            // Delete all connectors and simples
            await Task.WhenAll(
                Task.Run(() => _connectorRepository.BulkDelete(data.Relations)),
                Task.Run(() => _connectorRepository.BulkDelete(data.Terminals)),
                Task.Run(() => _simpleRepository.BulkDelete(data.Simples))
            );

            // Delete all nodes
            await Task.WhenAny(
                Task.Run(() => _nodeRepository.BulkDelete(data.Nodes))
            );

            // Delete project
            await Task.WhenAny(Task.Run(() => ProjectDelete(project)));

            var key = GetKey(project.Id, project.Iri);
            await _cacheRepository.DeleteCacheAsync(key);
        }

        #region Private methods

        private async Task<Project> GetProjectAsync(string id, string iri)
        {
            var projectTask = FindProjectAsync(id, iri);
            var nodeTask = FindNodesAsync(id, iri);
            var edgeTask = FindEdgesAsync(id, iri);

            await Task.WhenAll(projectTask, nodeTask, edgeTask);

            var project = projectTask.Result;
            if (project == null)
                return null;

            project.Nodes = nodeTask.Result;
            project.Edges = edgeTask.Result;
            return project;
        }

        /// <summary>
        /// Find a project async
        /// </summary>
        /// <param name="id"></param>
        /// <param name="iri"></param>
        /// <returns></returns>
        private async Task<Project> FindProjectAsync(string id, string iri)
        {
            using var scope = _services.CreateScope();
            var repo = scope.ServiceProvider.GetRequiredService<IProjectRepository>();

            return await Task.Run(() => repo.FindBy(x => x.Id == id || x.Iri == iri)
                .AsNoTracking()
                .SingleOrDefaultAsync());
        }

        /// <summary>
        /// Find edges async
        /// </summary>
        /// <param name="id"></param>
        /// <param name="iri"></param>
        /// <returns></returns>
        private async Task<List<Edge>> FindEdgesAsync(string id, string iri)
        {
            using var scope = _services.CreateScope();
            var repo = scope.ServiceProvider.GetRequiredService<IEdgeRepository>();

            return await Task.Run(() =>
                repo.FindBy(x => x.ProjectId == id || x.ProjectIri == iri)
                    .Include("FromNode")
                    .Include("ToNode")
                    .Include("FromConnector")
                    .Include("ToConnector")
                    .Include("Transport")
                    .Include("Transport.Attributes")
                    .Include("Transport.InputTerminal")
                    .Include("Transport.InputTerminal.Attributes")
                    .Include("Transport.OutputTerminal")
                    .Include("Transport.OutputTerminal.Attributes")
                    .Include("Interface")
                    .Include("Interface.Attributes")
                    .Include("Interface.InputTerminal")
                    .Include("Interface.InputTerminal.Attributes")
                    .Include("Interface.OutputTerminal")
                    .Include("Interface.OutputTerminal.Attributes")
                    .AsNoTracking()
                    .AsSplitQuery()
                    .ToListAsync());
        }

        /// <summary>
        /// Find nodes async
        /// </summary>
        /// <param name="id"></param>
        /// <param name="iri"></param>
        /// <returns></returns>
        private async Task<List<Node>> FindNodesAsync(string id, string iri)
        {
            using var scope = _services.CreateScope();
            var repo = scope.ServiceProvider.GetRequiredService<INodeRepository>();
            return await Task.Run(() =>
                repo.FindBy(x => x.ProjectId == id || x.ProjectIri == iri)
                    .Include("Attributes")
                    .Include("Connectors")
                    .Include("Connectors.Attributes")
                    .Include("Simples")
                    .Include("Simples.Attributes")
                    .AsNoTracking()
                    .AsSplitQuery()
                    .ToListAsync());
        }

        /// <summary>
        /// Insert or update a project
        /// </summary>
        /// <param name="project">The original project</param>
        /// <returns></returns>
        private async Task UpsertProject(Project project)
        {
            if (_databaseConfiguration == null || string.IsNullOrWhiteSpace(_databaseConfiguration.ConnectionString))
                throw new ModelBuilderConfigurationException("Database configuration missing");

            var bulk = new BulkOperations();
            var connection = new SqlConnection(_databaseConfiguration.ConnectionString);

            try
            {
                bulk.Setup<Project>(x => x.ForCollection(new List<Project> { project }))
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
                    .TmpDisableAllNonClusteredIndexes()
                    .BulkInsertOrUpdate()
                    .MatchTargetOn(x => x.Id);

                await bulk.CommitTransactionAsync(connection);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"Error in project Repository. Can't upsert project. Error: {e.Message}");
                throw;
            }
            finally
            {
                await connection.DisposeAsync();
            }
        }

        /// <summary>
        /// Insert or update a project
        /// </summary>
        /// <param name="project">The original project</param>
        /// <returns></returns>
        private async Task ProjectDelete(Project project)
        {
            if (_databaseConfiguration == null || string.IsNullOrWhiteSpace(_databaseConfiguration.ConnectionString))
                throw new ModelBuilderConfigurationException("Database configuration missing");

            var bulk = new BulkOperations();
            var connection = new SqlConnection(_databaseConfiguration.ConnectionString);

            try
            {
                bulk.Setup<Project>(x => x.ForCollection(new List<Project> { project }))
                    .WithTable("Project")
                    .AddColumn(x => x.Id)
                    .TmpDisableAllNonClusteredIndexes()
                    .BulkDelete()
                    .MatchTargetOn(x => x.Id);

                await bulk.CommitTransactionAsync(connection);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"Error in project Repository. Can't delete project. Error: {e.Message}");
                throw;
            }
            finally
            {
                await connection.DisposeAsync();
            }
        }

        private string GetKey(string id, string iri)
        {
            if (string.IsNullOrWhiteSpace(id) && string.IsNullOrWhiteSpace(iri))
                return null;

            string key;

            if (!string.IsNullOrWhiteSpace(id))
                key = id.Split('_').Last();
            else
            {
                var uri = new Uri(iri);
                key = string.IsNullOrEmpty(uri.Fragment) ? uri.Segments.Last() : uri.Fragment[1..];
                if (key.StartsWith("ID"))
                    key = key.Remove(0, 2);
            }

            return key;
        }

        #endregion
    }
}