using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Const;
using Mb.Models.Data;
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
        private readonly IProjectLinkRepository _projectLinkRepository;

        public CooperateService(IEventLogService eventLogService, IHubContext<ModelBuilderHub> hubContext, IProjectLinkRepository projectLinkRepository)
        {
            _eventLogService = eventLogService;
            _hubContext = hubContext;
            _projectLinkRepository = projectLinkRepository;
        }

        #region Public methods

        public async Task SendUpdates(ProjectWorker worker)
        {
            var projectNodes = worker.IsSubProject
                ? OtherProjectsUsedBySubProject(worker)
                : new List<IGrouping<string, ProjectNodeItem>>();


            var logs = await _eventLogService.CreateLogs(worker);
            var eventLogs = logs as EventLog[] ?? logs.ToArray();

            foreach (var log in eventLogs.Where(x => x.EventLogDataType == EventLogDataType.Node))
            {
                await _hubContext.Clients.Group(log.ProjectId).SendAsync(WebSocketReceiver.ReceiveNodeData, log.WorkerStatus, log.Data);
                foreach (var pn in projectNodes.Where(x => x.Key == log.DataId).SelectMany(x => x.ToList()))
                {
                    await _hubContext.Clients.Group(pn.ProjectId).SendAsync(WebSocketReceiver.ReceiveNodeData, log.WorkerStatus, log.Data);
                } 
            }

            foreach (var log in eventLogs.Where(x => x.EventLogDataType == EventLogDataType.Edge))
                await _hubContext.Clients.Group(log.ProjectId).SendAsync(WebSocketReceiver.ReceiveEdgeData, log.WorkerStatus, log.Data);

            await _eventLogService.DeleteDuplicates();
        }

        #endregion

        #region Private methods

        private ICollection<IGrouping<string, ProjectNodeItem>> OtherProjectsUsedBySubProject(ProjectWorker worker)
        {
            var projectNodes = _projectLinkRepository.GetProjectNodes().Where(x => x.ProjectId != worker.ProjectId).GroupBy(x => x.NodeId).ToList();
            return projectNodes;
        }

        #endregion
    }
}
