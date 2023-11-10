using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using SqlBulkTools;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Attribute = Mb.Models.Data.Attribute;

namespace Mb.Data.Repositories;

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
            .AddColumn(x => x.Name)
            .AddColumn(x => x.Value)
            .AddColumn(x => x.AttributeType)
            .AddColumn(x => x.UnitSelected)
            .AddColumn(x => x.Units)
            .AddColumn(x => x.Qualifiers)
            .AddColumn(x => x.ConnectorTerminal)
            .AddColumn(x => x.Block)
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
            .AddColumn(x => x.Name)
            .AddColumn(x => x.Value)
            .AddColumn(x => x.AttributeType)
            .AddColumn(x => x.UnitSelected)
            .AddColumn(x => x.Units)
            .AddColumn(x => x.Qualifiers)
            .AddColumn(x => x.ConnectorTerminal)
            .AddColumn(x => x.Block)
            .BulkInsert()
            .Commit(conn);
    }
}