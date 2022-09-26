namespace ModelBuilder.Rdf.Models;

public record AttributeDatumObject
{
    public string SpecifiedScope { get; init; } = default!;
    public string SpecifiedProvenance { get; init; } = default!;
    public string RangeSpecifying { get; init; } = default!;
    public string RegularitySpecified { get; init; } = default!;
}