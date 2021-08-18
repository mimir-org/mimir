using System.Collections.Generic;
using Mb.Models.Data;
using Mb.Models.Enums;

namespace Mb.Models.Application
{
    public class LibraryTransportItem
    {
        public string Id { get; set; }
        public string Rds { get; set; }
        public string Category { get; set; }
        public Aspect Aspect { get; set; }
        public string Name { get; set; }
        public Status Status { get; set; }
        public string SemanticReference { get; set; }
        public string TerminalId { get; set; }
        public string TerminalTypeId { get; set; }
        public ICollection<Attribute> Attributes { get; set; }
        public ObjectType LibraryType => ObjectType.Transport;
    }
}
