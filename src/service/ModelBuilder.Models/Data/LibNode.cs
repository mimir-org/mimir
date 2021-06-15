using System.Collections.Generic;
using Mb.Models.Enums;

namespace Mb.Models.Data
{
    public class LibNode
    {
        public string Id { get; set; }
        public string Rds { get; set; }
        public string Name { get; set; }
        public string Label { get; set; }
        public NodeType Type { get; set; }
        public ICollection<Connector> Connectors { get; set; }
        public string Category { get; set; }
        public ICollection<Attribute> Attributes { get; set; }
        public string Version { get; set; }
        public string SemanticReference { get; set; }
    }
}
