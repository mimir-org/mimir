using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Client;
using Mb.Models.Data;
using Mb.Models.Enums;

namespace Mb.Data.Contracts;

public interface IWebSocketRepository
{
    Task SendProjectVersionData(ProjectVersionCm version, WorkerStatus workerStatus);
    Task SendBlockData(BlockDm block, string projectId, WorkerStatus workerStatus);
    Task SendConnectionData(ConnectionDm connection, string projectId, WorkerStatus workerStatus);
    Task SendLockData(List<LockCm> lockCms, string projectId, WorkerStatus workerStatus);
    Task SendRefreshLibData();
}