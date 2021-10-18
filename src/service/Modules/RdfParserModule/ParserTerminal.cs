using Mb.Models.Enums;

namespace RdfParserModule
{
    public class ParserConnector
    {
        public string Id { get; set; }
        public string NormalId { get; set; }
        public string Name { get; set; }
        public ConnectorType Type { get; set; }
        public string SemanticReference { get; set; }

        public bool Visible()
        {
            return true;
        }
        public string NodeId { get; set; }


        // For ParserEdge
        public string FromConnectorId { get; set; }
        public string ToConnectorId { get; set; }
        public string NormalFromConnectorId { get; set; }
        public string NormalToConnectorId { get; set; }
        

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