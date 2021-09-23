using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Attributes;

namespace EventHubModule.Contracts
{
    [Singleton]
    public interface IEventHubProducerService
    {
        EventHubConfiguration EventHubConfiguration { get; set; }
        Task SendDataAsync<T>(List<T> data);
    }
}
