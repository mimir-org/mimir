using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azure.Messaging.EventHubs;
using Azure.Messaging.EventHubs.Producer;
using EventHubModule.Contracts;
using Newtonsoft.Json;

namespace EventHubModule.Services
{
    public class EventHubProducerService : IEventHubProducerService
    {
        public EventHubConfiguration EventHubConfiguration { get; set; }

        public async Task SendDataAsync<T>(List<T> data)
        {
            if (string.IsNullOrEmpty(EventHubConfiguration?.ConnectionString) || string.IsNullOrEmpty(EventHubConfiguration?.ConnectionString))
                throw new Exception("The configuration connection or event hub name string is missing");

            if(data == null || !data.Any())
                return;

            await using var producer = new EventHubProducerClient(EventHubConfiguration?.ConnectionString, EventHubConfiguration?.EventHubName);
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
