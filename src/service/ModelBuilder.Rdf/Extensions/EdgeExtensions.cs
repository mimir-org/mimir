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