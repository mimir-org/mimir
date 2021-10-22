using System.Threading.Tasks;
using Mb.Models.Data;
using Microsoft.AspNetCore.SignalR;

namespace Mb.Services.Hubs
{
    public class ModelBuilderHub : Hub
    {
        public async Task SendNodeData(Node node)
        {
            await Clients.Others.SendAsync("ReceiveNode", node);
        }
    }
}
