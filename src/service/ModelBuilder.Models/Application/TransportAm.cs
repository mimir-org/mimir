using System.Collections.Generic;

namespace Mb.Models.Application
{
    public class TransportAm
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string SemanticReference { get; set; }
        public string InputTerminalId { get; set; }
        public TerminalAm InputTerminal { get; set; }
        public string OutputTerminalId { get; set; }
        public TerminalAm OutputTerminal { get; set; }
        public ICollection<AttributeAm> Attributes { get; set; }
    }
}
