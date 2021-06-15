using System.Collections.Generic;
using Mb.Models.Enums;

namespace Mb.Models.Data
{
    public class NodeType : LibraryType
    {
        public Aspect Aspect { get; set; }
        public ICollection<NodeTypeTerminalType> TerminalTypes { get; set; }
        public ICollection<AttributeType> AttributeTypes { get; set; }
    }
}
