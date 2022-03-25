using System.Collections.Generic;
using System.Data.SqlClient;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using SqlBulkTools;

namespace Mb.Data.Contracts
{
    public interface ISimpleRepository : IGenericRepository<ModelBuilderDbContext, Simple>
    {
        void AttachWithAttributes(ICollection<Simple> entities, EntityState state);

        /// <summary>
        /// Bulk simple update
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="simples">The simples to be upserted</param>
        void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Simple> simples);

        /// <summary>
        /// Bulk delete simples
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="simples">The simples to be deleted</param>
        void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Simple> simples);
    }
}