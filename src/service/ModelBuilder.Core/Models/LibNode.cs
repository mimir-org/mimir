using System.Collections.Generic;
using Mb.Core.Enums;

namespace Mb.Core.Models
{
    public class LibNode
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Label { get; set; }
        public string Icon { get; set; }
        public NodeType Type { get; set; }
        public ICollection<Connector> Connectors { get; set; }
        public string Category { get; set; }
        public ICollection<Attribute> Attributes { get; set; }
    }
}
