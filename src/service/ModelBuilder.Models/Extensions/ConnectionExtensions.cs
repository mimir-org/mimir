using Mb.Models.Application;
using System.Collections.Generic;
using System.Linq;
using Mb.Models.Enums;

namespace Mb.Models.Extensions
{
    public static class ConnectionExtensions
    {
        public static List<ConnectionAm> GetParentlessConnectors(this ICollection<ConnectionAm> connections, ICollection<AspectObjectAm> aspectObjects)
        {
            var parentlessConnections = new List<ConnectionAm>();

            if (connections == null || !connections.Any())
                return parentlessConnections;

            foreach (var connection in connections)
            {
                //TODO Rewrite
                //var fromAspectObject = aspectObjects.FirstOrDefault(x => x.Id == connection.FromAspectObjectId);
                //if (fromAspectObject != null)
                //    continue;

                //var toAspectObject = aspectObjects.FirstOrDefault(x => x.Id == connection.ToAspectObjectId);
                //var toConnector = toAspectObject?.Connectors?.FirstOrDefault(x => x.Id == connection.ToConnector);
                //if (toConnector is not RelationAm { RelationType: RelationType.PartOf })
                //    continue;

                //parentlessConnections.Add(connection);
            }

            return parentlessConnections;
        }

        public static List<ConnectionAm> GetNotConnectedConnectors(this ICollection<ConnectionAm> connections, ICollection<AspectObjectAm> aspectObjects)
        {
            var notConnectedConnections = new List<ConnectionAm>();

            if (connections == null || !connections.Any())
                return notConnectedConnections;

            foreach (var connection in connections)
            {
                //TODO Rewrite
                //var fromAspectObject = aspectObjects.FirstOrDefault(x => x.Id == connection.FromAspectObjectId);
                //if (fromAspectObject == null)
                //    notConnectedConnections.Add(connection);

                //var toAspectObject = aspectObjects.FirstOrDefault(x => x.Id == connection.ToAspectObjectId);
                //if (toAspectObject == null)
                //    notConnectedConnections.Add(connection);
            }

            return notConnectedConnections.DistinctBy(x => x.Id).ToList();
        }
    }
}