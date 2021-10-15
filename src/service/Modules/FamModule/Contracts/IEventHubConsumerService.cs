using System;
using System.Threading;
using System.Threading.Tasks;
using Mb.Modules;

namespace EventHubModule.Contracts
{
    [Singleton]
    public interface IEventHubConsumerService<T>
    {
        event EventHandler<T> DataReceived;
        Task RunAsync(CancellationToken cancellationToken = new());
        Task StopAsync();
    }
}
