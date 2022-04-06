using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Azure.Messaging.EventHubs;
using Azure.Messaging.EventHubs.Consumer;
using Azure.Messaging.EventHubs.Processor;
using Azure.Storage.Blobs;
using EventHubModule.Contracts;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace EventHubModule.Services
{
    public class EventHubConsumerService<T> : IEventHubConsumerService<T>
    {
        public event EventHandler<T> DataReceived;
        private readonly EventProcessorClient _client;
        private CancellationToken _cancellationToken;
        private readonly bool _hasValidConfiguration;
        private readonly ILogger<EventHubConsumerService<T>> _logger;

        public EventHubConsumerService(IOptions<EventHubConfiguration> eventHubConfiguration,
            ILogger<EventHubConsumerService<T>> logger)
        {
            _logger = logger;
            _hasValidConfiguration = eventHubConfiguration?.Value != null &&
                                     eventHubConfiguration.Value.HasValidConsumerConfiguration();

            if (!_hasValidConfiguration)
                return;

            var blobContainerClient = new BlobContainerClient(
                eventHubConfiguration?.Value?.ConsumerBlobStorageConnectionString,
                eventHubConfiguration?.Value?.ConsumerBlobContainerName);
            _client = new EventProcessorClient(blobContainerClient, EventHubConsumerClient.DefaultConsumerGroupName,
                eventHubConfiguration?.Value?.ConsumerConnectionString,
                eventHubConfiguration?.Value?.ConsumerEventHubName);
            _client.ProcessEventAsync += ProcessEventHandler;
            _client.ProcessErrorAsync += ProcessErrorHandler;
        }

        public async Task RunAsync(CancellationToken cancellationToken = new())
        {
            if (!_hasValidConfiguration)
            {
                _logger.LogWarning("EventHub - missing configuration");
                return;
            }

            _cancellationToken = cancellationToken;
            _logger.LogInformation("EventHub starting processing data");

            await _client.StartProcessingAsync(_cancellationToken);

            while (!_cancellationToken.IsCancellationRequested)
            {
                await Task.Delay(1000, _cancellationToken);
            }

            _logger.LogInformation("EventHub stopping processing data");
        }

        public async Task StopAsync()
        {
            _logger.LogInformation("EventHub shutting down");
            await Task.Delay(TimeSpan.FromSeconds(30), _cancellationToken);
            await _client.StopProcessingAsync(_cancellationToken);
        }

        protected virtual void OnDataReceived(T e)
        {
            DataReceived?.Invoke(this, e);
        }

        private async Task ProcessErrorHandler(ProcessErrorEventArgs arg)
        {
            _logger.LogError($"EventHub - ProcessErrorHandler - {arg.Exception.Message}");
            await StopAsync();
        }

        private async Task ProcessEventHandler(ProcessEventArgs arg)
        {
            try
            {
                var obj = ConvertFromByteArray(arg.Data.Body.ToArray());
                OnDataReceived(obj);
                await arg.UpdateCheckpointAsync(arg.CancellationToken);
            }
            catch (Exception e)
            {
                _logger.LogError($"EventHub - ProcessEventHandler  Error - {e.Message}");
            }
        }

        private static T ConvertFromByteArray(byte[] data)
        {
            if (data == null)
                return default;

            var dataAsJson = Encoding.UTF8.GetString(data);
            return JsonConvert.DeserializeObject<T>(dataAsJson);
        }
    }
}