using Mb.Models.Extensions;
using ModelBuilder.Rdf.Models;
// ReSharper disable StringLiteralTypo

namespace ModelBuilder.Rdf.Extensions;

public static class StringExtensions
{
    /// <summary>
    /// Lowercase first character in string
    /// </summary>
    /// <param name="input">The string that should be lowercase first letter</param>
    /// <returns>The lowercase first letter string</returns>
    public static string LowerCaseFirstCharacter(this string input)
    {
        return input[..1].ToLower() + input[1..];
    }

    /// <summary>
    /// Resolve fragment from string
    /// </summary>
    /// <param name="input">The input string that should be resolved</param>
    /// <returns>The resolved string</returns>
    /// <remarks>Removes # /, and removes ID as first character in last segment iri</remarks>
    public static string ResolveFragment(this string input)
    {
        if (string.IsNullOrWhiteSpace(input))
            return string.Empty;

        return input
            .Replace("#", string.Empty, StringComparison.InvariantCultureIgnoreCase)
            .Replace("/", string.Empty, StringComparison.CurrentCultureIgnoreCase)
            .TrimStart("ID".ToCharArray())
            .Trim();
    }

    /// <summary>
    /// Get root IRI from iri
    /// </summary>
    /// <param name="iri"></param>
    /// <returns>Schema and server</returns>
    public static string RootIri(this string iri)
    {
        return string.IsNullOrWhiteSpace(iri)
            ? string.Empty
            : new Uri(iri).GetComponents(UriComponents.SchemeAndServer, UriFormat.SafeUnescaped);
    }

    /// <summary>
    /// Create attribute datum predicate
    /// </summary>
    /// <param name="iri">The iri to create predicate from</param>
    /// <returns>A record with attribute datum predicates</returns>
    /// <remarks>The IRI is used to resolve the root iri, and then create the predicates.</remarks>
    public static AttributeDatumPredicate AttributeDatumPredicate(this string iri)
    {
        var rootIri = iri.RootIri();
        // TODO: This should be rewritten
        return new AttributeDatumPredicate
        {
            SpecifiedScopePredicate = $"{rootIri}/specifiedscopesredicate",
            SpecifiedProvenancePredicate = $"{rootIri}/specifiedprovenancepredicate",
            RangeSpecifyingPredicate = $"{rootIri}/rangespecifyingpredicate",
            RegularitySpecifiedPredicate = $"{rootIri}/regularityspecifiedpredicate"
        };
    }

    /// <summary>
    /// Resolve id from IRI
    /// </summary>
    /// <param name="iri"></param>
    /// <returns>The id</returns>
    public static string ResolveIriId(this string iri)
    {
        if (string.IsNullOrWhiteSpace(iri))
            return null;

        var parsedIri = new Uri(iri);
        return string.IsNullOrEmpty(parsedIri.Fragment) ?
            parsedIri.Segments.Last().Replace("ID", string.Empty).Trim() :
            parsedIri.Fragment[1..].Replace("ID", string.Empty).Trim();
    }

    /// <summary>
    /// Create default datum IRI from IRI
    /// </summary>
    /// <param name="iri"></param>
    /// <returns>The created IRI</returns>
    public static string IriDatum(this string iri)
    {
        return $"{iri}-datum";
    }

    /// <summary>
    /// Find domain from IRI
    /// </summary>
    /// <param name="iri">The IRI to resolve the domain from</param>
    /// <returns>The domain</returns>
    /// <exception cref="ArgumentException">Throws if the IRI is not valid</exception>
    public static string FindDomain(this string iri)
    {
        if (!iri.IsValidIri())
            throw new ArgumentException("Iri is not valid.");

        var uri = new Uri(iri);
        return uri.GetDomainTypeName();
    }

    /// <summary>
    /// Strip IRI
    /// </summary>
    /// <param name="iri">The IRI that should be stripped</param>
    /// <returns>The stripped IRI</returns>
    /// <exception cref="ArgumentException">Throws if the IRI is not valid</exception>
    /// <remarks>Returns the http(s)://host</remarks>
    public static string StripIri(this string iri)
    {
        if (!iri.IsValidIri())
            throw new ArgumentException("Iri is not valid.");

        var url = new Uri(iri);
        return $"{url.Scheme}://{url.Host}";
    }

    /// <summary>
    /// Strip and create a new default IRI
    /// </summary>
    /// <param name="iri">The IRI that should become root IRI</param>
    /// <returns>The new created IRI with ID</returns>
    public static string StripAndCreateIdIri(this string iri)
    {
        var rootIri = iri.StripIri();
        return $"{rootIri}/ID{Guid.NewGuid()}";
    }
}