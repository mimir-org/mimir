using System.Collections.Generic;
using System.Data.SqlClient;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using SqlBulkTools;

namespace Mb.Data.Contracts
{
    public interface ITransportRepository : IGenericRepository<ModelBuilderDbContext, Transport>
    {
        void UpdateInsert(Transport transport, EntityState entityState);

        /// <summary>
        /// Bulk transport update
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="transports">The transports to be upserted</param>
        void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Transport> transports);

        /// <summary>
        /// Bulk delete transports
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="transports">The transports to be deleted</param>
        void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Transport> transports);
    }
}