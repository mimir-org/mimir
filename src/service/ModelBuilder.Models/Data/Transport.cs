using System.Collections.Generic;

namespace Mb.Models.Data
{
    public class Transport
    {
        public string Id { get; set; }
        public string TerminalId { get; set; }
        public Terminal Terminal { get; set; }
        public ICollection<Attribute> Attributes { get; set; }
    }
}
