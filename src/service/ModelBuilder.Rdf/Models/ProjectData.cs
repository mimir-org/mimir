using Mb.Models.Application;

namespace ModelBuilder.Rdf.Models
{
    public record ProjectData
    {
        public ICollection<NodeAm> Nodes { get; init; } = default!;
        public ICollection<EdgeAm> Edges { get; init; } = default!;
        public ICollection<UnitAm> Units { get; init; } = default!;
    }
}