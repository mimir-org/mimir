using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Client;
using Mb.Models.Data;
using Mb.Models.Enums;

namespace Mb.Data.Contracts;

public interface IWebSocketRepository
{
    Task SendProjectVersionData(ProjectVersionResponse version, WorkerStatus workerStatus);
    Task SendBlockData(Block block, Guid projectId, WorkerStatus workerStatus);
    Task SendConnectionData(Connection connection, Guid projectId, WorkerStatus workerStatus);
    Task SendLockData(List<LockResponse> lockCms, Guid projectId, WorkerStatus workerStatus);
    Task SendRefreshLibData();
}