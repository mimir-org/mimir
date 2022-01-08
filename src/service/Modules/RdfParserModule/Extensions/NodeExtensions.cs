using System;
using System.Text.RegularExpressions;
using Mb.Data.Contracts;
using Mb.Models.Data;
using Mb.Models.Enums;
using RdfParserModule.Properties;
using RdfParserModule.Services;

namespace RdfParserModule.Extensions
{
    public static class NodeExtensions
    {
        /// <summary>
        /// Assert node data to ontology service graph
        /// </summary>
        /// <param name="node"></param>
        /// <param name="project"></param>
        /// <param name="ontologyService"></param>
        /// <param name="libRepository"></param>
        public static void AssertNode(this Node node, Project project, IOntologyService ontologyService, ILibRepository libRepository)
        {
            var parentNode = node.GetParent(project);

            if (parentNode != null && !string.IsNullOrWhiteSpace(parentNode.Iri))
                ontologyService.AssertNode(node.Iri, "imf__hasParent", parentNode.Iri);

            if (!string.IsNullOrWhiteSpace(node.Description))
                ontologyService.AssertNode(node.Iri, Resources.desc, node.Description, true);

            ontologyService.AssertNode(node.Iri, "imf__rds", RdsString(node, project), true);
            ontologyService.AssertNode(node.Iri, "mimir__domain", node.Domain, true);
            ontologyService.AssertNode(node.Iri, "mimir__hasPosX", ontologyService.CreateLiteralNode($"{node.PositionX}", new Uri(ontologyService.BuildIri("xsd", "float"))));
            ontologyService.AssertNode(node.Iri, "mimir__hasPosY", ontologyService.CreateLiteralNode($"{node.PositionY}", new Uri(ontologyService.BuildIri("xsd", "float"))));
            ontologyService.AssertNode(node.Iri, "mimir__hasBlockPosX", ontologyService.CreateLiteralNode($"{node.PositionBlockX}", new Uri(ontologyService.BuildIri("xsd", "float"))));
            ontologyService.AssertNode(node.Iri, "mimir__hasBlockPosY", ontologyService.CreateLiteralNode($"{node.PositionBlockY}", new Uri(ontologyService.BuildIri("xsd", "float"))));
            ontologyService.AssertNode(node.Iri, Resources.hasAspect, $"imf__{node.Aspect}");

            if (!string.IsNullOrEmpty(node.Rds))
            {
                var strippedRds = node.StrippedRds();
                ontologyService.AssertNode(node.Iri, Resources.type, @$"http://example.com/rds/og{strippedRds.Length}#{node.Aspect}{strippedRds}");
            }

            if (node.IsRoot)
            {
                ontologyService.AssertNode(node.Iri, Resources.isAspectOf, node.MasterProjectIri);
                ontologyService.AssertNode(node.Iri, Resources.label, $"{project.Name} {node.Aspect}", true);
                return;
            }

            ontologyService.AssertNode(node.Iri, Resources.type, Resources.FSB);
            ontologyService.AssertNode(node.Iri, Resources.label, node.Label, true);

            if (!string.IsNullOrEmpty(node.Purpose?.Id))
                ontologyService.AssertNode(node.Iri, "mimir__hasPurpose", $"mimir__ID__{node.Purpose.Id}");

            if (node.Symbol != null)
                ontologyService.AssertNode(node.Iri, "mimir__symbol", node.Symbol, true);
        }

        /// <summary>
        /// Get the parent of the node
        /// </summary>
        /// <param name="node"></param>
        /// <param name="project"></param>
        /// <returns></returns>
        public static Node GetParent(this Node node, Project project)
        {
            foreach (var edge in project.Edges)
            {
                if (edge.ToNodeId != node.Id) continue;

                if (!edge.ToConnector.IsPartOf()) continue;

                if (edge.ToConnector.IsConnected(project))
                {
                    return edge.FromNode;
                }
            }
            return null;
        }

        // TODO: This is not correct. We have more values ex. ++ etc.
        /// <summary>
        /// Generate RDS string recursively
        /// </summary>
        /// <param name="node"></param>
        /// <param name="project"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public static string RdsString(Node node, Project project)
        {
            if (node.IsRoot)
            {
                return $"<{project.Name.ToUpper()}>";
            }

            var prefix = node.Aspect switch
            {
                Aspect.Function => "=",
                Aspect.Location => "+",
                Aspect.Product => "-",
                Aspect.NotSet => throw new NotImplementedException(),
                Aspect.None => throw new NotImplementedException(),
                _ => string.Empty
            };

            var parent = node.GetParent(project);
            var rds = node.Rds;

            return parent != null ? $"{RdsString(parent, project)}{prefix}{rds}" : $"{prefix}{rds}";
        }

        /// <summary>
        /// Strip RDS string
        /// </summary>
        /// <param name="node"></param>
        /// <returns></returns>
        public static string StrippedRds(this Node node) => Regex.Replace(node.Rds, @"\d+", string.Empty);
    }
}
