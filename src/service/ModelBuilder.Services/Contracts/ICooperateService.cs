using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;

namespace Mb.Services.Contracts
{
    public interface ICooperateService
    {
        Task SendNodeUpdates(IReadOnlyCollection<(Node node, WorkerStatus workerStatus)> nodeMap, string projectId);
        Task SendEdgeUpdates(IReadOnlyCollection<(Edge edge, WorkerStatus workerStatus)> edgeMap, string projectId);
        Task SendLockUnlockAttributeUpdates(IReadOnlyCollection<(LockUnlockAttributeAm lockUnlockAttributeAm, WorkerStatus workerStatus)> map);
        Task SendLockUnlockNodeUpdates(IReadOnlyCollection<(LockUnlockNodeAm lockUnlockNodeAm, WorkerStatus workerStatus)> map, string projectId);
        Task SendLockUnlockEdgeUpdates(IReadOnlyCollection<(LockUnlockEdgeAm lockUnlockEdgeAm, WorkerStatus workerStatus)> map, string projectId);
    }
}