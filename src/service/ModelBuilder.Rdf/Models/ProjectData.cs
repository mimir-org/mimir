using Mb.Models.Application;
using Mb.Models.Data.Enums;

namespace ModelBuilder.Rdf.Models
{
    public record ProjectData
    {
        public ICollection<NodeAm> Nodes { get; init; } = default!;
        public ICollection<EdgeAm> Edges { get; init; } = default!;

        public ICollection<Unit> Units { get; init; } = default!;
        public ICollection<AttributeFormat> AttributeFormats { get; init; } = default!;
    }
}