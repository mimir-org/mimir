using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Enums;
using Mb.Models.Records;

namespace Mb.Services.Contracts
{
    public interface ICooperateService
    {
        Task SendDataUpdates(ProjectEditData editData, string projectId);
        Task SendLockUpdates(List<LockCm> lockCms, WorkerStatus workerStatus);
    }
}