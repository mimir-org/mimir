using Mb.Models.Data;
using Mb.Models.Enums;

namespace Mb.Models.Workers
{
    public class EdgeWorker
    {
        public WorkerStatus WorkerStatus { get; set; }
        public Edge Edge { get; set; }
        public bool IsSubProjectEdge { get; set; }
    }
}
