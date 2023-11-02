using System;
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

namespace Mb.Data.Repositories;

public class WebSocketRepository : IWebSocketRepository
{
    private readonly IHubContext<ModelBuilderHub> _hubContext;

    public WebSocketRepository(IHubContext<ModelBuilderHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task SendProjectVersionData(ProjectVersionCm version, WorkerStatus workerStatus)
    {
        var data = JsonConvert.SerializeObject(version, DefaultSettings.SerializerSettingsNoTypeNameHandling);
        await _hubContext.Clients.Group(version.ProjectId.ToString()).SendAsync(WebSocketReceiver.ReceiveProjectVersionData, workerStatus, data);
    }

    public async Task SendBlockData(BlockDm block, Guid projectId, WorkerStatus workerStatus)
    {
        var data = JsonConvert.SerializeObject(block, DefaultSettings.SerializerSettingsNoTypeNameHandling);
        await _hubContext.Clients.Group(projectId.ToString()).SendAsync(WebSocketReceiver.ReceiveBlockData, workerStatus, data);
    }

    public async Task SendConnectionData(ConnectionDm connection, Guid projectId, WorkerStatus workerStatus)
    {
        var data = JsonConvert.SerializeObject(connection, DefaultSettings.SerializerSettingsNoTypeNameHandling);
        await _hubContext.Clients.Group(projectId.ToString()).SendAsync(WebSocketReceiver.ReceiveConnectionData, workerStatus, data);
    }

    public async Task SendLockData(List<LockCm> lockCms, Guid projectId, WorkerStatus workerStatus)
    {
        var data = JsonConvert.SerializeObject(lockCms, DefaultSettings.SerializerSettingsNoTypeNameHandling);
        await _hubContext.Clients.Group(projectId.ToString()).SendAsync(WebSocketReceiver.ReceiveLockData, workerStatus, data);
    }

    public async Task SendRefreshLibData()
    {
        await _hubContext.Clients.All.SendAsync(WebSocketReceiver.ReceiveLibData);
    }
}