using System.Collections.Generic;
using Newtonsoft.Json;

namespace Mb.Models.Data
{
    public class Interface
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string SemanticReference { get; set; }
        public string TerminalId { get; set; }
        public Terminal Terminal { get; set; }

        [JsonIgnore]
        public ICollection<Edge> Edges { get; set; }
    }
}
