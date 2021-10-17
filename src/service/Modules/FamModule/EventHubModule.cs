#nullable enable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using EventHubModule.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Application;
using Mb.Models.Enums;
using Mb.Models.Exceptions;
using Mb.Services.Contracts;
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
            var moduleService = _provider?.GetService<IModuleService>();
            var projectService = _provider?.GetService<IProjectService>();
            
            if (moduleService == null)
                throw new ModelBuilderModuleException("Can't process data. ModuleService is null in EventHubModule.");

            if (projectService == null)
                throw new ModelBuilderModuleException("Can't process data. ProjectService is null in EventHubModule.");

            var parserModule = moduleService.Modules.FirstOrDefault(x => x.ModuleType == ModuleType.Parser && string.Equals(x.Name, e.Parser, StringComparison.CurrentCultureIgnoreCase));
            if(parserModule == null)
                throw new ModelBuilderModuleException($"Can't process data. Can't find a parser with name: {e.Parser} in EventHubModule.");

            if (!(parserModule.Instance is IModelBuilderParser parser))
                throw new ModelBuilderModuleException("Can't process data. Parser is not of type IModelBuilderParser in EventHubModule.");

            if(string.IsNullOrEmpty(e.Document))
                throw new ModelBuilderModuleException("Can't process data. Document is null or empty in EventModule.");

            var project = parser.DeserializeProjectAm(Encoding.ASCII.GetBytes(e.Document))?.Result;
            // TODO: Send project to project service for processing.
        }
    }
}
