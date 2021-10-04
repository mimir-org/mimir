using System.Collections.Generic;
using Mb.Models.Data;

namespace Mb.Models.Application
{
    public class InterfaceAm
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string SemanticReference { get; set; }
        public ICollection<Attribute> Attributes { get; set; }
        public string InputTerminalId { get; set; }
        public TerminalAm InputTerminal { get; set; }
        public string OutputTerminalId { get; set; }
        public TerminalAm OutputTerminal { get; set; }
    }
}
