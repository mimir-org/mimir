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
    public interface IEdgeRepository : IGenericRepository<ModelBuilderDbContext, Edge>
    {
        IEnumerable<(Edge edge, WorkerStatus status)> UpdateInsert(ICollection<Edge> original, Project project,
            string invokedByDomain);

        Task<IEnumerable<(Edge edge, WorkerStatus status)>> DeleteEdges(ICollection<Edge> delete, string projectId,
            string invokedByDomain);

        /// <summary>
        /// Bulk edge update
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="edges">The edges to be upserted</param>
        void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Edge> edges);

        /// <summary>
        /// Bulk delete edges
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="edges">The edges to be deleted</param>
        void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Edge> edges);

        /// <summary>
        /// Bulk edge update lock status
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="lockDms">The attributes to be updated</param>
        void BulkUpdateLockStatus(BulkOperations bulk, SqlConnection conn, List<LockDm> lockDms);

        /// <summary>
        /// Get edge connected data
        /// </summary>
        /// <param name="edgeId">The edge you want data from</param>
        /// <returns>A collection connected identity data</returns>
        /// <remarks>Get det edge identifier and all connected attributes from transport, interface and terminals</remarks>
        Task<List<ObjectIdentity>> GetEdgeConnectedData(string edgeId);
    }
}