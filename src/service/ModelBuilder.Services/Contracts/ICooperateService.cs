using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Data;
using Mb.Models.Enums;

namespace Mb.Services.Contracts
{
    public interface ICooperateService
    {
        Task SendNodeUpdates(IReadOnlyCollection<(Node node, WorkerStatus workerStatus)> nodeMap, string projectId);
        Task SendEdgeUpdates(IReadOnlyCollection<(Edge edge, WorkerStatus workerStatus)> edgeMap, string projectId);
        Task SendAttributeUpdates(IReadOnlyCollection<(Attribute attribute, WorkerStatus workerStatus)> attributeMap, string domain);
    }
}
