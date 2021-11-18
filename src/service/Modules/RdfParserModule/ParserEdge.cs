namespace RdfParserModule
{
    public class ParserEdge
    {
        public string Id { get; set; }
        public string Domain { get; set; }
        public string FromConnectorId { get; set; }
        public string ToConnectorId { get; set; }
        public string FromNodeId { get; set; }
        public string ToNodeId { get; set; }
        public string MasterProjectIri { get; set; }
        public ParserNode Transport { get; set; }
        public ParserNode Interface { get; set; }
        public ParserConnector InputTerminal { get; set; }
        public ParserConnector OutputTerminal { get; set; }
        public string InputTerminalIri { get; set; }
        public string OutputTerminalIri { get; set; }
    }
}
