using System.Collections.Generic;

namespace Mb.Models.Application
{
    public class SimpleAm
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string SemanticReference { get; set; }
        public virtual ICollection<AttributeAm> Attributes { get; set; }
        public virtual string NodeId { get; set; }
    }
}
