﻿using System.Collections.Generic;
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

        public Task SendLockAttributeUpdates(IReadOnlyCollection<(LockAttributeAm lockAttributeAm, WorkerStatus workerStatus)> map, string projectId)
        {
            foreach (var tuple in map)
            {
                _webSocketRepository.SendLockAttributeData(tuple.lockAttributeAm, projectId, tuple.workerStatus);
            }

            return Task.CompletedTask;
        }

        public Task SendLockNodeUpdates(IReadOnlyCollection<(LockNodeAm lockNodeAm, WorkerStatus workerStatus)> map, string projectId)
        {
            foreach (var tuple in map)
            {
                _webSocketRepository.SendLockNodeData(tuple.lockNodeAm, projectId, tuple.workerStatus);
            }

            return Task.CompletedTask;
        }

        public Task SendLockEdgeUpdates(IReadOnlyCollection<(LockEdgeAm lockEdgeAm, WorkerStatus workerStatus)> map, string projectId)
        {
            foreach (var tuple in map)
            {
                _webSocketRepository.SendLockEdgeData(tuple.lockEdgeAm, projectId, tuple.workerStatus);
            }

            return Task.CompletedTask;
        }

        #endregion Public methods
    }
}