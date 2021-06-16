using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Data
{
    [Serializable]
    public class Edge
    {
        public string Id { get; set; }
        public string FromConnector { get; set; }
        public string ToConnector { get; set; }
        public string FromNode { get; set; }
        public string ToNode { get; set; }
        [Required]
        public string MasterProjectId { get; set; }
        public virtual Project MasterProject { get; set; }
        public bool IsTemplateEdge { get; set; }
        public Mb.Models.Enums.NodeType ParentType { get; set; }
        public Mb.Models.Enums.NodeType TargetType { get; set; }
        public virtual ICollection<Project> Projects { get; set; }
    }
}
