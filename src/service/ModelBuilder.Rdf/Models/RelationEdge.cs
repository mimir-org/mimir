using Mb.Models.Enums;

namespace ModelBuilder.Rdf.Models
{
    public record RelationEdge
    {
        public string ParentIri { get; init; } = default!;
        public string ChildIri { get; init; } = default!;
        public RelationType RelationType { get; init; } = default!;
    }
}