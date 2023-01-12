using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Client;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Models.Records;
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

        /// <summary>
        /// Send changed data to client
        /// </summary>
        /// <param name="editData"></param>
        /// <param name="projectId"></param>
        /// <param name="projectVersion"></param>
        /// <returns></returns>
        public async Task SendDataUpdates(ProjectEditData editData, string projectId, string projectVersion)
        {
            if (editData == null || string.IsNullOrWhiteSpace(projectId))
                return;

            // TODO: Find changed node and edge based on changed terminal, attribute, transport etc.
            var versionObj = new ProjectVersionCm
            {
                ProjectId = projectId,
                Version = projectVersion
            };
            await Task.WhenAll(
                Task.Run(() => SendProjectVersionUpdate(versionObj, WorkerStatus.Update)),
                Task.Run(() => SendNodeUpdates(editData.NodeUpdate, WorkerStatus.Update, projectId)),
                Task.Run(() => SendNodeUpdates(editData.NodeDelete, WorkerStatus.Delete, projectId)),
                Task.Run(() => SendNodeUpdates(editData.NodeCreate, WorkerStatus.Create, projectId)),
                Task.Run(() => SendEdgeUpdates(editData.EdgeUpdate, WorkerStatus.Update, projectId)),
                Task.Run(() => SendEdgeUpdates(editData.EdgeDelete, WorkerStatus.Delete, projectId)),
                Task.Run(() => SendEdgeUpdates(editData.EdgeCreate, WorkerStatus.Create, projectId))
            );
        }

        public async Task SendProjectVersionUpdate(ProjectVersionCm version, WorkerStatus workerStatus)
        {
            await _webSocketRepository.SendProjectVersionData(version, workerStatus);
        }

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

        public Task SendLockUpdates(List<LockCm> lockCms, WorkerStatus workerStatus, string projectId)
        {
            _webSocketRepository.SendLockData(lockCms, projectId, workerStatus);

            return Task.CompletedTask;
        }

        public async Task SendRefreshLibData()
        {
            await _webSocketRepository.SendRefreshLibData();
        }

        #endregion Public methods

        #region Private methods

        /// <summary>
        /// Send websocket events for changed nodes
        /// </summary>
        /// <param name="nodes"></param>
        /// <param name="workerStatus"></param>
        /// <param name="projectId"></param>
        /// <returns></returns>
        private Task SendNodeUpdates(List<Node> nodes, WorkerStatus workerStatus, string projectId)
        {
            if (nodes == null || string.IsNullOrWhiteSpace(projectId))
                return Task.CompletedTask;

            foreach (var node in nodes)
            {
                _webSocketRepository.SendNodeData(node, projectId, workerStatus);
            }

            return Task.CompletedTask;
        }

        /// <summary>
        /// Send websocket events for changed edges
        /// </summary>
        /// <param name="edges"></param>
        /// <param name="workerStatus"></param>
        /// <param name="projectId"></param>
        /// <returns></returns>
        private Task SendEdgeUpdates(List<Edge> edges, WorkerStatus workerStatus, string projectId)
        {
            if (edges == null || string.IsNullOrWhiteSpace(projectId))
                return Task.CompletedTask;

            foreach (var edge in edges)
            {
                _webSocketRepository.SendEdgeData(edge, projectId, workerStatus);
            }

            return Task.CompletedTask;
        }

        #endregion
    }
}