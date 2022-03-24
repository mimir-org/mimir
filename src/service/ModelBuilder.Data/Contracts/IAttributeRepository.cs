using System.Collections.Generic;
using System.Data.SqlClient;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using SqlBulkTools;

namespace Mb.Data.Contracts
{
    public interface IAttributeRepository : IGenericRepository<ModelBuilderDbContext, Mb.Models.Data.Attribute>
    {
        /// <summary>
        /// Bulk attributes update
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="attributes">The attributes to be upserted</param>
        void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Attribute> attributes);

        /// <summary>
        /// Bulk attributes delete
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="attributes">The attributes to be upserted</param>
        void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Attribute> attributes);
    }
}