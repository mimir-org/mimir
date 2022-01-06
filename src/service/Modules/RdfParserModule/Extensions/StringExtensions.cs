using System.Linq;
using VDS.RDF;

namespace RdfParserModule.Extensions
{
    public static class StringExtensions
    {
        public static bool ValidPrefix(this string prefix, IGraph graph)
        {
            return prefix[^1] == char.Parse(":") && graph.NamespaceMap.HasNamespace(prefix);
        }

        public static bool ValidNamespace(this string iri)
        {
            var validEnd = "#/".ToCharArray();
            return validEnd.Contains(iri[^1]);
        }

        public static string LowerCaseFirstCharacter(this string input)
        {
            return input[..1].ToLower() + input[1..];
        }
    }
}
