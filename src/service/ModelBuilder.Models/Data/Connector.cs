using System;
using Mb.Models.Enums;

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
    }
}
