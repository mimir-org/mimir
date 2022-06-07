using Mb.Models.Application;
using Mimirorg.TypeLibrary.Models.Client;

namespace ModelBuilder.Rdf.Models
{
    public record ProjectData
    {
        public ICollection<NodeAm> Nodes { get; init; } = default!;
        public ICollection<EdgeAm> Edges { get; init; } = default!;

        public ICollection<UnitLibCm> Units { get; init; } = default!;
        public IDictionary<string, AttributeFormatLibCm> AttributeFormats { get; init; } = default!;
        public IDictionary<string, AttributeQualifierLibCm> AttributeQualifiers { get; init; } = default!;
        public IDictionary<string, AttributeSourceLibCm> AttributeSources { get; init; } = default!;
        public IDictionary<string, AttributeConditionLibCm> AttributeConditions { get; init; } = default!;
    }
}