using System;
using System.Collections.Generic;

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
        public Mb.Models.Enums.NodeType ParentType { get; set; }
        public Mb.Models.Enums.NodeType TargetType { get; set; }
        public virtual ICollection<Project> Projects { get; set; }
    }
}
