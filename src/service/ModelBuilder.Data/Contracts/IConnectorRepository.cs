using System.Collections.Generic;
using System.Data.SqlClient;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using SqlBulkTools;

namespace Mb.Data.Contracts
{
    public interface IConnectorRepository : IGenericRepository<ModelBuilderDbContext, Connector>
    {
        void AttachWithAttributes(ICollection<Connector> entities, EntityState state);

        void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<ConnectorTerminal> connectorTerminals);
        void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<ConnectorPartOf> connectorPartOf);
        void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<ConnectorFulfilledBy> connectorFulfilledBy);
        void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<ConnectorHasLocation> connectorHasLocation);

        void BulkDelete(BulkOperations bulk, SqlConnection conn, List<ConnectorTerminal> connectorTerminals);
        void BulkDelete(BulkOperations bulk, SqlConnection conn, List<ConnectorPartOf> connectorPartOf);
        void BulkDelete(BulkOperations bulk, SqlConnection conn, List<ConnectorFulfilledBy> connectorFulfilledBy);
        void BulkDelete(BulkOperations bulk, SqlConnection conn, List<ConnectorHasLocation> connectorHasLocations);
    }
}