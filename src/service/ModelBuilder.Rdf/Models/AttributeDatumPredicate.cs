namespace ModelBuilder.Rdf.Models
{
    public record AttributeDatumPredicate
    {
        public string SpecifiedScopePredicate { get; init; } = default!;
        public string SpecifiedProvenancePredicate { get; init; } = default!;
        public string RangeSpecifyingPredicate { get; init; } = default!;
        public string RegularitySpecifiedPredicate { get; init; } = default!;
    }
}