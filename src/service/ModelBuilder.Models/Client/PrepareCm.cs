using System.Collections.Generic;
using Mb.Models.Data;

namespace Mb.Models.Client
{
    public class PrepareCm
    {
        public string SubProjectId { get; set; }
        public ICollection<Node> Nodes { get; set; } = new List<Node>();
        public ICollection<Edge> Edges { get; set; } = new List<Edge>();
    }
}