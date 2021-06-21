using System.Collections.Generic;
using Mb.Models.Enums;

namespace Mb.Models.Data
{
    public class LibraryNodeItem
    {
        public string Id { get; set; }
        public string Rds { get; set; }
        public string Category { get; set; }
        public string Name { get; set; }
        public Status Status { get; set; }
        public Aspect Aspect { get; set; }
        public ICollection<Connector> Connectors { get; set; }
        public ICollection<Attribute> Attributes { get; set; }
        public string SemanticReference { get; set; }
        public string StatusId { get; set; } = "4590637F39B6BA6F39C74293BE9138DF";
        public string Version { get; set; } = "1.0";
    }
}
