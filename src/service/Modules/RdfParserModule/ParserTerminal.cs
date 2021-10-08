using Mb.Models.Enums;

namespace RdfParserModule
{
    public class ParserTerminal
    {
        public string Id { get; set; }
        public string NormalId { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string SemanticReference { get; set; }
        public string NodeId { get; set; }
        public string FromConnectorId { get; set; }
        public string ToConnectorId { get; set; }
        public RelationType Relation { get; set; }
        public string Label { get; set; }
        public string Aspect { get; set; }
        public override string ToString()
        {
            return Label ?? Id;
        }
    }
}