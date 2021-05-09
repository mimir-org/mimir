using System.Collections.Generic;
using Mb.Models.Enums;

namespace Mb.Models.Data
{
    public class Edge
    {
        public string Id { get; set; }
        public string FromConnector { get; set; }
        public string ToConnector { get; set; }
        public string FromNode { get; set; }
        public string ToNode { get; set; }
        public NodeType ParentType { get; set; }
        public NodeType TargetType { get; set; }
        public virtual ICollection<Project> Projects { get; set; }
    }
}
