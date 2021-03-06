using System.Collections.Generic;
using Newtonsoft.Json;

namespace Mb.Models.Data.TypeEditor
{
    public class SimpleType
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string SemanticReference { get; set; }
        public virtual ICollection<AttributeType> AttributeTypes { get; set; }

        [JsonIgnore]
        public ICollection<NodeType> NodeTypes { get; set; }
    }
}