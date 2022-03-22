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
using Attribute = Mb.Models.Data.Attribute;

namespace Mb.Data.Repositories
{
    public class SimpleRepository : GenericRepository<ModelBuilderDbContext, Simple>, ISimpleRepository
    {
        private readonly IAttributeRepository _attributeRepository;
        private readonly DatabaseConfiguration _databaseConfiguration;
        private readonly ILogger<SimpleRepository> _logger;

        public SimpleRepository(ModelBuilderDbContext dbContext, IAttributeRepository attributeRepository, IOptions<DatabaseConfiguration> databaseConfiguration, ILogger<SimpleRepository> logger) : base(dbContext)
        {
            _attributeRepository = attributeRepository;
            _logger = logger;
            _databaseConfiguration = databaseConfiguration?.Value;
        }

        public void AttachWithAttributes(ICollection<Simple> entities, EntityState state)
        {
            if (entities == null)
                return;

            foreach (var simple in entities)
            {
                if (simple.Attributes != null)
                {
                    foreach (var attribute in simple.Attributes)
                    {
                        attribute.UnitString = attribute.Units != null ? JsonConvert.SerializeObject(attribute.Units) : null;
                        _attributeRepository.Attach(attribute, state);
                    }
                }
                Attach(simple, state);
            }
        }

        /// <summary>
        /// Bulk update simples
        /// </summary>
        /// <param name="simples">The simples that should be updated</param>
        /// <returns>A bulk update task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        public async Task BulkUpdate(List<Simple> simples)
        {
            if (simples == null || !simples.Any())
                return;

            if (_databaseConfiguration == null || string.IsNullOrWhiteSpace(_databaseConfiguration.ConnectionString))
                throw new ModelBuilderConfigurationException("Database configuration missing");

            var bulk = new BulkOperations();
            var connection = new SqlConnection(_databaseConfiguration.ConnectionString);

            try
            {
                bulk.Setup<Simple>(x => x.ForCollection(simples))
                    .WithTable("Simple")
                    .AddColumn(x => x.Id)
                    .AddColumn(x => x.Iri)
                    .AddColumn(x => x.Name)
                    .AddColumn(x => x.NodeId)
                    .AddColumn(x => x.NodeIri)
                    .TmpDisableAllNonClusteredIndexes()
                    .BulkUpdate()
                    .MatchTargetOn(x => x.Id);

                await bulk.CommitTransactionAsync(connection);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"Error in Simple Repository. Can't update database. Error: {e.Message}");
                throw;
            }
            finally
            {
                await connection.DisposeAsync();
            }
        }

        /// <summary>
        /// Bulk create simples
        /// </summary>
        /// <param name="simples">The simples that should be created</param>
        /// <returns>A bulk create task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        public async Task BulkCreate(List<Simple> simples)
        {
            if (simples == null || !simples.Any())
                return;

            if (_databaseConfiguration == null || string.IsNullOrWhiteSpace(_databaseConfiguration.ConnectionString))
                throw new ModelBuilderConfigurationException("Database configuration missing");

            var bulk = new BulkOperations();
            var connection = new SqlConnection(_databaseConfiguration.ConnectionString);

            try
            {
                bulk.Setup<Simple>(x => x.ForCollection(simples))
                    .WithTable("Simple")
                    .AddColumn(x => x.Id)
                    .AddColumn(x => x.Iri)
                    .AddColumn(x => x.Name)
                    .AddColumn(x => x.NodeId)
                    .AddColumn(x => x.NodeIri)
                    .TmpDisableAllNonClusteredIndexes()
                    .BulkInsert();

                await bulk.CommitTransactionAsync(connection);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"Error in Simple Repository. Can't create in database. Error: {e.Message}");
                throw;
            }
            finally
            {
                await connection.DisposeAsync();
            }
        }

        /// <summary>
        /// Bulk delete simples
        /// </summary>
        /// <param name="simples">The simples that should be deleted</param>
        /// <returns>A bulk delete task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        public async Task BulkDelete(List<Simple> simples)
        {
            if (simples == null || !simples.Any())
                return;

            if (_databaseConfiguration == null || string.IsNullOrWhiteSpace(_databaseConfiguration.ConnectionString))
                throw new ModelBuilderConfigurationException("Database configuration missing");

            var bulk = new BulkOperations();
            var connection = new SqlConnection(_databaseConfiguration.ConnectionString);

            try
            {
                bulk.Setup<Simple>(x => x.ForCollection(simples))
                    .WithTable("Simple")
                    .AddColumn(x => x.Id)
                    .TmpDisableAllNonClusteredIndexes()
                    .BulkDelete()
                    .MatchTargetOn(x => x.Id);

                await bulk.CommitTransactionAsync(connection);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"Error in Simple Repository. Can't delete from database. Error: {e.Message}");
                throw;
            }
            finally
            {
                await connection.DisposeAsync();
            }
        }
    }
}