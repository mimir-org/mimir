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

        /// <summary>
        /// Resolve value from INode
        /// </summary>
        /// <param name="node"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        /// <exception cref="ArgumentOutOfRangeException"></exception>
        public static string ResolveValue(this INode node)
        {
            if (node == null)
                return null;

            switch (node.NodeType)
            {
                case NodeType.Literal:
                    return ((ILiteralNode) node).Value;
                case NodeType.Uri:
                    var uriNode = (IUriNode) node;
                    var uri = uriNode.Uri.Fragment.ResolveFragment();
                    if (string.IsNullOrWhiteSpace(uri))
                        uri = uriNode.Uri.ToString().ResolveIriId();
                    return uri;
                case NodeType.Blank:
                    throw new NotImplementedException($"There is no implementation of ResolveValue for {node.NodeType}");
                case NodeType.GraphLiteral:
                    throw new NotImplementedException($"There is no implementation of ResolveValue for {node.NodeType}");
                case NodeType.Variable:
                    throw new NotImplementedException($"There is no implementation of ResolveValue for {node.NodeType}");
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
    }
}