using System.Linq;
using System.Threading.Tasks;
using Mb.Models.Const;
using Mb.Models.Enums;
using Mb.Models.Workers;
using Mb.Services.Contracts;
using Mb.Services.Hubs;
using Microsoft.AspNetCore.SignalR;
using EventLog = Mb.Models.Data.EventLog;

namespace Mb.Services.Services
{
    public class CooperateService : ICooperateService
    {
        private readonly IEventLogService _eventLogService;
        private readonly IHubContext<ModelBuilderHub> _hubContext;

        public CooperateService(IEventLogService eventLogService, IHubContext<ModelBuilderHub> hubContext)
        {
            _eventLogService = eventLogService;
            _hubContext = hubContext;
        }

        public async Task SendUpdates(ProjectWorker worker)
        {
            var logs = await _eventLogService.CreateLogs(worker);
            var eventLogs = logs as EventLog[] ?? logs.ToArray();

            foreach (var log in eventLogs.Where(x => x.EventLogDataType == EventLogDataType.Node))
                await _hubContext.Clients.Group(log.ProjectId).SendAsync(WebSocketReceiver.ReceiveNodeData, log.WorkerStatus, log.Data);

            foreach (var log in eventLogs.Where(x => x.EventLogDataType == EventLogDataType.Edge))
                await _hubContext.Clients.Group(log.ProjectId).SendAsync(WebSocketReceiver.ReceiveEdgeData, log.WorkerStatus, log.Data);

            await _eventLogService.DeleteDuplicates();
        }
    }
}
