using System.Collections.Generic;
using System.Data.SqlClient;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using SqlBulkTools;

namespace Mb.Data.Contracts;

public interface IConnectorRepository : IGenericRepository<ModelBuilderDbContext, Connector>
{
    void AttachWithAttributes(ICollection<Connector> entities, EntityState state);

    void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Connector> connectorTerminals);
    //void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Connector> connectorPartOf);
    //void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Connector> connectorFulfilledBy);
    //void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Connector> connectorHasLocation);

    void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Connector> connectorTerminals);
    //void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Connector> connectorPartOf);
    //void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Connector> connectorFulfilledBy);
    //void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Connector> connectorHasLocations);
}