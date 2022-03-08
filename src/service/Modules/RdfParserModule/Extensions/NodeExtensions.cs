using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using Mb.Models.Extensions;
using RdfParserModule.Properties;
using RdfParserModule.Services;
using INode = VDS.RDF.INode;
using Node = Mb.Models.Data.Node;

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
            ontologyService.AssertNode(node.Iri, Resources.MimirRds, node.Rds, true);
            ontologyService.AssertNode(node.Iri, Resources.Domain, node.Domain, true);
            ontologyService.AssertNode(node.Iri, Resources.HasPositionX, ontologyService.CreateLiteralNode($"{node.PositionX}", Resources.Float));
            ontologyService.AssertNode(node.Iri, Resources.HasPositionY, ontologyService.CreateLiteralNode($"{node.PositionY}", Resources.Float));
            ontologyService.AssertNode(node.Iri, Resources.HasBlockPositionX, ontologyService.CreateLiteralNode($"{node.PositionBlockX}", Resources.Float));
            ontologyService.AssertNode(node.Iri, Resources.HasBlockPositionY, ontologyService.CreateLiteralNode($"{node.PositionBlockY}", Resources.Float));
            ontologyService.AssertNode(node.Iri, Resources.HasAspect, $"imf:{node.Aspect}");
            ontologyService.AssertNode(node.Iri, Resources.Version, node.Version, true);
            ontologyService.AssertNode(node.Iri, Resources.Name, node.Name, true);
            ontologyService.AssertNode(node.Iri, Resources.Label, node.Label ?? node.Name, true);

            ontologyService.AssertNode(node.Iri, Resources.UpdatedBy, node.UpdatedBy, true);
            ontologyService.AssertNode(node.Iri, Resources.LastUpdated, ontologyService.CreateLiteralNode($"{node.Updated}", Resources.DateTime));

            if (node.Created != null && !string.IsNullOrWhiteSpace(node.CreatedBy))
            {
                ontologyService.AssertNode(node.Iri, Resources.CreatedBy, node.CreatedBy, true);
                ontologyService.AssertNode(node.Iri, Resources.Created, ontologyService.CreateLiteralNode($"{node.Created}", Resources.DateTime));
            }

            // TODO: This should be an iri
            if (!string.IsNullOrWhiteSpace(node.LibraryTypeId))
                ontologyService.AssertNode(node.Iri, Resources.LibraryType, node.LibraryTypeId, true);

            if (!string.IsNullOrWhiteSpace(node.Rds))
            {
                var strippedRds = node.StrippedRds();
                ontologyService.AssertNode(node.Iri, Resources.Type, @$"og{strippedRds.Length}:{node.Aspect}{strippedRds}");
            }

            if (node.IsRoot)
            {
                ontologyService.AssertNode(node.Iri, Resources.IsAspectOf, project.Iri);
                ontologyService.AssertNode(node.Iri, Resources.HasMasterProject, project.Iri);
                return;
            }

            ontologyService.AssertNode(node.Iri, Resources.Type, Resources.FSB);
            ontologyService.AssertNode(node.Iri, Resources.HasMasterProject, node.MasterProjectIri);


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

        /// <summary>
        /// Resolve aspect node and all references
        /// </summary>
        /// <param name="node"></param>
        /// <param name="ontologyService"></param>
        /// <param name="iri"></param>
        /// <param name="projectIri"></param>
        /// <param name="isRootNode"></param>
        /// <exception cref="NullReferenceException"></exception>
        public static void ResolveNode(this NodeAm node, IOntologyService ontologyService, string iri, string projectIri, bool isRootNode)
        {
            if(node == null || ontologyService == null)
                throw new NullReferenceException($"{nameof(node)} or {nameof(ontologyService)} is null.");

            node.Iri = iri;
            node.ProjectIri = projectIri;
            node.Name = ontologyService.GetValue(iri, Resources.Name, false);
            node.Version = ontologyService.GetValue(iri, Resources.Version, false);
            node.Label = ontologyService.GetValue(iri, Resources.Label, false);
            node.Rds = ontologyService.GetValue(iri, Resources.MimirRds, false);
            node.Description = ontologyService.GetValue(iri, Resources.Desc, false);
            node.PositionX = ontologyService.GetDecimalValue(iri, Resources.HasPositionX, false);
            node.PositionY = ontologyService.GetDecimalValue(iri, Resources.HasPositionY, false);
            node.PositionBlockX = ontologyService.GetDecimalValue(iri, Resources.HasBlockPositionX, false);
            node.PositionBlockY = ontologyService.GetDecimalValue(iri, Resources.HasPositionY, false);
            node.StatusId = "4590637F39B6BA6F39C74293BE9138DF";

            var masterProjectIriNode = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasMasterProject).Select(x => x.Object).FirstOrDefault();
            node.MasterProjectIri = masterProjectIriNode?.ToString();

            node.Symbol = ontologyService.GetValue(iri, Resources.HasSymbol, false);
            node.LibraryTypeId = ontologyService.GetValue(iri, Resources.LibraryType, false);

            node.UpdatedBy = ontologyService.GetValue(iri, Resources.UpdatedBy, false);
            node.Updated = ontologyService.GetDateTimeValue(iri, Resources.LastUpdated, false);
            node.CreatedBy = ontologyService.GetValue(iri, Resources.CreatedBy, false);
            node.Created = ontologyService.GetDateTimeValue(iri, Resources.Created, false);

            // TODO: NodeAm should only have purpose id or name
            var purposeId = ontologyService.GetValue(iri, Resources.HasPurpose, false);
            node.Purpose = string.IsNullOrWhiteSpace(purposeId) ? null : new Purpose {Id = purposeId};

            node.Aspect = ontologyService.GetEnumValue<Aspect>(iri, Resources.HasAspect, false);
            node.IsRoot = isRootNode;

            // Resolve Attributes
            node.Attributes = new List<AttributeAm>();
            var attributes = ontologyService.GetTriplesWithSubjectPredicate(node.Iri, Resources.HasPhysicalQuantity).Select(x => x.Object).ToList();
            
            foreach (var a in attributes)
            {
                var attribute = new AttributeAm();
                attribute.ResolveAttribute(ontologyService, a.ToString(), iri, null, null, null, null);
                node.Attributes.Add(attribute);
            }

            // Create all relation nodes
            node.Connectors = CreateDefaultConnectors(node.Iri, isRootNode);

            // Create all input terminals
            var inputTerminalNodes = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasInputTerminal).Select(x => x.Object).ToList();
            var inputTerminals = ResolveTerminals(inputTerminalNodes, iri, ontologyService).ToList();
            node.Connectors = node.Connectors.Union(inputTerminals).ToList();

            // Create all output terminals
            var outputTerminalNodes = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasOutputTerminal).Select(x => x.Object).ToList();
            var outputTerminals = ResolveTerminals(outputTerminalNodes, iri, ontologyService).ToList();
            node.Connectors = node.Connectors.Union(outputTerminals).ToList();

            node.Simples = new List<SimpleAm>();
        }

        /// <summary>
        /// Resolve all Terminals from INodes
        /// </summary>
        /// <param name="nodes">The nodes to be resolved</param>
        /// <param name="nodeIri">Parent node IRI</param>
        /// <param name="ontologyService">Ontology Service</param>
        /// <returns></returns>
        public static IEnumerable<TerminalAm> ResolveTerminals(List<INode> nodes, string nodeIri, IOntologyService ontologyService)
        {
            if (!nodes.Any()) 
                yield break;
            
            foreach (var node in nodes)
            {
                var terminal = new TerminalAm();
                terminal.ResolveTerminal(ontologyService, nodeIri, node.ToString());
                yield return terminal;
            }
        }

        /// <summary>
        /// Create all default relation connectors 
        /// </summary>
        /// <param name="iri">The node IRI</param>
        /// <param name="isRoot">Is a root node?</param>
        /// <returns>Returns a list of default connectors</returns>
        public static List<ConnectorAm> CreateDefaultConnectors(string iri, bool isRoot)
        {
            var connectors = new List<ConnectorAm>
            {
                new RelationAm
                {
                    Iri = iri.StripAndCreateIdIri(),
                    Name = RelationType.PartOf.GetDisplayName(),
                    Type = ConnectorType.Output,
                    NodeIri = iri,
                    RelationType = RelationType.PartOf
                }
            };

            if (isRoot) 
                return connectors;
            
            connectors.Add(new RelationAm
            {
                Iri = iri.StripAndCreateIdIri(),
                Name = RelationType.PartOf.GetDisplayName(),
                Type = ConnectorType.Input,
                NodeIri = iri,
                RelationType = RelationType.PartOf
            });

            connectors.Add(new RelationAm
            {
                Iri = iri.StripAndCreateIdIri(),
                Name = RelationType.HasLocation.GetDisplayName(),
                Type = ConnectorType.Input,
                NodeIri = iri,
                RelationType = RelationType.HasLocation
            });

            connectors.Add(new RelationAm
            {
                Iri = iri.StripAndCreateIdIri(),
                Name = RelationType.HasLocation.GetDisplayName(),
                Type = ConnectorType.Output,
                NodeIri = iri,
                RelationType = RelationType.HasLocation
            });

            connectors.Add(new RelationAm
            {
                Iri = iri.StripAndCreateIdIri(),
                Name = RelationType.FulfilledBy.GetDisplayName(),
                Type = ConnectorType.Input,
                NodeIri = iri,
                RelationType = RelationType.FulfilledBy
            });

            connectors.Add(new RelationAm
            {
                Iri = iri.StripAndCreateIdIri(),
                Name = RelationType.FulfilledBy.GetDisplayName(),
                Type = ConnectorType.Output,
                NodeIri = iri,
                RelationType = RelationType.FulfilledBy
            });

            return connectors;
        }
    }
}