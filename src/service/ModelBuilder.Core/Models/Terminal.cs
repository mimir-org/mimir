using Mb.Core.Enums;

namespace Mb.Core.Models
{
    public class Terminal
    {
        public TerminalCategory Category { get; set; }
        public TerminalSubCategory SubCategory { get; set; }
        public TerminalType Type { get; set; }
    }
}
