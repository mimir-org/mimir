using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using SqlBulkTools;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Mb.Data.Contracts;

public interface IAttributeRepository : IGenericRepository<ModelBuilderDbContext, AttributeDm>
{
    /// <summary>
    /// Bulk attributes upsert
    /// </summary>
    /// <param name="bulk">Bulk operations</param>
    /// <param name="conn">Sql Connection</param>
    /// <param name="attributes">The attributes to be upserted</param>
    void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<AttributeDm> attributes);

    /// <summary>
    /// Bulk attributes delete
    /// </summary>
    /// <param name="bulk">Bulk operations</param>
    /// <param name="conn">Sql Connection</param>
    /// <param name="attributes">The attributes to be upserted</param>
    void BulkDelete(BulkOperations bulk, SqlConnection conn, List<AttributeDm> attributes);

    /// <summary>
    /// Bulk attributes insert
    /// </summary>
    /// <param name="bulk">Bulk operations</param>
    /// <param name="conn">Sql Connection</param>
    /// <param name="attributes">The attributes to be inserted</param>
    void BulkInsert(BulkOperations bulk, SqlConnection conn, List<AttributeDm> attributes);
}