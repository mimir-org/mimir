using System.Collections.Generic;
using System.Linq;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Models.Exceptions;
using RdfParserModule.Models;
using RdfParserModule.Properties;
using RdfParserModule.Services;
using VDS.RDF.Query.Expressions.Conditional;

namespace RdfParserModule.Extensions
{
    public static class EdgeExtensions
    {
        public static void AssertEdge(this Edge edge, IOntologyService ontologyService, ILibRepository libRepository)
        {
            if (edge.FromConnector is Relation { RelationType: not RelationType.PartOf } fromRelation)
            {
                var relationString = fromRelation.RelationType.ToString().LowerCaseFirstCharacter();
                ontologyService.AssertNode(edge.FromNodeIri, $"imf:{relationString}", edge.ToNodeIri);
            }

            if (edge.ToConnector is Relation { RelationType: not RelationType.PartOf } toRelation)
            {
                var relationString = toRelation.RelationType.ToString().LowerCaseFirstCharacter();
                ontologyService.AssertNode(edge.ToNodeIri, $"imf:{relationString}", edge.FromNodeIri);
            }

            if (edge.Transport != null)
            {
                ontologyService.AssertNode(edge.Transport.Iri, Resources.Type, Resources.Transport);
                ontologyService.AssertNode(edge.Transport.Iri, Resources.Label, edge.Transport.Label ?? edge.Transport.Name, true);
                ontologyService.AssertNode(edge.Transport.Iri, Resources.Name, edge.Transport.Name, true);
                ontologyService.AssertNode(edge.Transport.Iri, Resources.HasAspect, $"imf:{edge.FromNode.Aspect}");
                ontologyService.AssertNode(edge.Transport.Iri, Resources.Version, edge.Transport.Version, true);
                ontologyService.AssertNode(edge.Transport.Iri, Resources.MimirRds, edge.Transport.Rds, true);

                if (edge.Transport.Updated != null && !string.IsNullOrWhiteSpace(edge.Transport.UpdatedBy))
                {
                    ontologyService.AssertNode(edge.Transport.Iri, Resources.UpdatedBy, edge.Transport.UpdatedBy, true);
                    ontologyService.AssertNode(edge.Transport.Iri, Resources.LastUpdated, ontologyService.CreateLiteralNode($"{edge.Transport.Updated}", Resources.DateTime));
                }

                if (edge.Transport.Created != null && !string.IsNullOrWhiteSpace(edge.Transport.CreatedBy))
                {
                    ontologyService.AssertNode(edge.Transport.Iri, Resources.CreatedBy, edge.Transport.CreatedBy, true);
                    ontologyService.AssertNode(edge.Transport.Iri, Resources.Created, ontologyService.CreateLiteralNode($"{edge.Transport.Created}", Resources.DateTime));
                }

                // TODO: This should be an iri
                if (!string.IsNullOrWhiteSpace(edge.Transport.LibraryTypeId))
                    ontologyService.AssertNode(edge.Transport.Iri, Resources.LibraryType, edge.Transport.LibraryTypeId, true);

                if (!string.IsNullOrWhiteSpace(edge.Transport.Description))
                    ontologyService.AssertNode(edge.Transport.Iri, Resources.Desc, edge.Transport.Description, true);

                edge.Transport.InputTerminal?.AssertConnector(ontologyService, edge.Transport.Iri, libRepository, edge);
                edge.Transport.OutputTerminal?.AssertConnector(ontologyService, edge.Transport.Iri, libRepository, edge);

                if (edge.Transport.Attributes != null)
                {
                    foreach (var attribute in edge.Transport.Attributes)
                    {
                        attribute.AssertAttribute(edge.Transport.Iri, ontologyService);
                    }
                }
            }

            if (edge.Interface != null)
            {
                ontologyService.AssertNode(edge.Interface.Iri, Resources.Type, Resources.Interface);
                ontologyService.AssertNode(edge.Interface.Iri, Resources.Label, edge.Interface.Label ?? edge.Interface.Name, true);
                ontologyService.AssertNode(edge.Interface.Iri, Resources.Name, edge.Interface.Name, true);
                ontologyService.AssertNode(edge.Interface.Iri, Resources.HasAspect, $"imf:{edge.FromNode.Aspect}");
                ontologyService.AssertNode(edge.Interface.Iri, Resources.Version, edge.Interface.Version, true);
                ontologyService.AssertNode(edge.Interface.Iri, Resources.MimirRds, edge.Interface.Rds, true);

                if (edge.Interface.Updated != null && !string.IsNullOrWhiteSpace(edge.Interface.UpdatedBy))
                {
                    ontologyService.AssertNode(edge.Interface.Iri, Resources.UpdatedBy, edge.Interface.UpdatedBy, true);
                    ontologyService.AssertNode(edge.Interface.Iri, Resources.LastUpdated, ontologyService.CreateLiteralNode($"{edge.Interface.Updated}", Resources.DateTime));
                }

                if (edge.Interface.Created != null && !string.IsNullOrWhiteSpace(edge.Interface.CreatedBy))
                {
                    ontologyService.AssertNode(edge.Interface.Iri, Resources.CreatedBy, edge.Interface.CreatedBy, true);
                    ontologyService.AssertNode(edge.Interface.Iri, Resources.Created, ontologyService.CreateLiteralNode($"{edge.Interface.Created}", Resources.DateTime));
                }

                // TODO: This should be an iri
                if (!string.IsNullOrWhiteSpace(edge.Interface.LibraryTypeId))
                    ontologyService.AssertNode(edge.Interface.Iri, Resources.LibraryType, edge.Interface.LibraryTypeId, true);

                if (!string.IsNullOrWhiteSpace(edge.Interface.Description))
                    ontologyService.AssertNode(edge.Interface.Iri, Resources.Desc, edge.Interface.Description, true);

                edge.Interface.InputTerminal?.AssertConnector(ontologyService, edge.Interface.Iri, libRepository, edge);
                edge.Interface.OutputTerminal?.AssertConnector(ontologyService, edge.Interface.Iri, libRepository, edge);

                if (edge.Interface.Attributes != null)
                {
                    foreach (var attribute in edge.Interface.Attributes)
                    {
                        attribute.AssertAttribute(edge.Interface.Iri, ontologyService);
                    }
                }
            }
        }

