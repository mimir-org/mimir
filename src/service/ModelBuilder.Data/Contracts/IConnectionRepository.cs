using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Mb.Models.Abstract;
using Mb.Models.Common;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Enums;
using SqlBulkTools;

namespace Mb.Data.Contracts
{
    public interface IConnectionRepository : IGenericRepository<ModelBuilderDbContext, Connection>
    {
        IEnumerable<(Connection connection, WorkerStatus status)> UpdateInsert(ICollection<Connection> original, Project project,
            string invokedByDomain);

        Task<IEnumerable<(Connection connection, WorkerStatus status)>> DeleteConnections(ICollection<Connection> delete, string projectId,
            string invokedByDomain);

        /// <summary>
        /// Bulk connection update
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="connections">The connections to be upserted</param>
        void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Connection> connections);

        /// <summary>
        /// Bulk delete connections
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="connections">The connections to be deleted</param>
        void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Connection> connections);

        /// <summary>
        /// Bulk connection update lock status
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="lockDms">The attributes to be updated</param>
        void BulkUpdateLockStatus(BulkOperations bulk, SqlConnection conn, List<LockDm> lockDms);

        /// <summary>
        /// Get connection connected data
        /// </summary>
        /// <param name="connectionId">The connection you want data from</param>
        /// <returns>A collection connected identity data</returns>
        /// <remarks>Get det connection identifier and all connected attributes from terminals</remarks>
        Task<List<ObjectIdentity>> GetConnectionConnectedData(string connectionId);
    }
}