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
    public interface INodeRepository : IGenericRepository<ModelBuilderDbContext, Node>
    {
        IEnumerable<(Node node, WorkerStatus status)> UpdateInsert(ICollection<Node> original, Project project,
            string invokedByDomain);

        IEnumerable<(Node node, WorkerStatus status)> DeleteNodes(ICollection<Node> delete, string projectId,
            string invokedByDomain);

        /// <summary>
        /// Bulk node update
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn"></param>
        /// <param name="nodes">The nodes to be upserted</param>
        void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Node> nodes);

        /// <summary>
        /// Bulk delete nodes
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="nodes">The nodes to be deleted</param>
        void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Node> nodes);

        /// <summary>
        /// Bulk connection update lock status
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="lockDms">The attributes to be updated</param>
        void BulkUpdateLockStatus(BulkOperations bulk, SqlConnection conn, List<LockDm> lockDms);

        /// <summary>
        /// Get node connected data
        /// </summary>
        /// <param name="nodeId">The node you want data from</param>
        /// <returns>A collection connected identity data</returns>
        /// <remarks>Get det node identifier and all connected children including
        /// children nodes, children connections and children terminals</remarks>
        Task<List<ObjectIdentity>> GetNodeConnectedData(string nodeId);
    }
}