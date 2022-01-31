namespace RdfParserModule.Models
{
    public class ParserEdge
    {
        public string Id { get; set; }
        public string Domain { get; set; }
        public ParserConnector FromConnector { get; set; }
        public ParserConnector ToConnector { get; set; }
        public ParserNode FromNode { get; set; }
        public ParserNode ToNode { get; set; }
        public string MasterProjectIri { get; set; }
        public string MasterProjectId => MasterProjectIri;
        public ParserNode Transport { get; set; }
        public ParserNode Interface { get; set; }
        public ParserConnector InputTerminal { get; set; }
        public ParserConnector OutputTerminal { get; set; }
        public string InputTerminalIri { get; set; }
        public string OutputTerminalIri { get; set; }
    }
}