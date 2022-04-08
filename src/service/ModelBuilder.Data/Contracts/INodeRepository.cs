using System.Collections.Generic;
using System.Data.SqlClient;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Enums;
using SqlBulkTools;

namespace Mb.Data.Contracts
{
    public interface INodeRepository : IGenericRepository<ModelBuilderDbContext, Node>
    {
        IEnumerable<(Node node, WorkerStatus status)> UpdateInsert(ICollection<Node> original, Project project, string invokedByDomain);
        IEnumerable<(Node node, WorkerStatus status)> DeleteNodes(ICollection<Node> delete, string projectId, string invokedByDomain);

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
        /// Bulk edge update lock status
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="nodes">The attributes to be updated</param>
        void BulkUpdateLockStatus(BulkOperations bulk, SqlConnection conn, List<Node> nodes);
    }
}