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
    public interface IAspectObjectRepository : IGenericRepository<ModelBuilderDbContext, AspectObjectDm>
    {
        IEnumerable<(AspectObjectDm aspectObject, WorkerStatus status)> UpdateInsert(ICollection<AspectObjectDm> original, ProjectDm project,
            string invokedByDomain);

        IEnumerable<(AspectObjectDm aspectObject, WorkerStatus status)> DeleteAspectObjects(ICollection<AspectObjectDm> delete, string projectId,
            string invokedByDomain);
        
        /// <summary>
        /// Get complete aspect object
        /// </summary>
        /// <param name="id">Aspect object id</param>
        /// <returns>Complete aspect object</returns>
        Task<AspectObjectDm> GetAsyncComplete(string id);

        /// <summary>
        /// Bulk aspectObject update
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn"></param>
        /// <param name="aspectObjects">The aspectObjects to be upserted</param>
        void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<AspectObjectDm> aspectObjects);

        /// <summary>
        /// Bulk delete aspectObjects
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="aspectObjects">The aspectObjects to be deleted</param>
        void BulkDelete(BulkOperations bulk, SqlConnection conn, List<AspectObjectDm> aspectObjects);

        /// <summary>
        /// Bulk connection update lock status
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="lockDms">The attributes to be updated</param>
        void BulkUpdateLockStatus(BulkOperations bulk, SqlConnection conn, List<LockDm> lockDms);

        /// <summary>
        /// Get aspectObject connected data
        /// </summary>
        /// <param name="aspectObjectId">The aspectObject you want data from</param>
        /// <returns>A collection connected identity data</returns>
        /// <remarks>Get det aspectObject identifier and all connected children including
        /// children aspectObjects, children connections and children terminals</remarks>
        Task<List<ObjectIdentityDm>> GetAspectObjectConnectedData(string aspectObjectId);
    }
}