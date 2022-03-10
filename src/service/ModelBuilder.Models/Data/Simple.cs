using System.Collections.Generic;
using Newtonsoft.Json;

namespace Mb.Models.Data
{
    public class Simple
    {
        public string Id { get; set; }
        public string Iri { get; set; }
        public string Name { get; set; }

        public string Kind => nameof(Simple);
        public virtual ICollection<Attribute> Attributes { get; set; }
        public virtual string NodeId { get; set; }
        public virtual string NodeIri { get; set; }

        [JsonIgnore]
        public Node Node { get; set; }
    }
}