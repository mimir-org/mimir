using System.Collections.Generic;
using Mb.Models.Enums;

namespace Mb.Models.Data
{
    public class Terminal
    {
        public string Id { get; set; } 
        public TerminalType TerminalType { get; set; }
        public ConnectorType ConnectorType { get; set; }
        public string SemanticReference { get; set; }
        public ICollection<AttributeType> Attributes { get; set; }
    }
}
