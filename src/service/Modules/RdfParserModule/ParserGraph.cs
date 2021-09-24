using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RdfParserModule
{
    public class ParserGraph
    {
        private readonly ICollection<ParserNode> _nodes;
        private readonly ParserNode _root;

        public ParserGraph(ParserNode root)
        {
            _nodes = new Collection<ParserNode>();
            _root = root;
        }

        public void AddNode(ParserNode node)
        {
            _nodes.Add(node);
        }

        public ParserNode GetNode(string id)
        {
            foreach (var node in _nodes)
            {
                if (node.Id == id)
                {
                    return node;
                }
            }

            throw new Exception("No node with that id found");
        }
    }
}
