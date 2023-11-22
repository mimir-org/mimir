namespace Mb.Models.Client
{
    public class HandleResponse
    {
        public PositionResponse PositionTree { get; set; }
        public PositionResponse PositionBlock { get; set; }
    }
}