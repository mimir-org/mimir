#nullable enable
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using EventHubModule.Contracts;
using Mb.Models.Application;
using Mb.Modules;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
// ReSharper disable StringLiteralTypo

namespace EventHubModule
{
    public class EventHubModule : IModelBuilderSyncService
    {
        private ServiceProvider? _provider; 

        public string GetName()
        {
            return "eventhub";
        }

        public ICollection<Profile> GetProfiles()
        {
            return new List<Profile>();
        }

        public void CreateModule(IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = Environment.GetEnvironmentVariable("EventHubConfiguration_ConnectionString");
            var eventHubSection = configuration.GetSection(nameof(EventHubConfiguration));
            var eventHubConfiguration = new EventHubConfiguration();
            eventHubSection.Bind(eventHubConfiguration);

            if (!string.IsNullOrEmpty(connectionString))
                eventHubConfiguration.ConnectionString = connectionString.Trim();

            services.AddSingleton(Options.Create(eventHubConfiguration));
            _provider = services.BuildServiceProvider();
        }

        public async Task SendData<T>(T data) where T : class
        {
            var datalist = new List<T> {data};
            var eventHubProducerService = _provider?.GetService<IEventHubProducerService>();

            if (eventHubProducerService == null)
                return;

            await eventHubProducerService.SendDataAsync(datalist);
        }

        public async Task ReceiveData()
        {
            var consumer = _provider?.GetService<IEventHubConsumerService<ImfData>>();

            if (consumer != null)
            {
                consumer.DataReceived += ProcessData;
                await consumer.RunAsync();
            }
        }

        private void ProcessData(object? sender, ImfData e)
        {
            var data = string.Empty;
        }
    }
}
