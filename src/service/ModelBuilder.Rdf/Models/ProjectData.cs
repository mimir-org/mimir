using Mb.Models.Application;
using Mb.Models.Data.Enums;

namespace ModelBuilder.Rdf.Models
{
    public record ProjectData
    {
        public ICollection<NodeAm> Nodes { get; init; } = default!;
        public ICollection<EdgeAm> Edges { get; init; } = default!;

        public ICollection<Unit> Units { get; init; } = default!;
        public IDictionary<string, AttributeFormat> AttributeFormats { get; init; } = default!;
        public IDictionary<string, AttributeQualifier> AttributeQualifiers { get; init; } = default!;
        public IDictionary<string, AttributeSource> AttributeSources { get; init; } = default!;
        public IDictionary<string, AttributeCondition> AttributeConditions { get; init; } = default!;
    }
}