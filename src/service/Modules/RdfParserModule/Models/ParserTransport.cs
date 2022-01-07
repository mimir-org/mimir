namespace RdfParserModule.Models
{
    public class ParserTransport : ParserNode
    {
        public ParserConnector InputTerminal { get; set; }
        public ParserConnector OutputTerminal { get; set; }
        public string InputTerminalIri { get; set; }
        public string OutputTerminalIri { get; set; }
    }
}
