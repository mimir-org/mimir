using System.Collections.Generic;
using Mb.Models.Enums;

namespace Mb.Models.Application
{
    public class ConnectorAm
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public ConnectorType Type { get; set; }
        public string SemanticReference { get; set; }
        public bool Visible { get; set; }
        public virtual string NodeId { get; set; }
        
        // Relation
        public RelationType RelationType { get; set; }

        // Terminal
        public string Color { get; set; }
        public string TerminalCategoryId { get; set; }
        public virtual ICollection<AttributeAm> Attributes { get; set; }
    }
}
