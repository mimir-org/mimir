namespace Mb.Models.Client
{
    public class HandleCm
    {
        public string Id { get; set; }
        public string Connection { get; set; }
        public PositionCm PositionTree { get; set; }
        public PositionCm PositionBlock { get; set; }
    }
}
