using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mimirorg.TypeLibrary.Enums;
using ModelBuilder.Rdf.Models;
using ModelBuilder.Rdf.Properties;
using ModelBuilder.Rdf.Services;

namespace ModelBuilder.Rdf.Extensions
{
    public static class EdgeExtensions
    {
        /// <summary>
        /// Assert edge to RDF graph
        /// </summary>
        /// <param name="edge">The edge to assert</param>
        /// <param name="ontologyService">Ontology Service</param>
        /// <param name="projectData">Record of ICollections</param>
        public static void AssertEdge(this Edge edge, IOntologyService ontologyService, ProjectData projectData)
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
                edge.Transport.TypeReferences.AssertTypeReference(edge.Transport.Iri, ontologyService);

                if (edge.Transport.Updated != null && !string.IsNullOrWhiteSpace(edge.Transport.UpdatedBy))
                {
                    ontologyService.AssertNode(edge.Transport.Iri, Resources.UpdatedBy, edge.Transport.UpdatedBy, true);
                    ontologyService.AssertNode(edge.Transport.Iri, Resources.LastUpdated, ontologyService.CreateLiteralNode($"{edge.Transport.Updated?.ToString("u")}", Resources.DateTime));
                }

                if (edge.Transport.Created != null && !string.IsNullOrWhiteSpace(edge.Transport.CreatedBy))
                {
                    ontologyService.AssertNode(edge.Transport.Iri, Resources.CreatedBy, edge.Transport.CreatedBy, true);
                    ontologyService.AssertNode(edge.Transport.Iri, Resources.Created, ontologyService.CreateLiteralNode($"{edge.Transport.Created?.ToString("u")}", Resources.DateTime));
                }

                // TODO: This should be an iri
                if (!string.IsNullOrWhiteSpace(edge.Transport.LibraryTypeId))
                    ontologyService.AssertNode(edge.Transport.Iri, Resources.LibraryType, edge.Transport.LibraryTypeId, true);

                if (!string.IsNullOrWhiteSpace(edge.Transport.Description))
                    ontologyService.AssertNode(edge.Transport.Iri, Resources.Desc, edge.Transport.Description, true);

                edge.Transport.InputTerminal?.AssertConnector(ontologyService, edge.Transport.Iri, projectData, edge, DefaultFlowDirection.InputFlow);
                edge.Transport.OutputTerminal?.AssertConnector(ontologyService, edge.Transport.Iri, projectData, edge, DefaultFlowDirection.OutputFlow);

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
                edge.Interface.TypeReferences.AssertTypeReference(edge.Interface.Iri, ontologyService);

                if (edge.Interface.Updated != null && !string.IsNullOrWhiteSpace(edge.Interface.UpdatedBy))
                {
                    ontologyService.AssertNode(edge.Interface.Iri, Resources.UpdatedBy, edge.Interface.UpdatedBy, true);
                    ontologyService.AssertNode(edge.Interface.Iri, Resources.LastUpdated, ontologyService.CreateLiteralNode($"{edge.Interface.Updated?.ToString("u")}", Resources.DateTime));
                }

                if (edge.Interface.Created != null && !string.IsNullOrWhiteSpace(edge.Interface.CreatedBy))
                {
                    ontologyService.AssertNode(edge.Interface.Iri, Resources.CreatedBy, edge.Interface.CreatedBy, true);
                    ontologyService.AssertNode(edge.Interface.Iri, Resources.Created, ontologyService.CreateLiteralNode($"{edge.Interface.Created?.ToString("u")}", Resources.DateTime));
                }

                // TODO: This should be an iri
                if (!string.IsNullOrWhiteSpace(edge.Interface.LibraryTypeId))
                    ontologyService.AssertNode(edge.Interface.Iri, Resources.LibraryType, edge.Interface.LibraryTypeId, true);

                if (!string.IsNullOrWhiteSpace(edge.Interface.Description))
                    ontologyService.AssertNode(edge.Interface.Iri, Resources.Desc, edge.Interface.Description, true);

                edge.Interface.InputTerminal?.AssertConnector(ontologyService, edge.Interface.Iri, projectData, edge, DefaultFlowDirection.InputFlow);
                edge.Interface.OutputTerminal?.AssertConnector(ontologyService, edge.Interface.Iri, projectData, edge, DefaultFlowDirection.OutputFlow);

                if (edge.Interface.Attributes != null)
                {
                    foreach (var attribute in edge.Interface.Attributes)
                    {
                        attribute.AssertAttribute(edge.Interface.Iri, ontologyService);
                    }
                }
            }
        }

        /// <summary>
        /// Resolve edge from RDF graph
        /// </summary>
        /// <param name="edge">The edge to resolve</param>
        /// <param name="ontologyService">Ontology Service</param>
        /// <param name="project">Current project</param>
        /// <param name="relation">Relation edge data</param>
        /// <param name="projectData">Record of ICollections</param>
        /// <exception cref="InvalidDataException">Throws if nodes and connectors is not defined in RDF file</exception>
        public static void ResolveEdge(this EdgeAm edge, IOntologyService ontologyService, ProjectAm project, RelationEdge relation, ProjectData projectData)
        {
            var fromNode = project.Nodes?.FirstOrDefault(x => x.Iri == relation.ParentIri);
            var toNode = project.Nodes?.FirstOrDefault(x => x.Iri == relation.ChildIri);

            if (fromNode == null || toNode == null)
                throw new InvalidDataException($"Can't create an edge. Can't find connected nodes from IRI. From: {fromNode?.Iri} to {toNode?.Iri}");

            var fromConnector = fromNode.Connectors?.OfType<RelationAm>().FirstOrDefault(x => x.Type == ConnectorDirection.Output && x.RelationType == relation.RelationType);
            var toConnector = toNode.Connectors?.OfType<RelationAm>().FirstOrDefault(x => x.Type == ConnectorDirection.Input && x.RelationType == relation.RelationType);

            if (fromConnector == null || toConnector == null)
                throw new InvalidDataException($"Can't create an edge. Can't find connectors from IRI. From: {fromConnector?.Iri} to {toConnector?.Iri}");

            var existingEdge = projectData?.Edges?.FirstOrDefault(x =>
                x.FromConnectorIri == fromConnector.Iri &&
                x.ToConnectorIri == toConnector.Iri &&
                x.FromNodeIri == fromNode.Iri &&
                x.ToNodeIri == toNode.Iri
            );

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