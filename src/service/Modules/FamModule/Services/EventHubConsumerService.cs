﻿using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Azure.Messaging.EventHubs;
using Azure.Messaging.EventHubs.Consumer;
using Azure.Messaging.EventHubs.Processor;
using Azure.Storage.Blobs;
using EventHubModule.Contracts;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace EventHubModule.Services
{
    public class EventHubConsumerService<T> : IEventHubConsumerService<T>
    {
        public event EventHandler<T> DataReceived;
        private readonly EventProcessorClient _client;
        private CancellationToken _cancellationToken;
        private int _failedNumber;

        public EventHubConsumerService(IOptions<EventHubConfiguration> eventHubConfiguration)
        {
            var blobContainerClient = new BlobContainerClient(eventHubConfiguration?.Value?.BlobStorageConnectionString, eventHubConfiguration?.Value?.BlobContainerName);
            _client = new EventProcessorClient(blobContainerClient, EventHubConsumerClient.DefaultConsumerGroupName, eventHubConfiguration?.Value?.ConsumerConnectionString, eventHubConfiguration?.Value?.ConsumerEventHubName);
            _client.ProcessEventAsync += ProcessEventHandler;
            _client.ProcessErrorAsync += ProcessErrorHandler;
        }

        public async Task RunAsync(CancellationToken cancellationToken = new())
        {
            _cancellationToken = cancellationToken;
            await _client.StartProcessingAsync(_cancellationToken);

            while (!_cancellationToken.IsCancellationRequested)
            {
                await Task.Delay(1000, _cancellationToken);
            }
        }

        public async Task StopAsync()
        {
            await Task.Delay(TimeSpan.FromSeconds(30), _cancellationToken);
            await _client.StopProcessingAsync(_cancellationToken);
        }

        protected virtual void OnDataReceived(T e)
        {
            DataReceived?.Invoke(this, e);
        }

        private async Task ProcessErrorHandler(ProcessErrorEventArgs arg)
        {
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
                Console.WriteLine(e.Message);
                _failedNumber += 1;
                if (_failedNumber > 5)
                {
                    await arg.UpdateCheckpointAsync(arg.CancellationToken);
                    _failedNumber = 0;
                }
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