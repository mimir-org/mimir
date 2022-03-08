using Mb.Models.Enums;

namespace RdfParserModule.Models
{
    public record RelationEdge
    {
        public string ParentIri { get; init; } = default!;
        public string ChildIri { get; init; } = default!;
        public RelationType RelationType { get; init; } = default!;
    }
}
