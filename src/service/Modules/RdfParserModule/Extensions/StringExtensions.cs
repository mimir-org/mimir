using System;
using System.Linq;
using System.Text.RegularExpressions;
using VDS.RDF;

namespace RdfParserModule.Extensions
{
    public static class StringExtensions
    {
        public static Regex IsHttpRegex = new(@"http(s)*");

        public static INode GetOrCreateUriNode(this string iri, IGraph graph)
        {
            if (!IsHttpRegex.IsMatch(iri)) 
                return graph.GetUriNode(iri) ?? graph.CreateUriNode(iri);

            var uri = new Uri(iri);
            return graph.GetUriNode(uri) ?? graph.CreateUriNode(uri);
        }

        public static ILiteralNode GetOrCreateLiteralNode(this string value, IGraph graph)
        {
            return graph.GetLiteralNode(value) ?? graph.CreateLiteralNode(value);
        }

        public static bool ValidPrefix(this string prefix, IGraph graph)
        {
            return prefix[^1] == char.Parse(":") && graph.NamespaceMap.HasNamespace(prefix);
        }

        public static bool ValidNamespace(this string iri)
        {
            var validEnd = "#/".ToCharArray();
            return validEnd.Contains(iri[^1]);
        }
    }
}
