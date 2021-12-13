﻿using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;

namespace Mb.Data.Contracts
{
    public interface IWebSocketRepository
    {
        Task SendNodeData(Node node, string projectId, WorkerStatus workerStatus);
        Task SendEdgeData(Edge edge, string projectId, WorkerStatus workerStatus);
        Task SendLockAttributeData(LockAttributeAm am, string projectId, WorkerStatus workerStatus);
        Task SendLockNodeData(LockNodeAm am, string projectId, WorkerStatus workerStatus);
        Task SendLockEdgeData(LockEdgeAm am, string projectId, WorkerStatus workerStatus);
    }
}