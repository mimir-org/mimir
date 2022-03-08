using System;
using System.Linq;
using AngleSharp.Dom;
using Mb.Models.Extensions;
using Mb.Models.Records;

namespace RdfParserModule.Extensions
{
    public static class StringExtensions
    {
        public static bool ValidNamespace(this string iri)
        {
            var validEnd = "#/".ToCharArray();
            return validEnd.Contains(iri[^1]);
        }

        public static string LowerCaseFirstCharacter(this string input)
        {
            return input[..1].ToLower() + input[1..];
        }

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

        public static string RootIri(this string iri)
        {
            return string.IsNullOrWhiteSpace(iri)
                ? string.Empty
                : new Uri(iri).GetComponents(UriComponents.SchemeAndServer, UriFormat.SafeUnescaped);
        }

        public static AttributeDatumPredicate AttributeDatumPredicate(this string iri)
        {
            var rootIri = iri.RootIri();

            return new AttributeDatumPredicate
            {
                QualifierPredicate = $"{rootIri}/qualifier",
                SourcePredicate = $"{rootIri}/source",
                ConditionPredicate = $"{rootIri}/condition",
                FormatPredicate = $"{rootIri}/format"
            };
        }

        public static string ResolveIriId(this string iri)
        {
            if (string.IsNullOrWhiteSpace(iri))
                return null;

            var parsedIri = new Uri(iri);
            return string.IsNullOrEmpty(parsedIri.Fragment) ? 
                parsedIri.Segments.Last().Replace("ID", string.Empty).Trim() : 
                parsedIri.Fragment[1..].Replace("ID", string.Empty).Trim();
        }

        public static string IriDatum(this string iri)
        {
            return $"{iri}-datum";
        }

        public static string FindDomain(this string iri)
        {
            if (!iri.IsValidIri())
                throw new ArgumentException("Iri is not valid.");

            var uri = new Uri(iri);
            return uri.GetDomainTypeName();
        }

        public static string StripIri(this string iri)
        {
            if (!iri.IsValidIri())
                throw new ArgumentException("Iri is not valid.");

            var url = new Url(iri);
            return $"{url.Scheme}://{url.Host}";
        }

        public static string StripAndCreateIdIri(this string iri)
        {
            var rootIri = iri.StripIri();
            return $"{rootIri}/ID{Guid.NewGuid()}";
        }
    }
}