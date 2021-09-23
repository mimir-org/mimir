using System.Collections.Generic;
using System.Threading.Tasks;
using EventHubModule.Contracts;
using Mb.Models.Modules;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EventHubModule
{
    public class EventHubModule : IModelBuilderSyncService
    {
        private IConfiguration _configuration; 
        private ServiceProvider _provider; 

        public string GetName()
        {
            return "eventhub";
        }

        public void CreateModule(IServiceCollection services, IConfiguration configuration, ServiceProvider provider)
        {
            _configuration = configuration;
            _provider = provider;
        }

        public async Task SendData<T>(T data) where T : class
        {
            var datalist = new List<T> {data};
            var eventHubProducerService = _provider.GetService<IEventHubProducerService>();
            
            if (eventHubProducerService == null)
                return;

            var eventHubSection = _configuration.GetSection(nameof(EventHubConfiguration));
            var eventHubConfiguration = new EventHubConfiguration();
            eventHubSection.Bind(eventHubConfiguration);

            eventHubProducerService.EventHubConfiguration = eventHubConfiguration;
            await eventHubProducerService.SendDataAsync(datalist);
        }
    }
}
