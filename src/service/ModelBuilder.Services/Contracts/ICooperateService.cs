using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Client;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Models.Records;

namespace Mb.Services.Contracts
{
    public interface ICooperateService
    {
        Task SendDataUpdates(ProjectEditData editData, string projectId, string projectVersion);
        Task SendNodeUpdates(IReadOnlyCollection<(Node node, WorkerStatus workerStatus)> nodeMap, string projectId);
        Task SendEdgeUpdates(IReadOnlyCollection<(Edge edge, WorkerStatus workerStatus)> edgeMap, string projectId);
        Task SendLockUpdates(List<LockCm> lockCms, WorkerStatus workerStatus, string projectId);
        Task SendRefreshLibData();
    }
}