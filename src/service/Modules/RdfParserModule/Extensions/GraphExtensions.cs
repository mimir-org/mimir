using System;
using System.Text.RegularExpressions;
using VDS.RDF;

namespace RdfParserModule.Extensions
{
    public static class GraphExtensions
    {
        public static Regex IsHttpRegex = new(@"http(s)*");

        public static INode GetOrCreateUriNode(this IGraph graph, string iri)
        {
            if (!IsHttpRegex.IsMatch(iri))
                return graph.GetUriNode(iri) ?? graph.CreateUriNode(iri);

            var uri = new Uri(iri);
            return graph.GetUriNode(uri) ?? graph.CreateUriNode(uri);
        }
    }
}
