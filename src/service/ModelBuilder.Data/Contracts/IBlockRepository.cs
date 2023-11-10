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

public interface IBlockRepository : IGenericRepository<ModelBuilderDbContext, Block>
{
    IEnumerable<(Block block, WorkerStatus status)> UpdateInsert(ICollection<Block> original, Project project,
        string invokedByDomain);

    IEnumerable<(Block block, WorkerStatus status)> DeleteBlocks(ICollection<Block> delete, string projectId,
        string invokedByDomain);

    /// <summary>
    /// Get complete block
    /// </summary>
    /// <param name="id">Block id</param>
    /// <returns>Complete block</returns>
    Task<Block> GetAsyncComplete(Guid id);

    /// <summary>
    /// Bulk block update
    /// </summary>
    /// <param name="bulk">Bulk operations</param>
    /// <param name="conn"></param>
    /// <param name="blocks">The blocks to be upserted</param>
    void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Block> blocks);

    /// <summary>
    /// Bulk delete blocks
    /// </summary>
    /// <param name="bulk">Bulk operations</param>
    /// <param name="conn">Sql Connection</param>
    /// <param name="blocks">The blocks to be deleted</param>
    void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Block> blocks);

    /// <summary>
    /// Bulk connection update lock status
    /// </summary>
    /// <param name="bulk">Bulk operations</param>
    /// <param name="conn">Sql Connection</param>
    /// <param name="lockDms">The attributes to be updated</param>
    void BulkUpdateLockStatus(BulkOperations bulk, SqlConnection conn, List<LockDm> lockDms);
}