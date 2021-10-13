using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azure.Messaging.EventHubs;
using Azure.Messaging.EventHubs.Producer;
using EventHubModule.Contracts;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace EventHubModule.Services
{
    public class EventHubProducerService : IEventHubProducerService
    {
        private readonly EventHubConfiguration _eventHubConfiguration;

        public EventHubProducerService(IOptions<EventHubConfiguration> eventHubConfiguration)
        {
            _eventHubConfiguration = eventHubConfiguration?.Value;
        }

        public async Task SendDataAsync<T>(List<T> data) where T: class
        {
            if (string.IsNullOrEmpty(_eventHubConfiguration?.ConnectionString) || string.IsNullOrEmpty(_eventHubConfiguration?.ConnectionString))
                throw new Exception("The configuration connection or event hub name string is missing");

            if(data == null || !data.Any())
                return;

            await using var producer = new EventHubProducerClient(_eventHubConfiguration?.ConnectionString, _eventHubConfiguration?.EventHubName);
            using var eventBatch = await producer.CreateBatchAsync();
            foreach (var item in data)
            {
                var eventData = CreateEventData(item);
                eventBatch.TryAdd(eventData);
            }
            
            await producer.SendAsync(eventBatch);
        }

        private static EventData CreateEventData<T>(T data)
        {
            var dataAsJson = JsonConvert.SerializeObject(data);
            var eventData = new EventData(Encoding.UTF8.GetBytes(dataAsJson));
            return eventData;
        }
    }
}
