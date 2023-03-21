using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using SqlBulkTools;

namespace Mb.Data.Repositories
{
    public class ConnectorRepository : GenericRepository<ModelBuilderDbContext, ConnectorDm>, IConnectorRepository
    {
        private readonly IAttributeRepository _attributeRepository;

        public ConnectorRepository(ModelBuilderDbContext dbContext, IAttributeRepository attributeRepository) : base(dbContext)
        {
            _attributeRepository = attributeRepository;
        }

        public void AttachWithAttributes(ICollection<ConnectorDm> entities, EntityState state)
        {
            if (entities == null)
                return;

            foreach (var connector in entities.OfType<ConnectorTerminalDm>())
            {
                if (connector.Attributes != null)
                {
                    foreach (var attribute in connector.Attributes)
                    {
                        _attributeRepository.Attach(attribute, state);
                    }
                }
                Attach(connector, state);
            }

            foreach (var connector in entities.OfType<ConnectorRelationDm>())
            {
                Attach(connector, state);
            }
        }

        /// <summary>
        /// Bulk update
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="connectorTerminals">The objects to be upserted</param>
        public void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<ConnectorTerminalDm> connectorTerminals)
        {
            if (connectorTerminals == null || !connectorTerminals.Any())
                return;

            bulk.Setup<ConnectorTerminalDm>()
                .ForCollection(connectorTerminals)
                .WithTable("Connector")
                //Parent
                .AddColumn(x => x.Id)
                .AddColumn(x => x.Name)
                .AddColumn(x => x.Direction)
                .AddColumn(x => x.Inside)
                .AddColumn(x => x.Outside)
                .AddColumn(x => x.AspectObject)
                //Child
                .AddColumn(x => x.Color)
                .AddColumn(x => x.TerminalType)
                .AddColumn(x => x.TerminalParentType)
                .AddColumn(x => x.Discriminator)
                .AddColumn(x => x.ReferenceType)
                //Operations
                .BulkInsertOrUpdate()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }

        public void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<ConnectorPartOfDm> connectorPartOf)
        {
            if (connectorPartOf == null || !connectorPartOf.Any())
                return;

            bulk.Setup<ConnectorPartOfDm>()
                .ForCollection(connectorPartOf)
                .WithTable("Connector")
                //Parent
                .AddColumn(x => x.Id)
                .AddColumn(x => x.Name)
                .AddColumn(x => x.Direction)
                .AddColumn(x => x.Inside)
                .AddColumn(x => x.Outside)
                .AddColumn(x => x.AspectObject)
                //Operations
                .BulkInsertOrUpdate()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }

        public void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<ConnectorFulfilledByDm> connectorFulfilledBy)
        {
            if (connectorFulfilledBy == null || !connectorFulfilledBy.Any())
                return;

            bulk.Setup<ConnectorFulfilledByDm>()
                .ForCollection(connectorFulfilledBy)
                .WithTable("Connector")
                //Parent
                .AddColumn(x => x.Id)
                .AddColumn(x => x.Name)
                .AddColumn(x => x.Direction)
                .AddColumn(x => x.Inside)
                .AddColumn(x => x.Outside)
                .AddColumn(x => x.AspectObject)
                //Operations
                .BulkInsertOrUpdate()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }

        public void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<ConnectorHasLocationDm> connectorHasLocation)
        {
            if (connectorHasLocation == null || !connectorHasLocation.Any())
                return;

            bulk.Setup<ConnectorHasLocationDm>()
                .ForCollection(connectorHasLocation)
                .WithTable("Connector")
                //Parent
                .AddColumn(x => x.Id)
                .AddColumn(x => x.Name)
                .AddColumn(x => x.Direction)
                .AddColumn(x => x.Inside)
                .AddColumn(x => x.Outside)
                .AddColumn(x => x.AspectObject)
                //Operations
                .BulkInsertOrUpdate()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }

        public void BulkDelete(BulkOperations bulk, SqlConnection conn, List<ConnectorTerminalDm> connectorTerminals)
        {
            if (connectorTerminals == null || !connectorTerminals.Any())
                return;

            bulk.Setup<ConnectorTerminalDm>()
                .ForCollection(connectorTerminals)
                .WithTable("Connector")
                .AddColumn(x => x.Id)
                .BulkDelete()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }

        public void BulkDelete(BulkOperations bulk, SqlConnection conn, List<ConnectorPartOfDm> connectorPartOf)
        {
            if (connectorPartOf == null || !connectorPartOf.Any())
                return;

            bulk.Setup<ConnectorPartOfDm>()
                .ForCollection(connectorPartOf)
                .WithTable("Connector")
                .AddColumn(x => x.Id)
                .BulkDelete()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }

        public void BulkDelete(BulkOperations bulk, SqlConnection conn, List<ConnectorFulfilledByDm> connectorFulfilledBy)
        {
            if (connectorFulfilledBy == null || !connectorFulfilledBy.Any())
                return;

            bulk.Setup<ConnectorFulfilledByDm>()
                .ForCollection(connectorFulfilledBy)
                .WithTable("Connector")
                .AddColumn(x => x.Id)
                .BulkDelete()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }

        public void BulkDelete(BulkOperations bulk, SqlConnection conn, List<ConnectorHasLocationDm> connectorHasLocations)
        {
            if (connectorHasLocations == null || !connectorHasLocations.Any())
                return;

            bulk.Setup<ConnectorHasLocationDm>()
                .ForCollection(connectorHasLocations)
                .WithTable("Connector")
                .AddColumn(x => x.Id)
                .BulkDelete()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }
    }
}