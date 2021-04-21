using Mb.Core.Enums;

namespace Mb.Core.Models
{
    public class Terminal
    {
        public TerminalType TerminalType { get; set; }
        public TerminalCategory TerminalCategory { get; set; }
        public TerminalDirection TerminalDirection { get; set; }
    }
}
