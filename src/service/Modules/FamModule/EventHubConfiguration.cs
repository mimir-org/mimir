namespace EventHubModule
{
    public class EventHubConfiguration
    {
        public string ConnectionString { get; set; }
        public string EventHubName { get; set; }
        public string ConsumerConnectionString { get; set; }
        public string ConsumerEventHubName { get; set; }
        public string BlobStorageConnectionString { get; set; }
        public string BlobContainerName { get; set; }
    }
}
