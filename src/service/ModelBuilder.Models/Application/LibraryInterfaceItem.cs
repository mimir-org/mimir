using Mb.Models.Enums;

namespace Mb.Models.Application
{
    public class LibraryInterfaceItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public Status Status { get; set; }
        public string SemanticReference { get; set; }
        public string TerminalId { get; set; }
        public string TerminalTypeId { get; set; }
    }
}
