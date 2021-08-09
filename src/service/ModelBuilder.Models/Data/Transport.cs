using System.Collections.Generic;
using Newtonsoft.Json;

namespace Mb.Models.Data
{
    public class Transport
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string SemanticReference { get; set; }
        public string TerminalId { get; set; }
        public Terminal Terminal { get; set; }
        public ICollection<Attribute> Attributes { get; set; }

        [JsonIgnore]
        public ICollection<Edge> Edges { get; set; }
    }
}
