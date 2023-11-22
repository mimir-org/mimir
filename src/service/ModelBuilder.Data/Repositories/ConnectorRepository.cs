using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using SqlBulkTools;

namespace Mb.Data.Repositories;

public class ConnectorRepository : GenericRepository<ModelBuilderDbContext, Connector>, IConnectorRepository
{
    private readonly IAttributeRepository _attributeRepository;

    public ConnectorRepository(ModelBuilderDbContext dbContext, IAttributeRepository attributeRepository) : base(dbContext)
    {
        _attributeRepository = attributeRepository;
    }

    public void AttachWithAttributes(ICollection<Connector> entities, EntityState state)
    {
        if (entities == null)
            return;

        foreach (var connector in entities.OfType<Connector>())
        {
            if (connector.Attributes != null)
            {
                foreach (var attribute in connector.Attributes)
                {
                    _attributeRepository.Attach(attribute, state);
                }
            }
            Attach(connector, state);
        }

        foreach (var connector in entities.OfType<Connector>())
        {
            Attach(connector, state);
        }
    }

    /// <summary>
    /// Bulk update
    /// </summary>
    /// <param name="bulk">Bulk operations</param>
    /// <param name="conn">Sql Connection</param>
    /// <param name="connectorTerminals">The objects to be upserted</param>
    public void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Connector> connectorTerminals)
    {
        if (connectorTerminals == null || !connectorTerminals.Any())
            return;

        bulk.Setup<Connector>()
            .ForCollection(connectorTerminals)
            .WithTable("Connector")
            //Parent
            .AddColumn(x => x.Id)
            .AddColumn(x => x.Name)
            .AddColumn(x => x.Direction)
            .AddColumn(x => x.Inside)
            .AddColumn(x => x.Outside)
            .AddColumn(x => x.BlockId)
            //Child
            .AddColumn(x => x.Color)

            .AddColumn(x => x.TypeConnector)
            
            //Operations
            .BulkInsertOrUpdate()
            .MatchTargetOn(x => x.Id)
            .Commit(conn);
    }
 

    public void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Connector> connectorTerminals)
    {
        if (connectorTerminals == null || !connectorTerminals.Any())
            return;

        bulk.Setup<Connector>()
            .ForCollection(connectorTerminals)
            .WithTable("Connector")
            .AddColumn(x => x.Id)
            .BulkDelete()
            .MatchTargetOn(x => x.Id)
            .Commit(conn);
    }

 
}