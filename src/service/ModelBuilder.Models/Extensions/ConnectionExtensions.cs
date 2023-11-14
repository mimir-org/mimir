using Mb.Models.Application;
using System.Collections.Generic;
using System.Linq;
using Mb.Models.Enums;

namespace Mb.Models.Extensions;

public static class ConnectionExtensions
{
    public static List<ConnectionRequest> GetParentlessConnectors(this ICollection<ConnectionRequest> connections, ICollection<BlockRequest> blocks)
    {
        var parentlessConnections = new List<ConnectionRequest>();

        if (connections == null || !connections.Any())
            return parentlessConnections;

        foreach (var connection in connections)
        {
            //TODO Rewrite
            //var fromBlock = blocks.FirstOrDefault(x => x.Id == connection.FromBlockId);
            //if (fromBlock != null)
            //    continue;

            //var toBlock = blocks.FirstOrDefault(x => x.Id == connection.ToBlockId);
            //var toConnector = toBlock?.Connectors?.FirstOrDefault(x => x.Id == connection.ToConnector);
            //if (toConnector is not RelationAm { RelationType: RelationType.PartOf })
            //    continue;

            //parentlessConnections.Add(connection);
        }

        return parentlessConnections;
    }

    public static List<ConnectionRequest> GetNotConnectedConnectors(this ICollection<ConnectionRequest> connections, ICollection<BlockRequest> blocks)
    {
        var notConnectedConnections = new List<ConnectionRequest>();

        if (connections == null || !connections.Any())
            return notConnectedConnections;

        foreach (var connection in connections)
        {
            //TODO Rewrite
            //var fromBlock = blocks.FirstOrDefault(x => x.Id == connection.FromBlockId);
            //if (fromBlock == null)
            //    notConnectedConnections.Add(connection);

            //var toBlock = blocks.FirstOrDefault(x => x.Id == connection.ToBlockId);
            //if (toBlock == null)
            //    notConnectedConnections.Add(connection);
        }

        return notConnectedConnections.DistinctBy(x => x.Id).ToList();
    }
}