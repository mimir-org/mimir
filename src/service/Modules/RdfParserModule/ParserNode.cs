using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RdfParserModule
{
    public class ParserNode
    {
        public string Id;
        private readonly ICollection<ParserEdge> _edges;
        private readonly ICollection<ParserNode> _connectedNodes;

        public ParserNode(string nodeId)
        {
            Id = nodeId;
            _edges = new Collection<ParserEdge>();
            _connectedNodes = new Collection<ParserNode>();
        }

        public void AddConnection(ParserNode node, string relation)
        {
            var edge = new ParserEdge(this, node, relation);
            _connectedNodes.Add(node);
            _edges.Add(edge);
        }

        public ParserEdge GetConnection(string id)
        {
            foreach (var edge in _edges)
            {
                if (edge.To.Id == id)
                {
                    return edge;
                }
            }
            throw new Exception("Found no edge with connection to a node with id " + id);
        }

        private ParserNode GetConnectedNode(string id)
        {
            foreach (var node in _connectedNodes)
            {
                if (node.Id == id)
                {
                    return node;
                }
            }

            throw new Exception("Found no connection to a node with id " + id);
        }

        public void AddEdge(ParserEdge edge)
        {
            _edges.Add(edge);
        }

        public ICollection<ParserEdge> GetEdges()
        {
            return _edges;
        }

    }
}
