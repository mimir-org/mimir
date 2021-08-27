using Mb.Models.Enums;

namespace Mb.Models.Application
{
    public class LibraryInterfaceItem
    {
        public string Id { get; set; }
        public string Rds { get; set; }
        public string Category { get; set; }
        public Aspect Aspect { get; set; }
        public string Name { get; set; }
        public string SemanticReference { get; set; }
        public string TerminalId { get; set; }
        public string TerminalTypeId { get; set; }
        public ObjectType LibraryType => ObjectType.Interface;
    }
}
