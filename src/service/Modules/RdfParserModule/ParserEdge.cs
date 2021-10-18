namespace RdfParserModule
{
    public class ParserEdge
    {
        public string Id { get; set; }
        public string NormalId { get; set; }
        public string FromConnectorId { get; set; }
        public string ToConnectorId { get; set; }
        public string NormalFromConnectorId { get; set; }
        public string NormalToConnectorId { get; set; }
        public string FromNodeId { get; set; }
        public string ToNodeId { get; set; }
        public string MasterProjectId { get; set; }
        public ParserNode Transport { get; set; }
        public ParserNode Interface { get; set; }
        public ParserTerminal InputTerminal { get; set; }
        public ParserTerminal OutputTerminal { get; set; }
        public string InputTerminalId { get; set; }
        public string OutputTerminalId { get; set; }
    }
}
