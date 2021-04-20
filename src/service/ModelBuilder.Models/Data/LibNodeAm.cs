using System.Collections.Generic;

namespace Mb.Models.Data
{
    public class LibNodeAm
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Label { get; set; }
        public string Icon { get; set; }
        public NodeTypeAm Type { get; set; }
        public ICollection<ConnectorAm> Connectors { get; set; }
        public string Category { get; set; }
        public ICollection<AttributeAm> Attributes { get; set; }
    }
}
