using System;
using System.Text.RegularExpressions;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;
using RdfParserModule.Properties;
using RdfParserModule.Services;
using VDS.RDF;

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
                ontologyService.AssertNode(node.Iri, Resources.HasParent, parentNode.Iri);

            if (!string.IsNullOrWhiteSpace(node.Description))
                ontologyService.AssertNode(node.Iri, Resources.Desc, node.Description, true);

            ontologyService.AssertNode(node.Iri, Resources.RDS, node.RdsString(project), true);
            ontologyService.AssertNode(node.Iri, Resources.Domain, node.Domain, true);
            ontologyService.AssertNode(node.Iri, Resources.HasPositionX, ontologyService.CreateLiteralNode($"{node.PositionX}", Resources.Float));
            ontologyService.AssertNode(node.Iri, Resources.HasPositionY, ontologyService.CreateLiteralNode($"{node.PositionY}", Resources.Float));
            ontologyService.AssertNode(node.Iri, Resources.HasBlockPositionX, ontologyService.CreateLiteralNode($"{node.PositionBlockX}", Resources.Float));
            ontologyService.AssertNode(node.Iri, Resources.HasBlockPositionY, ontologyService.CreateLiteralNode($"{node.PositionBlockY}", Resources.Float));
            ontologyService.AssertNode(node.Iri, Resources.HasAspect, $"imf:{node.Aspect}");
            ontologyService.AssertNode(node.Iri, Resources.Version, node.Version, true);
            ontologyService.AssertNode(node.Iri, Resources.Name, node.Name, true);
            ontologyService.AssertNode(node.Iri, Resources.Label, node.Label, true);

            if (!string.IsNullOrEmpty(node.Rds))
            {
                var strippedRds = node.StrippedRds();
                ontologyService.AssertNode(node.Iri, Resources.Type, @$"og{strippedRds.Length}:{node.Aspect}{strippedRds}");
            }

            if (node.IsRoot)
            {
                ontologyService.AssertNode(node.Iri, Resources.IsAspectOf, node.MasterProjectIri);
                return;
            }

            ontologyService.AssertNode(node.Iri, Resources.Type, Resources.FSB);
            

            if (!string.IsNullOrEmpty(node.Purpose?.Id))
                ontologyService.AssertNode(node.Iri, Resources.HasPurpose, $"mimir:{node.Purpose.Id}");

            if (node.Symbol != null)
                ontologyService.AssertNode(node.Iri, Resources.HasSymbol, node.Symbol, true);
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
        public static string RdsString(this Node node, Project project)
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

            return parent != null ? $"{parent.RdsString(project)}{prefix}{rds}" : $"{prefix}{rds}";
        }

        /// <summary>
        /// Strip RDS string
        /// </summary>
        /// <param name="node"></param>
        /// <returns></returns>
        public static string StrippedRds(this Node node) => Regex.Replace(node.Rds, @"\d+", string.Empty);

        public static void ResolveNode(this NodeAm node, IOntologyService ontologyService, string iri, string projectIri)
        {
            node.Iri = iri;
            node.IsRoot = true;
            node.StatusId = "4590637F39B6BA6F39C74293BE9138DF";
            node.Version = ontologyService.GetValue(iri, Resources.Version, false);
            node.MasterProjectIri = projectIri;
            node.Name = ontologyService.GetValue(iri, Resources.Name, false);
            node.Label = ontologyService.GetValue(iri, Resources.Label, false);
            node.Description = ontologyService.GetValue(iri, Resources.Desc, false);
            node.Rds = ontologyService.GetValue(iri, Resources.RDS, false);
            node.PositionX = ontologyService.GetDecimalValue(iri, Resources.HasPositionX, false);
            node.PositionY = ontologyService.GetDecimalValue(iri, Resources.HasPositionY, false);
            node.PositionBlockX = ontologyService.GetDecimalValue(iri, Resources.HasBlockPositionX, false);
            node.PositionBlockY = ontologyService.GetDecimalValue(iri, Resources.HasPositionY, false);
            node.Aspect = ontologyService.GetEnumValue<Aspect>(iri, Resources.HasAspect, false);
            // TODO: NodeAm should only have purpose id
            //node.Purpose = ontologyService.GetValue(iri, Resources.HasPurpose, false);
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
                    return ((IUriNode) node).Uri.Fragment.ResolveFragment();
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