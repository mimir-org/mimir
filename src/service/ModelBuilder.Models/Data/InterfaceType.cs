namespace Mb.Models.Data
{
    public class InterfaceType : LibraryType
    {
        public string TerminalTypeId { get; set; }
        public TerminalType TerminalType { get; set; }
    }
}
