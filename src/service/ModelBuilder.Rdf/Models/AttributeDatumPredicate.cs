namespace ModelBuilder.Rdf.Models
{
    public record AttributeDatumPredicate
    {
        public string QualifierPredicate { get; init; } = default!;
        public string SourcePredicate { get; init; } = default!;
        public string ConditionPredicate { get; init; } = default!;
        public string FormatPredicate { get; init; } = default!;
    }
}
