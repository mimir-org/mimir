namespace EventHubModule;

public class EventHubConfiguration
{
    // Producer
    public string ProducerConnectionString { get; set; }
    public string ProducerEventHubName { get; set; }

    // Consumer
    public string ConsumerConnectionString { get; set; }
    public string ConsumerEventHubName { get; set; }
    public string ConsumerBlobStorageConnectionString { get; set; }
    public string ConsumerBlobContainerName { get; set; }

    public bool HasValidConsumerConfiguration()
    {
        return !string.IsNullOrEmpty(ConsumerConnectionString) &&
               !string.IsNullOrEmpty(ConsumerEventHubName) &&
               !string.IsNullOrEmpty(ConsumerBlobStorageConnectionString) &&
               !string.IsNullOrEmpty(ConsumerBlobContainerName);
    }

    public bool HasValidProducerConfiguration()
    {
        return !string.IsNullOrEmpty(ProducerConnectionString) &&
               !string.IsNullOrEmpty(ProducerEventHubName);
    }
}