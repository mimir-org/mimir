namespace RdfParserModule
{
    public class ParserTerminal
    {
        public string Id { get; set; }
        public string Relation { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string SemanticReference { get; set; }
        public string NodeId { get; set; }
        public string ConnectedToId { get; set; }
        public string Label { get; set; }

        public override string ToString()
        {
            return (Label is null) ? Id : Label;
        }
    }
}