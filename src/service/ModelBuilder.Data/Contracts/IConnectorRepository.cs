using System.Collections.Generic;
using System.Data.SqlClient;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using SqlBulkTools;

namespace Mb.Data.Contracts
{
    public interface IConnectorRepository : IGenericRepository<ModelBuilderDbContext, Connector>
    {
        void AttachWithAttributes(ICollection<Connector> entities, EntityState state);

        /// <summary>
        /// Bulk relation update
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="relations">The relations to be upserted</param>
        void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Relation> relations);

        /// <summary>
        /// Bulk relation update
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="terminals">The terminals to be upserted</param>
        void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Terminal> terminals);

        /// <summary>
        /// Bulk delete relations
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="relations">The relations to be deleted</param>
        void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Relation> relations);

        /// <summary>
        /// Bulk delete terminals
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="terminals">The terminals to be deleted</param>
        void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Terminal> terminals);
    }
}