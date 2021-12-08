using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;

namespace Mb.Data.Contracts
{
    public interface IWebSocketRepository
    {
        Task SendNodeData(Node node, string projectId, WorkerStatus workerStatus);
        Task SendEdgeData(Edge edge, string projectId, WorkerStatus workerStatus);
        
        Task SendLockUnlockAttributeData(LockUnlockAttributeAm am, WorkerStatus workerStatus);
        Task SendLockUnlockNodeData(LockUnlockNodeAm am, string projectId, WorkerStatus workerStatus);
        Task SendLockUnlockEdgeData(LockUnlockEdgeAm am, string projectId, WorkerStatus workerStatus);
    }
}