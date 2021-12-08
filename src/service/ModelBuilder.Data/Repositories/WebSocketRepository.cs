﻿using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Application;
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

        public async Task SendLockUnlockAttributeData(LockUnlockAttributeAm am, WorkerStatus workerStatus)
        {
            var data = JsonConvert.SerializeObject(am, DefaultSettings.SerializerSettings);
            await _hubContext.Clients.All.SendAsync(WebSocketReceiver.ReceiveLockUnlockAttributeData, workerStatus, data);
        }

        public async Task SendLockUnlockNodeData(LockUnlockNodeAm am, string projectId, WorkerStatus workerStatus)
        {
            var data = JsonConvert.SerializeObject(am, DefaultSettings.SerializerSettings);
            await _hubContext.Clients.Group(projectId).SendAsync(WebSocketReceiver.ReceiveLockUnlockNodeData, workerStatus, data);
        }

        public async Task SendLockUnlockEdgeData(LockUnlockEdgeAm am, string projectId, WorkerStatus workerStatus)
        {
            var data = JsonConvert.SerializeObject(am, DefaultSettings.SerializerSettings);
            await _hubContext.Clients.Group(projectId).SendAsync(WebSocketReceiver.ReceiveLockUnlockEdgeData, workerStatus, data);
        }
    }
}