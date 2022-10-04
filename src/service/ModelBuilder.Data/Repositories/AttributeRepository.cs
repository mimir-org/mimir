using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Common;
using Mb.Models.Configurations;
using Mb.Models.Enums;
using Mimirorg.Common.Exceptions;
using SqlBulkTools;
using Attribute = Mb.Models.Data.Attribute;

namespace Mb.Data.Repositories
{
    public class AttributeRepository : GenericRepository<ModelBuilderDbContext, Attribute>, IAttributeRepository
    {
        public AttributeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }

        /// <summary>
        /// Bulk attributes update
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="attributes">The attributes to be upserted</param>
        public void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Attribute> attributes)
        {
            if (attributes == null || !attributes.Any())
                return;

            bulk.Setup<Attribute>()
                .ForCollection(attributes)
                .WithTable("Attribute")
                .AddColumn(x => x.Id)
                .AddColumn(x => x.Iri)
                .AddColumn(x => x.Entity)
                .AddColumn(x => x.Value)
                .AddColumn(x => x.AttributeTypeId)
                .AddColumn(x => x.AttributeTypeIri)
                .AddColumn(x => x.SelectedUnitId)
                .AddColumn(x => x.UnitString)
                .AddColumn(x => x.TypeReferenceString)
                .AddColumn(x => x.SpecifiedScope)
                .AddColumn(x => x.SpecifiedProvenance)
                .AddColumn(x => x.RangeSpecifying)
                .AddColumn(x => x.RegularitySpecified)
                .AddColumn(x => x.TerminalId)
                .AddColumn(x => x.TerminalIri)
                .AddColumn(x => x.NodeId)
                .AddColumn(x => x.NodeIri)
                .AddColumn(x => x.TransportId)
                .AddColumn(x => x.TransportIri)
                .AddColumn(x => x.InterfaceId)
                .AddColumn(x => x.InterfaceIri)
                .AddColumn(x => x.SelectValuesString)
                .AddColumn(x => x.SelectType)
                .AddColumn(x => x.Discipline)
                .AddColumn(x => x.IsLocked)
                .AddColumn(x => x.IsLockedStatusBy)
                .AddColumn(x => x.IsLockedStatusDate)
                .BulkInsertOrUpdate()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }


        /// <summary>
        /// Bulk attributes delete
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="attributes">The attributes to be deleted</param>
        public void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Attribute> attributes)
        {
            if (attributes == null || !attributes.Any())
                return;

            bulk.Setup<Attribute>()
                .ForCollection(attributes)
                .WithTable("Attribute")
                .AddColumn(x => x.Id)
                .BulkDelete()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }

        /// <summary>
        /// Bulk attributes insert
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="attributes">The attributes to be inserted</param>
        public void BulkInsert(BulkOperations bulk, SqlConnection conn, List<Attribute> attributes)
        {
            if (attributes == null || !attributes.Any())
                return;

            bulk.Setup<Attribute>()
                .ForCollection(attributes)
                .WithTable("Attribute")
                .AddColumn(x => x.Id)
                .AddColumn(x => x.Iri)
                .AddColumn(x => x.Entity)
                .AddColumn(x => x.Value)
                .AddColumn(x => x.AttributeTypeId)
                .AddColumn(x => x.AttributeTypeIri)
                .AddColumn(x => x.SelectedUnitId)
                .AddColumn(x => x.UnitString)
                .AddColumn(x => x.SpecifiedScope)
                .AddColumn(x => x.SpecifiedProvenance)
                .AddColumn(x => x.RangeSpecifying)
                .AddColumn(x => x.RegularitySpecified)
                .AddColumn(x => x.TerminalId)
                .AddColumn(x => x.TerminalIri)
                .AddColumn(x => x.NodeId)
                .AddColumn(x => x.NodeIri)
                .AddColumn(x => x.TransportId)
                .AddColumn(x => x.TransportIri)
                .AddColumn(x => x.InterfaceId)
                .AddColumn(x => x.InterfaceIri)
                .AddColumn(x => x.SelectValuesString)
                .AddColumn(x => x.SelectType)
                .AddColumn(x => x.Discipline)
                .AddColumn(x => x.IsLocked)
                .AddColumn(x => x.IsLockedStatusBy)
                .AddColumn(x => x.IsLockedStatusDate)
                .BulkInsert()
                .Commit(conn);
        }

        /// <summary>
        /// Bulk attributes update lock status
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="lockDms">The attributes to be updated</param>
        public void BulkUpdateLockStatus(BulkOperations bulk, SqlConnection conn, List<LockDm> lockDms)
        {
            if (lockDms == null || !lockDms.Any())
                return;

            if (lockDms.Any(x => x.Type is not EntityType.Attribute))
                throw new MimirorgBadRequestException("EntityType is not of type Attribute");

            bulk.Setup<LockDm>()
                .ForCollection(lockDms)
                .WithTable("Attribute")
                .AddColumn(x => x.Id)
                .AddColumn(x => x.IsLocked)
                .AddColumn(x => x.IsLockedStatusBy)
                .AddColumn(x => x.IsLockedStatusDate)
                .BulkUpdate()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }
    }
}