using Mb.Models.Application;
using System.Collections.Generic;
using System.Linq;

namespace Mb.Models.Extensions
{
    public static class EdgeExtensions
    {
        public static List<EdgeAm> GetParentlessEdges(this ICollection<EdgeAm> edges, ICollection<NodeAm> nodes)
        {
            var parentlessEdges = new List<EdgeAm>();

            if (edges == null || !edges.Any())
                return parentlessEdges;

            foreach (var edge in edges)
            {
                var fromNode = nodes.FirstOrDefault(x => x.Id == edge.FromNodeId);
                if (fromNode != null)
                    continue;

                parentlessEdges.Add(edge);
            }

            return parentlessEdges;
        }

        public static List<EdgeAm> GetNotConnectedEdges(this ICollection<EdgeAm> edges, ICollection<NodeAm> nodes)
        {
            var notConnectedEdges = new List<EdgeAm>();

            if (edges == null || !edges.Any())
                return notConnectedEdges;

            foreach (var edge in edges)
            {
                var fromNode = nodes.FirstOrDefault(x => x.Id == edge.FromNodeId);
                if (fromNode == null)
                    notConnectedEdges.Add(edge);

                var toNode = nodes.FirstOrDefault(x => x.Id == edge.ToNodeId);
                if (toNode == null)
                    notConnectedEdges.Add(edge);
            }

            return notConnectedEdges;
        }
    }
}