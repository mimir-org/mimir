using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Exceptions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SqlBulkTools;
using Attribute = Mb.Models.Data.Attribute;

namespace Mb.Data.Repositories
{
    public class AttributeRepository : GenericRepository<ModelBuilderDbContext, Attribute>, IAttributeRepository
    {
        private readonly DatabaseConfiguration _databaseConfiguration;
        private readonly ILogger<AttributeRepository> _logger;

        public AttributeRepository(ModelBuilderDbContext dbContext, IOptions<DatabaseConfiguration> databaseConfiguration, ILogger<AttributeRepository> logger) : base(dbContext)
        {
            _logger = logger;
            _databaseConfiguration = databaseConfiguration?.Value;
        }

        /// <summary>
        /// Bulk update attributes
        /// </summary>
        /// <param name="attributes">The attributes that should be updated</param>
        /// <returns>A bulk update task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        public async Task BulkUpdate(List<Attribute> attributes)
        {
            if (attributes == null || !attributes.Any())
                return;

            if (_databaseConfiguration == null || string.IsNullOrWhiteSpace(_databaseConfiguration.ConnectionString))
                throw new ModelBuilderConfigurationException("Database configuration missing");

            var bulk = new BulkOperations();
            var connection = new SqlConnection(_databaseConfiguration.ConnectionString);

            try
            {
                bulk.Setup<Attribute>(x => x.ForCollection(attributes))
                    .WithTable("Attribute")
                    .AddColumn(x => x.Id)
                    .AddColumn(x => x.Iri)
                    .AddColumn(x => x.Entity)
                    .AddColumn(x => x.Value)
                    .AddColumn(x => x.AttributeTypeId)
                    .AddColumn(x => x.AttributeTypeIri)
                    .AddColumn(x => x.SelectedUnitId)
                    .AddColumn(x => x.UnitString)
                    .AddColumn(x => x.QualifierId)
                    .AddColumn(x => x.SourceId)
                    .AddColumn(x => x.ConditionId)
                    .AddColumn(x => x.FormatId)
                    .AddColumn(x => x.TerminalId)
                    .AddColumn(x => x.TerminalIri)
                    .AddColumn(x => x.NodeId)
                    .AddColumn(x => x.NodeIri)
                    .AddColumn(x => x.TransportId)
                    .AddColumn(x => x.TransportIri)
                    .AddColumn(x => x.InterfaceId)
                    .AddColumn(x => x.InterfaceIri)
                    .AddColumn(x => x.SimpleId)
                    .AddColumn(x => x.SimpleIri)
                    .AddColumn(x => x.SelectValuesString)
                    .AddColumn(x => x.SelectType)
                    .AddColumn(x => x.Discipline)
                    .AddColumn(x => x.IsLocked)
                    .AddColumn(x => x.IsLockedStatusBy)
                    .AddColumn(x => x.IsLockedStatusDate)
                    .TmpDisableAllNonClusteredIndexes()
                    .BulkUpdate()
                    .MatchTargetOn(x => x.Id);

                await bulk.CommitTransactionAsync(connection);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"Error in Attribute Repository. Can't update database. Error: {e.Message}");
                throw;
            }
            finally
            {
                await connection.DisposeAsync();
            }
        }

        /// <summary>
        /// Bulk create or insert attributes
        /// </summary>
        /// <param name="attributes">The attributes that should be created</param>
        /// <returns>A bulk create task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        public async Task BulkCreate(List<Attribute> attributes)
        {
            if (attributes == null || !attributes.Any())
                return;

            if (_databaseConfiguration == null || string.IsNullOrWhiteSpace(_databaseConfiguration.ConnectionString))
                throw new ModelBuilderConfigurationException("Database configuration missing");

            var bulk = new BulkOperations();
            var connection = new SqlConnection(_databaseConfiguration.ConnectionString);

            try
            {
                bulk.Setup<Attribute>(x => x.ForCollection(attributes))
                    .WithTable("Attribute")
                    .AddColumn(x => x.Id)
                    .AddColumn(x => x.Iri)
                    .AddColumn(x => x.Entity)
                    .AddColumn(x => x.Value)
                    .AddColumn(x => x.AttributeTypeId)
                    .AddColumn(x => x.AttributeTypeIri)
                    .AddColumn(x => x.SelectedUnitId)
                    .AddColumn(x => x.UnitString)
                    .AddColumn(x => x.QualifierId)
                    .AddColumn(x => x.SourceId)
                    .AddColumn(x => x.ConditionId)
                    .AddColumn(x => x.FormatId)
                    .AddColumn(x => x.TerminalId)
                    .AddColumn(x => x.TerminalIri)
                    .AddColumn(x => x.NodeId)
                    .AddColumn(x => x.NodeIri)
                    .AddColumn(x => x.TransportId)
                    .AddColumn(x => x.TransportIri)
                    .AddColumn(x => x.InterfaceId)
                    .AddColumn(x => x.InterfaceIri)
                    .AddColumn(x => x.SimpleId)
                    .AddColumn(x => x.SimpleIri)
                    .AddColumn(x => x.SelectValuesString)
                    .AddColumn(x => x.SelectType)
                    .AddColumn(x => x.Discipline)
                    .AddColumn(x => x.IsLocked)
                    .AddColumn(x => x.IsLockedStatusBy)
                    .AddColumn(x => x.IsLockedStatusDate)
                    .TmpDisableAllNonClusteredIndexes()
                    .BulkInsert();


                await bulk.CommitTransactionAsync(connection);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"Error in Attribute Repository. Can't update database. Error: {e.Message}");
                throw;
            }
            finally
            {
                await connection.DisposeAsync();
            }
        }

        /// <summary>
        /// Bulk delete attributes
        /// </summary>
        /// <param name="attributes">The attributes that should be deleted</param>
        /// <returns>A bulk delete task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        public async Task BulkDelete(List<Attribute> attributes)
        {
            if (attributes == null || !attributes.Any())
                return;

            if (_databaseConfiguration == null || string.IsNullOrWhiteSpace(_databaseConfiguration.ConnectionString))
                throw new ModelBuilderConfigurationException("Database configuration missing");

            var bulk = new BulkOperations();
            var connection = new SqlConnection(_databaseConfiguration.ConnectionString);

            try
            {
                bulk.Setup<Attribute>(x => x.ForCollection(attributes))
                    .WithTable("Attribute")
                    .AddColumn(x => x.Id)
                    .BulkDelete()
                    .MatchTargetOn(x => x.Id);

                await bulk.CommitTransactionAsync(connection);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"Error in Attribute Repository. Can't update database. Error: {e.Message}");
                throw;
            }
            finally
            {
                await connection.DisposeAsync();
            }
        }
    }
}