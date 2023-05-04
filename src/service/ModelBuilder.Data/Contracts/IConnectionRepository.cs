using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Enums;
using SqlBulkTools;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Mb.Data.Contracts;

public interface IConnectionRepository : IGenericRepository<ModelBuilderDbContext, ConnectionDm>
{
    IEnumerable<(ConnectionDm connection, WorkerStatus status)> UpdateInsert(ICollection<ConnectionDm> original, ProjectDm project,
        string invokedByDomain);

    Task<IEnumerable<(ConnectionDm connection, WorkerStatus status)>> DeleteConnections(ICollection<ConnectionDm> delete, string projectId,
        string invokedByDomain);

    void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<ConnectionTerminalDm> connectionTerminals);
    void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<ConnectionPartOfDm> connectionPartOf);
    void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<ConnectionFulfilledByDm> connectionFulfilledBy);
    void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<ConnectionHasLocationDm> connectionHasLocation);

    void BulkDelete(BulkOperations bulk, SqlConnection conn, List<ConnectionTerminalDm> connectionTerminals);
    void BulkDelete(BulkOperations bulk, SqlConnection conn, List<ConnectionPartOfDm> connectionPartOf);
    void BulkDelete(BulkOperations bulk, SqlConnection conn, List<ConnectionFulfilledByDm> connectionFulfilledBy);
    void BulkDelete(BulkOperations bulk, SqlConnection conn, List<ConnectionHasLocationDm> connectionHasLocation);

    /// <summary>
    /// Get connection connected data
    /// </summary>
    /// <param name="connectionId">The connection you want data from</param>
    /// <returns>A collection connected identity data</returns>
    /// <remarks>Get det connection identifier and all connected attributes from terminals</remarks>
    Task<List<ObjectIdentityDm>> GetConnectionConnectedData(string connectionId);
}