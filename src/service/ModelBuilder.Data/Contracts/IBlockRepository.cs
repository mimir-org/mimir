using Mb.Models.Abstract;
using Mb.Models.Common;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Enums;
using SqlBulkTools;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Mb.Data.Contracts;

public interface IBlockRepository : IGenericRepository<ModelBuilderDbContext, BlockDm>
{
    IEnumerable<(BlockDm block, WorkerStatus status)> UpdateInsert(ICollection<BlockDm> original, ProjectDm project,
        string invokedByDomain);

    IEnumerable<(BlockDm block, WorkerStatus status)> DeleteBlocks(ICollection<BlockDm> delete, string projectId,
        string invokedByDomain);

    /// <summary>
    /// Get complete block
    /// </summary>
    /// <param name="id">Block id</param>
    /// <returns>Complete block</returns>
    Task<BlockDm> GetAsyncComplete(Guid id);

    /// <summary>
    /// Bulk block update
    /// </summary>
    /// <param name="bulk">Bulk operations</param>
    /// <param name="conn"></param>
    /// <param name="blocks">The blocks to be upserted</param>
    void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<BlockDm> blocks);

    /// <summary>
    /// Bulk delete blocks
    /// </summary>
    /// <param name="bulk">Bulk operations</param>
    /// <param name="conn">Sql Connection</param>
    /// <param name="blocks">The blocks to be deleted</param>
    void BulkDelete(BulkOperations bulk, SqlConnection conn, List<BlockDm> blocks);

    /// <summary>
    /// Bulk connection update lock status
    /// </summary>
    /// <param name="bulk">Bulk operations</param>
    /// <param name="conn">Sql Connection</param>
    /// <param name="lockDms">The attributes to be updated</param>
    void BulkUpdateLockStatus(BulkOperations bulk, SqlConnection conn, List<LockDm> lockDms);
}