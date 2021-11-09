﻿using Mb.Models.Enums;

namespace RdfParserModule
{
    public class ParserConnector
    {
        public string Id { get; set; }
        public string Iri { get; set; }
        public string Name { get; set; }
        public ConnectorType Type { get; set; }
        public string SemanticReference { get; set; }

        public bool Visible => true;
        public string NodeId { get; set; }
        public ParserNode Node { get; set; }


        // For ParserEdge
        public string FromConnectorId { get; set; }
        public string ToConnectorId { get; set; }
        public string FromConnectorIri { get; set; }
        public string ToConnectorIri { get; set; }
        

        public string Label { get; set; }
        public override string ToString()
        {
            return Label ?? Id;
        }
    }

    public class ParserTerminal : ParserConnector
    {
        public string TerminalCategoryId { get; set; }
        public string TerminalTypeId { get; set; }

    }

    public class ParserRelation : ParserConnector
    {
        public RelationType Relation { get; set; }
    }
}