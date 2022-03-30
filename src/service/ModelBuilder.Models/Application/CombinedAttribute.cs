namespace Mb.Models.Application
{
    public class CombinedAttribute
    {
        public string Qualifier { get; set; }
        public string Source { get; set; }
        public string Condition { get; set; }
        public string Combined => $"({Qualifier ?? ""}), ({Source ?? ""}), ({Condition ?? ""})";
    }
}