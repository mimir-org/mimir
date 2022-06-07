using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Client;
using Mb.Models.Const;
using Mb.Models.Data;
using Mb.Models.Data.Hubs;
using Mb.Models.Enums;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace Mb.Data.Repositories
{
    public class WebSocketRepository : IWebSocketRepository
    {
        private readonly IHubContext<ModelBuilderHub> _hubContext;

        public WebSocketRepository(IHubContext<ModelBuilderHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task SendNodeData(Node node, string projectId, WorkerStatus workerStatus)
        {
            var data = JsonConvert.SerializeObject(node, DefaultSettings.SerializerSettings);
            await _hubContext.Clients.Group(projectId).SendAsync(WebSocketReceiver.ReceiveNodeData, workerStatus, data);
        }

        public async Task SendEdgeData(Edge edge, string projectId, WorkerStatus workerStatus)
        {
            var data = JsonConvert.SerializeObject(edge, DefaultSettings.SerializerSettings);
            await _hubContext.Clients.Group(projectId).SendAsync(WebSocketReceiver.ReceiveEdgeData, workerStatus, data);
        }

        public async Task SendLockData(List<LockCm> lockCms, string projectId, WorkerStatus workerStatus)
        {
            var data = JsonConvert.SerializeObject(lockCms, DefaultSettings.SerializerSettings);
            await _hubContext.Clients.Group(projectId).SendAsync(WebSocketReceiver.ReceiveLockData, workerStatus, data);
        }
    }
}