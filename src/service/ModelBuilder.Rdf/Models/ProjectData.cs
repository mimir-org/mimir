using Mb.Models.Application;
using Mb.Models.Data.Enums;

namespace ModelBuilder.Rdf.Models
{
    public record ProjectData
    {
        public ICollection<NodeAm> Nodes { get; init; } = default!;
        public ICollection<EdgeAm> Edges { get; init; } = default!;

        public ICollection<Unit> Units { get; init; } = default!;
        public Dictionary<string, AttributeFormat> AttributeFormats { get; init; } = default!;
        public Dictionary<string, AttributeQualifier> AttributeQualifiers { get; init; } = default!;
        public Dictionary<string, AttributeSource> AttributeSources { get; init; } = default!;
        public Dictionary<string, AttributeCondition> AttributeConditions { get; init; } = default!;
    }
}