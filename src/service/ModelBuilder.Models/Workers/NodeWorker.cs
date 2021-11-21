using Mb.Models.Data;
using Mb.Models.Enums;

namespace Mb.Models.Workers
{
    public class NodeWorker
    {
        public WorkerStatus WorkerStatus { get; set; }
        public Node Node { get; set; }
        public bool IsSubProjectNode { get; set; }
    }
}
