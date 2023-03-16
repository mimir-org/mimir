#nullable enable
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using EventHubModule.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mimirorg.Common.Exceptions;
using Mb.Services.Contracts;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Mb.Models.Common;

// ReSharper disable StringLiteralTypo

namespace EventHubModule
{
    public class EventHubModule : IModelBuilderSyncService
    {
        private ServiceProvider? _provider;

        public ModuleDescription GetModuleDescription()
        {
            return new ModuleDescription
            {
                Id = new Guid("1D86BEE5-C7C4-4822-8BCD-964F9284E285").ToString(),
                Name = "Event Hub Module"
            };
        }

        public ICollection<Profile> GetProfiles()
        {
            return new List<Profile>();
        }

        public void CreateModule(IServiceCollection services, IConfiguration configuration)
        {
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory());

            builder.AddJsonFile("appsettings.json");
            builder.AddJsonFile($"appsettings.{environment}.json", true);
            builder.AddJsonFile("appsettings.local.json", true);
            builder.AddEnvironmentVariables();

            var config = builder.Build();

            var eventHubConfiguration = new EventHubConfiguration();
            var eventHubConfigSection = config.GetSection(nameof(EventHubConfiguration));
            eventHubConfigSection.Bind(eventHubConfiguration);

            UpdateFromEnvironmentVariables(eventHubConfiguration);
            services.AddSingleton(Options.Create(eventHubConfiguration));
            _provider = services.BuildServiceProvider();
        }

        public async Task SendData<T>(T data) where T : class
        {
            var datalist = new List<T> { data };
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

        private void UpdateFromEnvironmentVariables(EventHubConfiguration configuration)
        {
            // Producer
            var producerConnectionString =
                Environment.GetEnvironmentVariable("EventHubConfiguration_ProducerConnectionString");
            var producerEventHubName = Environment.GetEnvironmentVariable("EventHubConfiguration_ProducerEventHubName");

            if (!string.IsNullOrEmpty(producerConnectionString))
                configuration.ProducerConnectionString = producerConnectionString.Trim();

            if (!string.IsNullOrEmpty(producerEventHubName))
                configuration.ProducerEventHubName = producerEventHubName.Trim();

            // Consumer
            var consumerConnectionString =
                Environment.GetEnvironmentVariable("EventHubConfiguration_ConsumerConnectionString");
            var consumerEventHubName = Environment.GetEnvironmentVariable("EventHubConfiguration_ConsumerEventHubName");
            var consumerBlobStorageConnectionString =
                Environment.GetEnvironmentVariable("EventHubConfiguration_ConsumerBlobStorageConnectionString");
            var consumerBlobContainerName =
                Environment.GetEnvironmentVariable("EventHubConfiguration_ConsumerBlobContainerName");

            if (!string.IsNullOrEmpty(consumerConnectionString))
                configuration.ConsumerConnectionString = consumerConnectionString.Trim();

            if (!string.IsNullOrEmpty(consumerEventHubName))
                configuration.ConsumerEventHubName = consumerEventHubName.Trim();

            if (!string.IsNullOrEmpty(consumerBlobStorageConnectionString))
                configuration.ConsumerBlobStorageConnectionString = consumerBlobStorageConnectionString.Trim();

            if (!string.IsNullOrEmpty(consumerBlobContainerName))
                configuration.ConsumerBlobContainerName = consumerBlobContainerName.Trim();
        }

        private void ProcessData(object? sender, ImfData e)
        {
            var moduleService = _provider?.GetService<IModuleService>();
            var projectService = _provider?.GetService<IProjectService>();
            var logger = _provider?.GetService<ILogger<EventHubModule>>();

            try
            {
                if (moduleService == null)
                    throw new ModelBuilderModuleException(
                        "Can't process data. ModuleService is null in EventHubModule.");

                if (projectService == null)
                    throw new ModelBuilderModuleException(
                        "Can't process data. ProjectService is null in EventHubModule.");

                var parserModule = moduleService.Modules.FirstOrDefault(x =>
                    x.ModuleType == ModuleType.Parser && string.Equals(x.ModuleDescription.Id.ToString(), e.Parser,
                        StringComparison.CurrentCultureIgnoreCase));
                if (parserModule == null)
                    throw new ModelBuilderModuleException(
                        $"Can't process data. Can't find a parser with name: {e.Parser} in EventHubModule.");

                if (!(parserModule.Instance is IModelBuilderParser parser))
                    throw new ModelBuilderModuleException(
                        "Can't process data. Parser is not of type IModelBuilderParser in EventHubModule.");

                if (string.IsNullOrEmpty(e.Document))
                    throw new ModelBuilderModuleException(
                        "Can't process data. Document is null or empty in EventModule.");


                var project = parser.DeserializeProjectAm(Encoding.UTF8.GetBytes(e.Document))?.Result;

                if (project == null)
                {
                    logger?.LogError($"Can't parse project with ID: {e.ProjectId}.");
                    return;
                }

                var hasProject = projectService.Exist(project.Id, project.Id);
                _ = hasProject
                    ? projectService.Update(project.Id, project, e.SenderDomain)
                    : projectService.Create(project);
            }
            catch (Exception ex)
            {
                logger?.LogError($"Can't parse project with ID: {e.ProjectId}. Error: {ex.Message}");
            }
        }
    }
}