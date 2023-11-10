using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Client;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Models.Records;

namespace Mb.Services.Contracts;

public interface ICooperateService
{
    Task SendDataUpdates(ProjectEditData editData, Guid projectId, string projectVersion);
    Task SendBlockUpdates(IReadOnlyCollection<(Block block, WorkerStatus workerStatus)> nodeMap, Guid projectId);
    Task SendConnectionUpdates(IReadOnlyCollection<(Connection connection, WorkerStatus workerStatus)> connectionMap, Guid projectId);
    Task SendLockUpdates(List<LockCm> lockCms, WorkerStatus workerStatus, Guid projectId);
    Task SendRefreshLibData();
}