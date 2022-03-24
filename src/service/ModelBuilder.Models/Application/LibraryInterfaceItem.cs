using System;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;

namespace Mb.Models.Application
{
    public class LibraryInterfaceItem
    {
        public string Id { get; set; }
        public string Version { get; set; } = "1.0";
        public string RdsId { get; set; }
        public Aspect Aspect { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string StatusId { get; set; } = "4590637F39B6BA6F39C74293BE9138DF";
        public string SemanticReference { get; set; }
        public string TerminalId { get; set; }
        public string TerminalTypeId { get; set; }
        public ObjectType LibraryType => ObjectType.Interface;
        public Purpose Purpose { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? Updated { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
    }
}