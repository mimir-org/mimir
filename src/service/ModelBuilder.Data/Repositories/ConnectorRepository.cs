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
        /// Bulk relation update
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="relations">The relations to be upserted</param>
        public void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Relation> relations)
        {
            if (relations == null || !relations.Any())
                return;

            bulk.Setup<Relation>()
                .ForCollection(relations)
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
        public void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Terminal> terminals)
        {
            if (terminals == null || !terminals.Any())
                return;

            bulk.Setup<Terminal>()
                .ForCollection(terminals)
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
                .AddColumn(x => x.TerminalCategory)
                .AddColumn(x => x.TerminalTypeId)
                .AddColumn(x => x.TerminalTypeIri)
                .AddColumn(x => x.Discriminator)
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
        public void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Relation> relations)
        {
            if (relations == null || !relations.Any())
                return;

            bulk.Setup<Relation>()
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
        public void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Terminal> terminals)
        {
            if (terminals == null || !terminals.Any())
                return;

            bulk.Setup<Terminal>()
                .ForCollection(terminals)
                .WithTable("Connector")
                .AddColumn(x => x.Id)
                .BulkDelete()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }
    }
}