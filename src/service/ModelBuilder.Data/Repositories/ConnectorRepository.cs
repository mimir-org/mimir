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
    public class ConnectorRepository : GenericRepository<ModelBuilderDbContext, Connector>, IConnectorRepository
    {
        private readonly IAttributeRepository _attributeRepository;

        public ConnectorRepository(ModelBuilderDbContext dbContext, IAttributeRepository attributeRepository) : base(dbContext)
        {
            _attributeRepository = attributeRepository;
        }

        public void AttachWithAttributes(ICollection<Connector> entities, EntityState state)
        {
            if (entities == null)
                return;

            foreach (var connector in entities.OfType<ConnectorTerminal>())
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

            foreach (var connector in entities.OfType<ConnectorRelation>())
            {
                Attach(connector, state);
            }
        }

        /// <summary>
        /// Bulk relation update
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="relations">The relations to be upserted</param>
        public void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<ConnectorRelation> relations)
        {
            if (relations == null || !relations.Any())
                return;

            bulk.Setup<ConnectorRelation>()
                .ForCollection(relations)
                .WithTable("Connector")
                .AddColumn(x => x.Id)
                .AddColumn(x => x.Name)
                .AddColumn(x => x.Direction)
                .AddColumn(x => x.AspectObjectId)
                .AddColumn(x => x.Discriminator)
                .BulkInsertOrUpdate()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }

        /// <summary>
        /// Bulk relation update
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="terminals">The terminals to be upserted</param>
        public void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<ConnectorTerminal> terminals)
        {
            if (terminals == null || !terminals.Any())
                return;

            bulk.Setup<ConnectorTerminal>()
                .ForCollection(terminals)
                .WithTable("Connector")
                .AddColumn(x => x.Id)
                .AddColumn(x => x.Name)
                .AddColumn(x => x.Direction)
                .AddColumn(x => x.AspectObjectId)
                .AddColumn(x => x.Color)
                .AddColumn(x => x.TerminalType)
                .AddColumn(x => x.TerminalParentType)
                .AddColumn(x => x.Discriminator)
                .AddColumn(x => x.TypeReferenceString)
                .BulkInsertOrUpdate()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }

        /// <summary>
        /// Bulk delete relations
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="relations">The relations to be deleted</param>
        public void BulkDelete(BulkOperations bulk, SqlConnection conn, List<ConnectorRelation> relations)
        {
            if (relations == null || !relations.Any())
                return;

            bulk.Setup<ConnectorRelation>()
                .ForCollection(relations)
                .WithTable("Connector")
                .AddColumn(x => x.Id)
                .BulkDelete()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }

        /// <summary>
        /// Bulk delete terminals
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="terminals">The terminals to be deleted</param>
        public void BulkDelete(BulkOperations bulk, SqlConnection conn, List<ConnectorTerminal> terminals)
        {
            if (terminals == null || !terminals.Any())
                return;

            bulk.Setup<ConnectorTerminal>()
                .ForCollection(terminals)
                .WithTable("Connector")
                .AddColumn(x => x.Id)
                .BulkDelete()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }
    }
}