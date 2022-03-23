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
    public class InterfaceRepository : GenericRepository<ModelBuilderDbContext, Interface>, IInterfaceRepository
    {
        private readonly IAttributeRepository _attributeRepository;
        private readonly IConnectorRepository _connectorRepository;
        private readonly DatabaseConfiguration _databaseConfiguration;
        private readonly ILogger<InterfaceRepository> _logger;

        public InterfaceRepository(ModelBuilderDbContext dbContext, IAttributeRepository attributeRepository, IConnectorRepository connectorRepository, IOptions<DatabaseConfiguration> databaseConfiguration, ILogger<InterfaceRepository> logger) : base(dbContext)
        {
            _attributeRepository = attributeRepository;
            _connectorRepository = connectorRepository;
            _logger = logger;
            _databaseConfiguration = databaseConfiguration?.Value;
        }

        public void UpdateInsert(Interface inter, EntityState entityState)
        {
            if (inter?.InputTerminal == null)
                return;

            inter.InputTerminalId = inter.InputTerminal.Id;

            foreach (var attribute in inter.InputTerminal?.Attributes)
            {
                attribute.UnitString = attribute.Units != null
                    ? JsonConvert.SerializeObject(attribute.Units)
                    : null;

                _attributeRepository.Attach(attribute, entityState);
            }

            _connectorRepository.Attach(inter.InputTerminal, entityState);

            if (inter.OutputTerminal?.Id == null)
                return;

            inter.OutputTerminalId = inter.OutputTerminal.Id;

            foreach (var attribute in inter.OutputTerminal?.Attributes)
            {
                attribute.UnitString = attribute.Units != null
                    ? JsonConvert.SerializeObject(attribute.Units)
                    : null;

                _attributeRepository.Attach(attribute, entityState);
            }

            _connectorRepository.Attach(inter.OutputTerminal, entityState);

            if (inter.Attributes == null)
                return;

            foreach (var attribute in inter.Attributes)
            {
                attribute.UnitString = attribute.Units != null
                    ? JsonConvert.SerializeObject(attribute.Units)
                    : null;

                _attributeRepository.Attach(attribute, entityState);
            }

            Attach(inter, entityState);
        }

        /// <summary>
        /// Bulk update interfaces
        /// </summary>
        /// <param name="interfaces">The interfaces that should be updated</param>
        /// <returns>A bulk update task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        public async Task BulkUpdate(List<Interface> interfaces)
        {
            if (interfaces == null || !interfaces.Any())
                return;

            if (_databaseConfiguration == null || string.IsNullOrWhiteSpace(_databaseConfiguration.ConnectionString))
                throw new ModelBuilderConfigurationException("Database configuration missing");

            var bulk = new BulkOperations();
            var connection = new SqlConnection(_databaseConfiguration.ConnectionString);

            try
            {
                bulk.Setup<Interface>(x => x.ForCollection(interfaces))
                    .WithTable("Interface")
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
                _logger.LogCritical($"Error in Interface Repository. Can't update database. Error: {e.Message}");
                throw;
            }
            finally
            {
                await connection.DisposeAsync();
            }
        }

        /// <summary>
        /// Bulk create or insert interfaces
        /// </summary>
        /// <param name="interfaces">The interfaces that should be created</param>
        /// <returns>A bulk create task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        public async Task BulkCreate(List<Interface> interfaces)
        {
            if (interfaces == null || !interfaces.Any())
                return;

            if (_databaseConfiguration == null || string.IsNullOrWhiteSpace(_databaseConfiguration.ConnectionString))
                throw new ModelBuilderConfigurationException("Database configuration missing");

            var bulk = new BulkOperations();
            var connection = new SqlConnection(_databaseConfiguration.ConnectionString);

            try
            {
                bulk.Setup<Interface>(x => x.ForCollection(interfaces))
                    .WithTable("Interface")
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
                _logger.LogCritical($"Error in Interface Repository. Can't insert into database. Error: {e.Message}");
                throw;
            }
            finally
            {
                await connection.DisposeAsync();
            }
        }

        /// <summary>
        /// Bulk delete interfaces
        /// </summary>
        /// <param name="interfaces">The interfaces that should be deleted</param>
        /// <returns>A bulk delete task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        public async Task BulkDelete(List<Interface> interfaces)
        {
            if (interfaces == null || !interfaces.Any())
                return;

            if (_databaseConfiguration == null || string.IsNullOrWhiteSpace(_databaseConfiguration.ConnectionString))
                throw new ModelBuilderConfigurationException("Database configuration missing");

            var bulk = new BulkOperations();
            var connection = new SqlConnection(_databaseConfiguration.ConnectionString);

            try
            {
                bulk.Setup<Interface>(x => x.ForCollection(interfaces))
                    .WithTable("Interface")
                    .AddColumn(x => x.Id)
                    .TmpDisableAllNonClusteredIndexes()
                    .BulkDelete()
                    .MatchTargetOn(x => x.Id);


                await bulk.CommitTransactionAsync(connection);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"Error in Interface Repository. Can't delete from database. Error: {e.Message}");
                throw;
            }
            finally
            {
                await connection.DisposeAsync();
            }
        }
    }
}