using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Models.Records;

namespace Mb.Services.Contracts
{
    public interface ICooperateService
    {
        Task SendDataUpdates(ProjectEditData editData, string projectId);
        Task SendNodeUpdates(IReadOnlyCollection<(Node node, WorkerStatus workerStatus)> nodeMap, string projectId);
        Task SendEdgeUpdates(IReadOnlyCollection<(Edge edge, WorkerStatus workerStatus)> edgeMap, string projectId);
        Task SendLockAttributeUpdates(List<LockAttributeAm> lockAttributeAms, WorkerStatus workerStatus, string projectId);
        Task SendLockNodeUpdates(List<LockNodeAm> lockNodeAms, WorkerStatus workerStatus, string projectId);
        Task SendLockEdgeUpdates(List<LockEdgeAm> lockEdgeAms, WorkerStatus workerStatus, string projectId);
    }
}