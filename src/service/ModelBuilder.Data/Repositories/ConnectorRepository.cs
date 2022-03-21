using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Exceptions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using SqlBulkTools;

namespace Mb.Data.Repositories
{
    public class ConnectorRepository : GenericRepository<ModelBuilderDbContext, Connector>, IConnectorRepository
    {
        private readonly DatabaseConfiguration _databaseConfiguration;
        private readonly IAttributeRepository _attributeRepository;
        private readonly ILogger<ConnectorRepository> _logger;

        public ConnectorRepository(ModelBuilderDbContext dbContext, IAttributeRepository attributeRepository, IOptions<DatabaseConfiguration> databaseConfiguration, ILogger<ConnectorRepository> logger) : base(dbContext)
        {
            _attributeRepository = attributeRepository;
            _logger = logger;
            _databaseConfiguration = databaseConfiguration?.Value;
        }

        public void AttachWithAttributes(ICollection<Connector> entities, EntityState state)
        {
            if (entities == null)
                return;

            foreach (var connector in entities.OfType<Terminal>())
            {
                if (connector.Attributes != null)
                {
                    foreach (var attribute in connector.Attributes)
                    {
                        attribute.UnitString = attribute.Units != null ? JsonConvert.SerializeObject(attribute.Units) : null;
                        _attributeRepository.Attach(attribute, state);
                    }
                }
                Attach(connector, state);
            }

            foreach (var connector in entities.OfType<Relation>())
            {
                Attach(connector, state);
            }
        }

        /// <summary>
        /// Relation bulk update
        /// </summary>
        /// <param name="relations">The relations to update</param>
        /// <returns>Update Task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if missing database configuration</exception>
        public async Task BulkUpdate(List<Relation> relations)
        {
            if (relations == null || !relations.Any())
                return;

            if (_databaseConfiguration == null || string.IsNullOrWhiteSpace(_databaseConfiguration.ConnectionString))
                throw new ModelBuilderConfigurationException("Database configuration missing");

            var bulk = new BulkOperations();
            var connection = new SqlConnection(_databaseConfiguration.ConnectionString);

            try
            {
                bulk.Setup<Relation>(x => x.ForCollection(relations))
                    .WithTable("Connector")
                    .AddColumn(x => x.Id)
                    .AddColumn(x => x.Iri)
                    .AddColumn(x => x.Name)
                    .AddColumn(x => x.Type)
                    .AddColumn(x => x.ConnectorVisibility)
                    .AddColumn(x => x.NodeId)
                    .AddColumn(x => x.NodeIri)
                    .AddColumn(x => x.IsRequired)
                    .AddColumn(x => x.RelationType)
                    .AddColumn(x => x.Discriminator)
                    .TmpDisableAllNonClusteredIndexes()
                    .BulkUpdate()
                    .MatchTargetOn(x => x.Id);

                await bulk.CommitTransactionAsync(connection);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"Error in Connector Repository. Can't update database. Error: {e.Message}");
                throw;
            }
            finally
            {
                await connection.DisposeAsync();
            }
        }

