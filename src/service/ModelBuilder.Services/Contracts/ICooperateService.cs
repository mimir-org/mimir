using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Client;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Models.Records;

namespace Mb.Services.Contracts;

public interface ICooperateService
{
    Task SendDataUpdates(ProjectEditData editData, string projectId, string projectVersion);
    Task SendAspectObjectUpdates(IReadOnlyCollection<(AspectObjectDm aspectObject, WorkerStatus workerStatus)> nodeMap, string projectId);
    Task SendConnectionUpdates(IReadOnlyCollection<(ConnectionDm connection, WorkerStatus workerStatus)> connectionMap, string projectId);
    Task SendLockUpdates(List<LockCm> lockCms, WorkerStatus workerStatus, string projectId);
    Task SendRefreshLibData();
}