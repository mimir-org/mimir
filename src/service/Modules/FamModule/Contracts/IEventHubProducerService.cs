using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Modules;

namespace EventHubModule.Contracts
{
    [Singleton]
    public interface IEventHubProducerService
    {
        Task SendDataAsync<T>(List<T> data) where T : class;
    }
}
