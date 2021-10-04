using System.Collections.Generic;
using Newtonsoft.Json;

namespace Mb.Models.Data
{
    public class Transport
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string SemanticReference { get; set; }
        public ICollection<Attribute> Attributes { get; set; }
        public string InputTerminalId { get; set; }
        public virtual Terminal InputTerminal { get; set; }
        public string OutputTerminalId { get; set; }
        public virtual Terminal OutputTerminal { get; set; }

        [JsonIgnore]
        public ICollection<Edge> Edges { get; set; }
    }
}
