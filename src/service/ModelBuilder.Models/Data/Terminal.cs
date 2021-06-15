using System.Collections.Generic;
using Mb.Models.Data.Enums;

namespace Mb.Models.Data
{
    public class Terminal : Connector
    {
        public string Color { get; set; }
        public string TerminalCategoryId { get; set; }
        public TerminalCategory TerminalCategory { get; set; }

        public virtual ICollection<Attribute> Attributes { get; set; }
    }
}
