using System.Collections.Generic;
using System.Data.SqlClient;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using SqlBulkTools;

namespace Mb.Data.Contracts
{
    public interface IInterfaceRepository : IGenericRepository<ModelBuilderDbContext, Interface>
    {
        void UpdateInsert(Interface inter, EntityState entityState);

        /// <summary>
        /// Bulk interface update
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="interfaces">The interfaces to be upserted</param>
        void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Interface> interfaces);

        /// <summary>
        /// Bulk delete interfaces
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="interfaces">The interfaces to be deleted</param>
        void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Interface> interfaces);
    }
}