        /// <summary>
        /// Relation bulk create
        /// </summary>
        /// <param name="relations">The relations to create</param>
        /// <returns>Create Task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if missing database configuration</exception>
        public async Task BulkCreate(List<Relation> relations)
        {
            if (relations == null || !relations.Any())
                return;

            if (_databaseConfiguration == null || string.IsNullOrWhiteSpace(_databaseConfiguration.ConnectionString))
                throw new ModelBuilderConfigurationException("Database configuration missing");

            var bulk = new BulkOperations();
            var connection = new SqlConnection(_databaseConfiguration.ConnectionString);

            try
            {
                bulk.Setup<Relation>(x => x.ForCollection(relations))
                    .WithTable("Connector")
                    .AddColumn(x => x.Id)
                    .AddColumn(x => x.Iri)
                    .AddColumn(x => x.Name)
                    .AddColumn(x => x.Type)
                    .AddColumn(x => x.ConnectorVisibility)
                    .AddColumn(x => x.NodeId)
                    .AddColumn(x => x.NodeIri)
                    .AddColumn(x => x.IsRequired)
                    .AddColumn(x => x.RelationType)
                    .AddColumn(x => x.Discriminator)
                    .TmpDisableAllNonClusteredIndexes()
                    .BulkInsert();

                await bulk.CommitTransactionAsync(connection);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"Error in Connector Repository. Can't create to database. Error: {e.Message}");
                throw;
            }
            finally
            {
                await connection.DisposeAsync();
            }
        }

        /// <summary>
        /// Relation bulk delete
        /// </summary>
        /// <param name="relations">The relations to delete</param>
        /// <returns>Delete Task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if missing database configuration</exception>
        public async Task BulkDelete(List<Relation> relations)
        {
            if (relations == null || !relations.Any())
                return;

            if (_databaseConfiguration == null || string.IsNullOrWhiteSpace(_databaseConfiguration.ConnectionString))
                throw new ModelBuilderConfigurationException("Database configuration missing");

            var bulk = new BulkOperations();
            var connection = new SqlConnection(_databaseConfiguration.ConnectionString);

            try
            {
                bulk.Setup<Relation>(x => x.ForCollection(relations))
                    .WithTable("Connector")
                    .AddColumn(x => x.Id)
                    .TmpDisableAllNonClusteredIndexes()
                    .BulkDelete()
                    .MatchTargetOn(x => x.Id);

                await bulk.CommitTransactionAsync(connection);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"Error in Connector Repository. Can't delete from database. Error: {e.Message}");
                throw;
            }
            finally
            {
                await connection.DisposeAsync();
            }
        }

        /// <summary>
        /// Terminal bulk update
        /// </summary>
        /// <param name="terminals">The terminals to update</param>
        /// <returns>Update Task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if missing database configuration</exception>
        public async Task BulkUpdate(List<Terminal> terminals)
        {
            if (terminals == null || !terminals.Any())
                return;

            if (_databaseConfiguration == null || string.IsNullOrWhiteSpace(_databaseConfiguration.ConnectionString))
                throw new ModelBuilderConfigurationException("Database configuration missing");

            var bulk = new BulkOperations();
            var connection = new SqlConnection(_databaseConfiguration.ConnectionString);

            try
            {
                bulk.Setup<Terminal>(x => x.ForCollection(terminals))
                    .WithTable("Connector")
                    .AddColumn(x => x.Id)
                    .AddColumn(x => x.Iri)
                    .AddColumn(x => x.Name)
                    .AddColumn(x => x.Type)
                    .AddColumn(x => x.ConnectorVisibility)
                    .AddColumn(x => x.NodeId)
                    .AddColumn(x => x.NodeIri)
                    .AddColumn(x => x.IsRequired)
                    .AddColumn(x => x.Color)
                    .AddColumn(x => x.TerminalCategoryId)
                    .AddColumn(x => x.TerminalTypeId)
                    .AddColumn(x => x.TerminalTypeIri)
                    .AddColumn(x => x.Discriminator)
                    .TmpDisableAllNonClusteredIndexes()
                    .BulkUpdate()
                    .MatchTargetOn(x => x.Id);

                await bulk.CommitTransactionAsync(connection);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"Error in Connector Repository. Can't update database. Error: {e.Message}");
                throw;
            }
            finally
            {
                await connection.DisposeAsync();
            }
        }

        /// <summary>
        /// Terminal bulk create
        /// </summary>
        /// <param name="terminals">The terminals to create</param>
        /// <returns>Create Task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if missing database configuration</exception>
        public async Task BulkCreate(List<Terminal> terminals)
        {
            if (terminals == null || !terminals.Any())
                return;

            if (_databaseConfiguration == null || string.IsNullOrWhiteSpace(_databaseConfiguration.ConnectionString))
                throw new ModelBuilderConfigurationException("Database configuration missing");

            var bulk = new BulkOperations();
            var connection = new SqlConnection(_databaseConfiguration.ConnectionString);

            try
            {
                bulk.Setup<Terminal>(x => x.ForCollection(terminals))
                    .WithTable("Connector")
                    .AddColumn(x => x.Id)
                    .AddColumn(x => x.Iri)
                    .AddColumn(x => x.Name)
                    .AddColumn(x => x.Type)
                    .AddColumn(x => x.ConnectorVisibility)
                    .AddColumn(x => x.NodeId)
                    .AddColumn(x => x.NodeIri)
                    .AddColumn(x => x.IsRequired)
                    .AddColumn(x => x.Color)
                    .AddColumn(x => x.TerminalCategoryId)
                    .AddColumn(x => x.TerminalTypeId)
                    .AddColumn(x => x.TerminalTypeIri)
                    .AddColumn(x => x.Discriminator)
                    .TmpDisableAllNonClusteredIndexes()
                    .BulkInsert();

                await bulk.CommitTransactionAsync(connection);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"Error in Connector Repository. Can't insert to database. Error: {e.Message}");
                throw;
            }
            finally
            {
                await connection.DisposeAsync();
            }
        }

        /// <summary>
        /// Terminal bulk delete
        /// </summary>
        /// <param name="terminals">The terminals to delete</param>
        /// <returns>Delete Task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if missing database configuration</exception>
        public async Task BulkDelete(List<Terminal> terminals)
        {
            if (terminals == null || !terminals.Any())
                return;

            if (_databaseConfiguration == null || string.IsNullOrWhiteSpace(_databaseConfiguration.ConnectionString))
                throw new ModelBuilderConfigurationException("Database configuration missing");

            var bulk = new BulkOperations();
            var connection = new SqlConnection(_databaseConfiguration.ConnectionString);

            try
            {
                bulk.Setup<Terminal>(x => x.ForCollection(terminals))
                    .WithTable("Connector")
                    .AddColumn(x => x.Id)
                    .TmpDisableAllNonClusteredIndexes()
                    .BulkDelete()
                    .MatchTargetOn(x => x.Id);

                await bulk.CommitTransactionAsync(connection);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"Error in Connector Repository. Can't delete in database. Error: {e.Message}");
                throw;
            }
            finally
            {
                await connection.DisposeAsync();
            }
        }
    }
}