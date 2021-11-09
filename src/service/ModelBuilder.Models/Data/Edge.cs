using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Extensions;

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

        public string TransportId { get; set; }
        public Transport Transport { get; set; }

        public string InterfaceId { get; set; }
        public Interface Interface { get; set; }

        [Required]
        public string MasterProjectId { get; set; }
        public virtual Project MasterProject { get; set; }
        public bool IsTemplateEdge { get; set; }
        public virtual ICollection<Project> Projects { get; set; }

        [Required]
        public string Domain { get; set; }

        [Required]
        public string Iri { get; set; }
    }
}
