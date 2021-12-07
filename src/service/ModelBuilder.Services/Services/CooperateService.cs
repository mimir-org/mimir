using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Data.Contracts;
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

        public Task SendAttributeUpdates(IReadOnlyCollection<(Attribute attribute, WorkerStatus workerStatus)> attributeMap, string domain)
        {
            foreach (var tuple in attributeMap)
            {
                _webSocketRepository.SendAttributeData(tuple.attribute, domain, tuple.workerStatus);
            }

            return Task.CompletedTask;
        }

        #endregion
    }
}
