using System.Collections.Generic;

namespace Mb.Models.Data
{
    public class SimpleType
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string SemanticReference { get; set; }
        public virtual ICollection<AttributeType> AttributeTypes { get; set; }
    }
}
