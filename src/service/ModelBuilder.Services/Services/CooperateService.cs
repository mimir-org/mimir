using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Application;
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
        /// <returns></returns>
        public async Task SendDataUpdates(ProjectEditData editData, string projectId)
        {
            if (editData == null || string.IsNullOrWhiteSpace(projectId))
                return;

            // TODO: Find changed node and edge based on changed terminal, attribute, transport etc.
            await Task.WhenAll(
                Task.Run(() => SendNodeUpdates(editData.NodeUpdate, WorkerStatus.Update, projectId)),
                Task.Run(() => SendNodeUpdates(editData.NodeDelete, WorkerStatus.Delete, projectId)),
                Task.Run(() => SendNodeUpdates(editData.NodeCreate, WorkerStatus.Create, projectId)),
                Task.Run(() => SendEdgeUpdates(editData.EdgeUpdate, WorkerStatus.Update, projectId)),
                Task.Run(() => SendEdgeUpdates(editData.EdgeDelete, WorkerStatus.Delete, projectId)),
                Task.Run(() => SendEdgeUpdates(editData.EdgeCreate, WorkerStatus.Create, projectId))
            );
        }

        public Task SendLockUpdates(List<LockCm> lockCms, WorkerStatus workerStatus)
        {
            _webSocketRepository.SendLockData(lockCms, workerStatus);

            return Task.CompletedTask;
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