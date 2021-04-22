using System;
using Mb.Core.Enums;

namespace Mb.Core.Models
{
    public class Connector
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; }
        public ConnectorType Type { get; set; }
        public TerminalCategory TerminalCategory { get; set; }
        public TerminalType TerminalType { get; set; }
        public RelationType RelationType { get; set; }

        public virtual string NodeId { get; set; }
        public virtual Node Node { get; set; }
    }
}
