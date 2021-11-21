using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Const;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Services.Contracts;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace Mb.Services.Hubs
{
    public class ModelBuilderHub : Hub
    {
        private readonly ICommonRepository _commonRepository;
        private readonly IEventLogService _eventLogService;

        public ModelBuilderHub(ICommonRepository commonRepository, IEventLogService eventLogService)
        {
            _commonRepository = commonRepository;
            _eventLogService = eventLogService;
        }

        public async Task SendNodeData(WorkerStatus eventType, string node)
        {
            var obj = JsonConvert.DeserializeObject<Node>(node, DefaultSettings.SerializerSettings);
            if(obj == null)
                return;

            var fromId = obj.Id;
            var toId = _commonRepository.CreateUniqueId();

            node = node.Replace(fromId, toId);


            //if (eventType == WebSocketEvent.Create)
            //{
            //    var logs = _eventLogService.ReadLog(EventLogDataType.Node, eventType).ToList();
            //    if (logs.Any(x => x.DataId == node.Id))
            //        return;
            //}

            //var log = new EventLogAm(node) { WebSocketEvent = eventType };
            //await _eventLogService.CreateLog(log);

            

            //foreach (var connector in node.Connectors)
            //{
            //    if (connector is Relation)
            //        connector = connector as Relation;
            //}

            await Clients.Others.SendAsync(WebSocketReceiver.ReceiveNodeData, eventType, node);

            //switch (eventType)
            //{
            //    case WebSocketEvent.Create:
            //        await Clients.Others.SendAsync(WebSocketReceiver.ReceiveNodeData, eventType, node);
            //        break;
            //    default:
            //        break;
            //}

        }

        public async Task SendEdgeData(WorkerStatus eventType, string edge)
        {
            await Clients.Others.SendAsync(WebSocketReceiver.ReceiveEdgeData, eventType, edge);
        }

        public async Task JoinGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        public Task LeaveGroup(string groupName)
        {
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }
    }
}
