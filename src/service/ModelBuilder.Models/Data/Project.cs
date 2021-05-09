using System;
using System.Collections.Generic;

namespace Mb.Models.Data
{
    public class Project
    {
        public string Id { get; set; }
        public string ParentId { get; set; }
        public string Version { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ProjectOwner { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime Updated { get; set; }
        public virtual ICollection<Node> Nodes { get; set; }
        public virtual ICollection<Edge> Edges { get; set; }

        public bool IsSubProject => !string.IsNullOrEmpty(ParentId);
    }
}
