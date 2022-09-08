using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Client;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Data.Contracts
{
    public interface IWebSocketRepository
    {
        Task SendNodeData(Node node, string projectId, WorkerStatus workerStatus);
        Task SendEdgeData(Edge edge, string projectId, WorkerStatus workerStatus);
        Task SendLockData(List<LockCm> lockCms, string projectId, WorkerStatus workerStatus);

        Task SendNodeLibData(List<NodeLibCm> nodes);
    }
}