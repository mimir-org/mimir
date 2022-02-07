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
        Task SendLockAttributeUpdates(IReadOnlyCollection<(LockAttributeAm lockAttributeAm, WorkerStatus workerStatus)> map, string projectId);
        Task SendLockNodeUpdates(IReadOnlyCollection<(LockNodeAm lockNodeAm, WorkerStatus workerStatus)> map, string projectId);
        Task SendLockEdgeUpdates(IReadOnlyCollection<(LockEdgeAm lockEdgeAm, WorkerStatus workerStatus)> map, string projectId);
    }
}