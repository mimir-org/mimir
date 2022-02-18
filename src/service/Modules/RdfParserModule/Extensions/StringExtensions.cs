using System;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore.Query.Internal;
using RdfParserModule.Properties;
using RdfParserModule.Services;
using VDS.RDF;

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

        public static bool IsValidIri(this string iri)
        {
            return Uri.IsWellFormedUriString(iri, UriKind.Absolute);
        }

        public static string ResolveFragment(this string input)
        {
            if (string.IsNullOrWhiteSpace(input))
                return string.Empty;

            return input.Replace("#", string.Empty, StringComparison.InvariantCultureIgnoreCase)
                .Replace("/", string.Empty, StringComparison.CurrentCultureIgnoreCase).Trim();
        }
    }
}