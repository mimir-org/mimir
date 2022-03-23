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
    public class TransportRepository : GenericRepository<ModelBuilderDbContext, Transport>, ITransportRepository
    {
        private readonly IAttributeRepository _attributeRepository;
        private readonly IConnectorRepository _connectorRepository;
        private readonly DatabaseConfiguration _databaseConfiguration;
        private readonly ILogger<TransportRepository> _logger;

        public TransportRepository(ModelBuilderDbContext dbContext, IAttributeRepository attributeRepository, IConnectorRepository connectorRepository, IOptions<DatabaseConfiguration> databaseConfiguration, ILogger<TransportRepository> logger) : base(dbContext)
        {
            _attributeRepository = attributeRepository;
            _connectorRepository = connectorRepository;
            _databaseConfiguration = databaseConfiguration?.Value;
            _logger = logger;
        }

        public void UpdateInsert(Transport transport, EntityState entityState)
        {
            if (transport?.InputTerminal == null)
                return;

            transport.InputTerminalId = transport.InputTerminal.Id;

            foreach (var attribute in transport.InputTerminal?.Attributes)
            {
                attribute.UnitString = attribute.Units != null
                    ? JsonConvert.SerializeObject(attribute.Units)
                    : null;

                _attributeRepository.Attach(attribute, entityState);
            }

            _connectorRepository.Attach(transport.InputTerminal, entityState);

            if (transport.OutputTerminal?.Id == null)
                return;

            transport.OutputTerminalId = transport.OutputTerminal.Id;

            foreach (var attribute in transport.OutputTerminal?.Attributes)
            {
                attribute.UnitString = attribute.Units != null
                    ? JsonConvert.SerializeObject(attribute.Units)
                    : null;

                _attributeRepository.Attach(attribute, entityState);
            }

            _connectorRepository.Attach(transport.OutputTerminal, entityState);

            if (transport.Attributes == null)
                return;

            foreach (var attribute in transport.Attributes)
            {
                attribute.UnitString = attribute.Units != null
                    ? JsonConvert.SerializeObject(attribute.Units)
                    : null;

                _attributeRepository.Attach(attribute, entityState);
            }

            Attach(transport, entityState);
        }

        /// <summary>
        /// Bulk transport update
        /// </summary>
        /// <param name="transports">The transports to be updated</param>
        /// <returns>A bulk update task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        public async Task BulkUpdate(List<Transport> transports)
        {
            if (transports == null || !transports.Any())
                return;

            if (_databaseConfiguration == null || string.IsNullOrWhiteSpace(_databaseConfiguration.ConnectionString))
                throw new ModelBuilderConfigurationException("Database configuration missing");

            var bulk = new BulkOperations();
            var connection = new SqlConnection(_databaseConfiguration.ConnectionString);

            try
            {
                bulk.Setup<Transport>(x => x.ForCollection(transports))
                    .WithTable("Transport")
                    .AddColumn(x => x.Id)
                    .AddColumn(x => x.Iri)
                    .AddColumn(x => x.Version)
                    .AddColumn(x => x.Rds)
                    .AddColumn(x => x.Name)
                    .AddColumn(x => x.Label)
                    .AddColumn(x => x.Description)
                    .AddColumn(x => x.StatusId)
                    .AddColumn(x => x.SemanticReference)
                    .AddColumn(x => x.InputTerminalId)
                    .AddColumn(x => x.OutputTerminalId)
                    .AddColumn(x => x.UpdatedBy)
                    .AddColumn(x => x.Updated)
                    .AddColumn(x => x.Created)
                    .AddColumn(x => x.CreatedBy)
                    .AddColumn(x => x.LibraryTypeId)
                    .TmpDisableAllNonClusteredIndexes()
                    .BulkUpdate()
                    .MatchTargetOn(x => x.Id);

                await bulk.CommitTransactionAsync(connection);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"Error in Transport Repository. Can't update database. Error: {e.Message}");
                throw;
            }
            finally
            {
                await connection.DisposeAsync();
            }
        }

        /// <summary>
        /// Bulk transport create
        /// </summary>
        /// <param name="transports">The transports to be created</param>
        /// <returns>A bulk create task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        public async Task BulkCreate(List<Transport> transports)
        {
            if (transports == null || !transports.Any())
                return;

            if (_databaseConfiguration == null || string.IsNullOrWhiteSpace(_databaseConfiguration.ConnectionString))
                throw new ModelBuilderConfigurationException("Database configuration missing");

            var bulk = new BulkOperations();
            var connection = new SqlConnection(_databaseConfiguration.ConnectionString);

            try
            {
                bulk.Setup<Transport>(x => x.ForCollection(transports))
                    .WithTable("Transport")
                    .AddColumn(x => x.Id)
                    .AddColumn(x => x.Iri)
                    .AddColumn(x => x.Version)
                    .AddColumn(x => x.Rds)
                    .AddColumn(x => x.Name)
                    .AddColumn(x => x.Label)
                    .AddColumn(x => x.Description)
                    .AddColumn(x => x.StatusId)
                    .AddColumn(x => x.SemanticReference)
                    .AddColumn(x => x.InputTerminalId)
                    .AddColumn(x => x.OutputTerminalId)
                    .AddColumn(x => x.UpdatedBy)
                    .AddColumn(x => x.Updated)
                    .AddColumn(x => x.Created)
                    .AddColumn(x => x.CreatedBy)
                    .AddColumn(x => x.LibraryTypeId)
                    .TmpDisableAllNonClusteredIndexes()
                    .BulkInsert();

                await bulk.CommitTransactionAsync(connection);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"Error in Transport Repository. Can't insert into database. Error: {e.Message}");
                throw;
            }
            finally
            {
                await connection.DisposeAsync();
            }
        }

        /// <summary>
        /// Bulk transport delete
        /// </summary>
        /// <param name="transports">The transports to be deleted</param>
        /// <returns>A bulk delete task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        public async Task BulkDelete(List<Transport> transports)
        {
            if (transports == null || !transports.Any())
                return;

            if (_databaseConfiguration == null || string.IsNullOrWhiteSpace(_databaseConfiguration.ConnectionString))
                throw new ModelBuilderConfigurationException("Database configuration missing");

            var bulk = new BulkOperations();
            var connection = new SqlConnection(_databaseConfiguration.ConnectionString);

            try
            {
                bulk.Setup<Transport>(x => x.ForCollection(transports))
                    .WithTable("Transport")
                    .AddColumn(x => x.Id)
                    .TmpDisableAllNonClusteredIndexes()
                    .BulkDelete()
                    .MatchTargetOn(x => x.Id);

                await bulk.CommitTransactionAsync(connection);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"Error in Transport Repository. Can't delete from database. Error: {e.Message}");
                throw;
            }
            finally
            {
                await connection.DisposeAsync();
            }
        }
    }
}