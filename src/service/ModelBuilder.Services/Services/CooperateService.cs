using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Services.Contracts;

namespace Mb.Services.Services
{
    public class CooperateService : ICooperateService
    {

        private readonly IWebSocketRepository _webSocketRepository;

        public CooperateService(IWebSocketRepository webSocketRepository)
        {
            _webSocketRepository = webSocketRepository;
        }

        #region Public methods

        public Task SendNodeUpdates(IReadOnlyCollection<(Node node, WorkerStatus workerStatus)> nodeMap, string projectId)
        {
            foreach (var tuple in nodeMap)
            {
                _webSocketRepository.SendNodeData(tuple.node, projectId, tuple.workerStatus);
            }

            return Task.CompletedTask;
        }

        public Task SendEdgeUpdates(IReadOnlyCollection<(Edge edge, WorkerStatus workerStatus)> edgeMap, string projectId)
        {
            foreach (var tuple in edgeMap)
            {
                _webSocketRepository.SendEdgeData(tuple.edge, projectId, tuple.workerStatus);
            }

            return Task.CompletedTask;
        }

        public Task SendLockUnlockAttributeUpdates(IReadOnlyCollection<(LockUnlockAttributeAm lockUnlockAttributeAm, WorkerStatus workerStatus)> map)
        {
            foreach (var tuple in map)
            {
                _webSocketRepository.SendLockUnlockAttributeData(tuple.lockUnlockAttributeAm, tuple.workerStatus);
            }

            return Task.CompletedTask;
        }

        public Task SendLockUnlockNodeUpdates(IReadOnlyCollection<(LockUnlockNodeAm lockUnlockNodeAm, WorkerStatus workerStatus)> map, string projectId)
        {
            foreach (var tuple in map)
            {
                _webSocketRepository.SendLockUnlockNodeData(tuple.lockUnlockNodeAm, projectId, tuple.workerStatus);
            }

            return Task.CompletedTask;
        }

        public Task SendLockUnlockEdgeUpdates(IReadOnlyCollection<(LockUnlockEdgeAm lockUnlockEdgeAm, WorkerStatus workerStatus)> map, string projectId)
        {
            foreach (var tuple in map)
            {
                _webSocketRepository.SendLockUnlockEdgeData(tuple.lockUnlockEdgeAm, projectId, tuple.workerStatus);
            }

            return Task.CompletedTask;
        }

        #endregion Public methods
    }
}