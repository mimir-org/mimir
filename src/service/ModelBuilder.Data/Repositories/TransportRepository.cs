using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using SqlBulkTools;

namespace Mb.Data.Repositories
{
    public class TransportRepository : GenericRepository<ModelBuilderDbContext, Transport>, ITransportRepository
    {
        private readonly IAttributeRepository _attributeRepository;
        private readonly IConnectorRepository _connectorRepository;

        public TransportRepository(ModelBuilderDbContext dbContext, IAttributeRepository attributeRepository, IConnectorRepository connectorRepository) : base(dbContext)
        {
            _attributeRepository = attributeRepository;
            _connectorRepository = connectorRepository;
        }

        public void UpdateInsert(Transport transport, EntityState entityState)
        {
            if (transport?.InputTerminal == null)
                return;

            transport.InputTerminalId = transport.InputTerminal.Id;

            foreach (var attribute in transport.InputTerminal.Attributes)
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

            foreach (var attribute in transport.OutputTerminal.Attributes)
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
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="transports">The transports to be upserted</param>
        public void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Transport> transports)
        {
            if (transports == null || !transports.Any())
                return;

            bulk.Setup<Transport>()
                .ForCollection(transports)
                .WithTable("Transport")
                .AddColumn(x => x.Id)
                .AddColumn(x => x.Iri)
                .AddColumn(x => x.Version)
                .AddColumn(x => x.Rds)
                .AddColumn(x => x.Name)
                .AddColumn(x => x.Label)
                .AddColumn(x => x.Description)
                .AddColumn(x => x.StatusId)
                .AddColumn(x => x.TypeReferenceString)
                .AddColumn(x => x.InputTerminalId)
                .AddColumn(x => x.OutputTerminalId)
                .AddColumn(x => x.UpdatedBy)
                .AddColumn(x => x.Updated)
                .AddColumn(x => x.Created)
                .AddColumn(x => x.CreatedBy)
                .AddColumn(x => x.LibraryTypeId)
                .BulkInsertOrUpdate()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }

        /// <summary>
        /// Bulk delete transports
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="transports">The transports to be deleted</param>
        public void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Transport> transports)
        {
            if (transports == null || !transports.Any())
                return;

            bulk.Setup<Transport>()
                .ForCollection(transports)
                .WithTable("Transport")
                .AddColumn(x => x.Id)
                .BulkDelete()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }
    }
}