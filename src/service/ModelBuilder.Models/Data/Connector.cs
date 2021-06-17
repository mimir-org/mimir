using System;
using System.Collections.Generic;
using Mb.Models.Enums;
using Newtonsoft.Json;

namespace Mb.Models.Data
{
    [Serializable]
    public class Connector
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public ConnectorType Type { get; set; }
        public string SemanticReference { get; set; }

        public virtual string NodeId { get; set; }
        public virtual Node Node { get; set; }

        [JsonIgnore]
        public virtual ICollection<Edge> FromEdges { get; set; }

        [JsonIgnore]
        public virtual ICollection<Edge> ToEdges { get; set; }
    }
}