        public static void ResolveEdge(this EdgeAm edge, IOntologyService ontologyService, ProjectAm project, RelationEdge relation, IReadOnlyCollection<Edge> existingEdges)
        {
            var fromNode = project.Nodes?.FirstOrDefault(x => x.Iri == relation.ParentIri);
            var toNode = project.Nodes?.FirstOrDefault(x => x.Iri == relation.ChildIri);

            if (fromNode == null || toNode == null)
                throw new ModelBuilderBadRequestException($"Can't create an edge. Can't find connected nodes from IRI. From: {fromNode?.Iri} to {toNode?.Iri}");

            var fromConnector = fromNode.Connectors?.FirstOrDefault(x => x.Type == ConnectorType.Output && x.RelationType == relation.RelationType);
            var toConnector = toNode.Connectors?.FirstOrDefault(x => x.Type == ConnectorType.Input && x.RelationType == relation.RelationType);

            if (fromConnector == null || toConnector == null)
                throw new ModelBuilderBadRequestException($"Can't create an edge. Can't find connectors from IRI. From: {fromConnector?.Iri} to {toConnector?.Iri}");

            var existingEdge = existingEdges.FirstOrDefault(x =>
                x.FromNodeIri == fromNode.Iri && 
                x.ToNodeIri == toNode.Iri
            );

            if (existingEdge != null)
            {
                fromConnector.Iri = existingEdge.FromConnectorIri;
                toConnector.Iri = existingEdge.ToConnectorIri;
            }

            edge.Iri = existingEdge != null ? existingEdge.Iri : toNode.Iri.StripAndCreateIdIri();
            edge.MasterProjectIri = toNode.MasterProjectIri;
            edge.ProjectIri = toNode.ProjectIri;
            edge.FromConnectorIri = fromConnector.Iri;
            edge.ToConnectorIri = toConnector.Iri;
            edge.FromNodeIri = fromNode.Iri;
            edge.ToNodeIri = toNode.Iri;
        }
    }
}