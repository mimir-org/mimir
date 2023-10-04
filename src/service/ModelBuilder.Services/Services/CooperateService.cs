using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Client;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Models.Records;
using Mb.Services.Contracts;

namespace Mb.Services.Services;

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

        // TODO: Find changed block and connection based on changed connectorTerminal, attribute etc.
        var versionObj = new ProjectVersionCm
        {
            ProjectId = projectId,
            Version = projectVersion
        };
        await Task.WhenAll(
            Task.Run(() => SendProjectVersionUpdate(versionObj, WorkerStatus.Update)),
            Task.Run(() => SendBlockUpdates(editData.BlockUpdate, WorkerStatus.Update, projectId)),
            Task.Run(() => SendBlockUpdates(editData.BlockDelete, WorkerStatus.Delete, projectId)),
            Task.Run(() => SendBlockUpdates(editData.BlockCreate, WorkerStatus.Create, projectId)),
            Task.Run(() => SendConnectionUpdates(editData.ConnectionUpdate, WorkerStatus.Update, projectId)),
            Task.Run(() => SendConnectionUpdates(editData.ConnectionDelete, WorkerStatus.Delete, projectId)),
            Task.Run(() => SendConnectionUpdates(editData.ConnectionCreate, WorkerStatus.Create, projectId))
        );
    }

    public async Task SendProjectVersionUpdate(ProjectVersionCm version, WorkerStatus workerStatus)
    {
        await _webSocketRepository.SendProjectVersionData(version, workerStatus);
    }

    public Task SendBlockUpdates(IReadOnlyCollection<(BlockDm block, WorkerStatus workerStatus)> blockMap, string projectId)
    {
        foreach (var tuple in blockMap)
        {
            _webSocketRepository.SendBlockData(tuple.block, projectId, tuple.workerStatus);
        }

        return Task.CompletedTask;
    }

    public Task SendConnectionUpdates(IReadOnlyCollection<(ConnectionDm connection, WorkerStatus workerStatus)> connectionMap, string projectId)
    {
        foreach (var tuple in connectionMap)
        {
            _webSocketRepository.SendConnectionData(tuple.connection, projectId, tuple.workerStatus);
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
    /// Send websocket events for changed blocks
    /// </summary>
    /// <param name="blocks"></param>
    /// <param name="workerStatus"></param>
    /// <param name="projectId"></param>
    /// <returns></returns>
    private Task SendBlockUpdates(List<BlockDm> blocks, WorkerStatus workerStatus, string projectId)
    {
        if (blocks == null || string.IsNullOrWhiteSpace(projectId))
            return Task.CompletedTask;

        foreach (var block in blocks)
        {
            _webSocketRepository.SendBlockData(block, projectId, workerStatus);
        }

        return Task.CompletedTask;
    }

    /// <summary>
    /// Send websocket events for changed connections
    /// </summary>
    /// <param name="connections"></param>
    /// <param name="workerStatus"></param>
    /// <param name="projectId"></param>
    /// <returns></returns>
    private Task SendConnectionUpdates(List<ConnectionDm> connections, WorkerStatus workerStatus, string projectId)
    {
        if (connections == null || string.IsNullOrWhiteSpace(projectId))
            return Task.CompletedTask;

        foreach (var connection in connections)
        {
            _webSocketRepository.SendConnectionData(connection, projectId, workerStatus);
        }

        return Task.CompletedTask;
    }

    #endregion
}