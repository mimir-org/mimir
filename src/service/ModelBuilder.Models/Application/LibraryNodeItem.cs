using System.Collections.Generic;
using Mb.Models.Data;
using Mb.Models.Enums;

namespace Mb.Models.Application
{
    public class LibraryNodeItem
    {
        public string Id { get; set; }
        public string Rds { get; set; }
        public string Category { get; set; }
        public string Name { get; set; }
        public Aspect Aspect { get; set; }
        public ICollection<Connector> Connectors { get; set; }
        public ICollection<Attribute> Attributes { get; set; }
        public string SemanticReference { get; set; }
        public string Version { get; set; } = "1.0";
        public string SymbolId { get; set; }
        public ObjectType LibraryType => ObjectType.ObjectBlock;
    }
}
