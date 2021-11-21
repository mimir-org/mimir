using System.Collections.Generic;

namespace Mb.Models.Workers
{
    public class ProjectWorker
    {
        public string ProjectId { get; set; }
        public List<NodeWorker> Nodes { get; set; }
        public List<EdgeWorker> Edges { get; set; }

        public ProjectWorker()
        {
            Nodes = new List<NodeWorker>();
            Edges = new List<EdgeWorker>();
        }
    }
}
