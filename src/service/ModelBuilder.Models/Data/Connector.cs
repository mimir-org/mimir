﻿using Mb.Models.Enums;

namespace Mb.Models.Data
{
    public class Connector
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public ConnectorType Type { get; set; }
        public TerminalCategory TerminalCategory { get; set; }
        public TerminalType TerminalType { get; set; }
        public RelationType RelationType { get; set; }

        public virtual string NodeId { get; set; }
        public virtual Node Node { get; set; }
    }
}