namespace ModelBuilder.Rdf.Models;

public record AttributeDatumObject
{
    public string QualifierObject { get; init; } = default!;
    public string SourceObject { get; init; } = default!;
    public string ConditionObject { get; init; } = default!;
    public string FormatObject { get; init; } = default!;
}