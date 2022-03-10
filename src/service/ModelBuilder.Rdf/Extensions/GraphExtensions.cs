using System.Text.RegularExpressions;
using VDS.RDF;

namespace ModelBuilder.Rdf.Extensions
{
    public static class GraphExtensions
    {
        /// <summary>
        /// Regex to define if is http(s)
        /// </summary>
        public static Regex IsHttpRegex = new(@"http(s)*");

        /// <summary>
        /// Helper function to get if node exist, otherwise create a new rdf node
        /// </summary>
        /// <param name="graph"></param>
        /// <param name="iri"></param>
        /// <returns></returns>
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
        /// <exception cref="NotImplementedException">Throws if node type is not implemented</exception>
        /// <exception cref="ArgumentOutOfRangeException">Throws if node type does not exist</exception>
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