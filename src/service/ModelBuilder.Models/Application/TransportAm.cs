using System.Collections.Generic;

namespace Mb.Models.Application
{
    public class TransportAm
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string SemanticReference { get; set; }
        public string TerminalId { get; set; }
        public ICollection<AttributeAm> Attributes { get; set; }
    }
}
