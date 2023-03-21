using System.Collections.Generic;
using System.Data.SqlClient;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using SqlBulkTools;

namespace Mb.Data.Contracts
{
    public interface IConnectorRepository : IGenericRepository<ModelBuilderDbContext, ConnectorDm>
    {
        void AttachWithAttributes(ICollection<ConnectorDm> entities, EntityState state);

        void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<ConnectorTerminalDm> connectorTerminals);
        void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<ConnectorPartOfDm> connectorPartOf);
        void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<ConnectorFulfilledByDm> connectorFulfilledBy);
        void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<ConnectorHasLocationDm> connectorHasLocation);

        void BulkDelete(BulkOperations bulk, SqlConnection conn, List<ConnectorTerminalDm> connectorTerminals);
        void BulkDelete(BulkOperations bulk, SqlConnection conn, List<ConnectorPartOfDm> connectorPartOf);
        void BulkDelete(BulkOperations bulk, SqlConnection conn, List<ConnectorFulfilledByDm> connectorFulfilledBy);
        void BulkDelete(BulkOperations bulk, SqlConnection conn, List<ConnectorHasLocationDm> connectorHasLocations);
    }
}