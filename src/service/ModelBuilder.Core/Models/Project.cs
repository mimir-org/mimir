using System;
using System.Collections.Generic;

namespace Mb.Core.Models
{
    public class Project
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; }
        public string Description { get; set; }
        public virtual ICollection<Node> Nodes { get; set; }
        public virtual ICollection<Edge> Edges { get; set; }
    }
}
