using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RdfParserModule
{
    public class ParserEdge
    {

        public ParserNode From;
        public ParserNode To;
        public string Relation;

        public ParserEdge(ParserNode fromNode, ParserNode toNode, string relation = "partOf")
        {
            From = fromNode;
            To = toNode;
            Relation = relation;
        }

    }
}
