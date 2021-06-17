using System;
using System.Collections.Generic;

namespace Mb.Models.Data
{
    [Serializable]
    public class Edge
    {
        public string Id { get; set; }
        
        public string FromConnectorId { get; set; }
        public Connector FromConnector { get; set; }
        
        public string ToConnectorId { get; set; }
        public Connector ToConnector { get; set; }
        
        public string FromNodeId { get; set; }
        public Node FromNode { get; set; }
        
        public string ToNodeId { get; set; }
        public Node ToNode { get; set; }

        public virtual ICollection<Project> Projects { get; set; }
    }
}
