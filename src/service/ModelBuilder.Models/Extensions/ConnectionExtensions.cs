using Mb.Models.Application;
using System.Collections.Generic;
using System.Linq;
using Mb.Models.Enums;

namespace Mb.Models.Extensions;

public static class ConnectionExtensions
{
    public static List<ConnectionAm> GetParentlessConnectors(this ICollection<ConnectionAm> connections, ICollection<BlockAm> blocks)
    {
        var parentlessConnections = new List<ConnectionAm>();

        if (connections == null || !connections.Any())
            return parentlessConnections;

        foreach (var connection in connections)
        {
            //TODO Rewrite
            //var fromblock = blocks.FirstOrDefault(x => x.Id == connection.FromblockId);
            //if (fromblock != null)
            //    continue;

            //var toblock = blocks.FirstOrDefault(x => x.Id == connection.ToblockId);
            //var toConnector = toblock?.Connectors?.FirstOrDefault(x => x.Id == connection.ToConnector);
            //if (toConnector is not RelationAm { RelationType: RelationType.PartOf })
            //    continue;

            //parentlessConnections.Add(connection);
        }

        return parentlessConnections;
    }

    public static List<ConnectionAm> GetNotConnectedConnectors(this ICollection<ConnectionAm> connections, ICollection<BlockAm> blocks)
    {
        var notConnectedConnections = new List<ConnectionAm>();

        if (connections == null || !connections.Any())
            return notConnectedConnections;

        foreach (var connection in connections)
        {
            //TODO Rewrite
            //var fromblock = blocks.FirstOrDefault(x => x.Id == connection.FromblockId);
            //if (fromblock == null)
            //    notConnectedConnections.Add(connection);

            //var toblock = blocks.FirstOrDefault(x => x.Id == connection.ToblockId);
            //if (toblock == null)
            //    notConnectedConnections.Add(connection);
        }

        return notConnectedConnections.DistinctBy(x => x.Id).ToList();
    }
}