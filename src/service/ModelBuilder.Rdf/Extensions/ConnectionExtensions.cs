using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mimirorg.TypeLibrary.Enums;
using ModelBuilder.Rdf.Models;
using ModelBuilder.Rdf.Properties;
using ModelBuilder.Rdf.Services;

namespace ModelBuilder.Rdf.Extensions
{
    public static class ConnectionExtensions
    {
        /// <summary>
        /// Assert connection to RDF graph
        /// </summary>
        /// <param name="connection">The connection to assert</param>
        /// <param name="ontologyService">Ontology Service</param>
        /// <param name="projectData">Record of ICollections</param>
        public static void AssertConnection(this Connection connection, IOntologyService ontologyService, ProjectData projectData)
        {
            if (connection.FromConnector is Relation { RelationType: not RelationType.PartOf } fromRelation)
            {
                var relationString = fromRelation.RelationType.ToString().LowerCaseFirstCharacter();
                ontologyService.AssertNode(connection.FromNodeIri, $"imf:{relationString}", connection.ToNodeIri);
            }

            if (connection.ToConnector is Relation { RelationType: not RelationType.PartOf } toRelation)
            {
                var relationString = toRelation.RelationType.ToString().LowerCaseFirstCharacter();
                ontologyService.AssertNode(connection.ToNodeIri, $"imf:{relationString}", connection.FromNodeIri);
            }
        }

        /// <summary>
        /// Resolve connection from RDF graph
        /// </summary>
        /// <param name="connection">The connection to resolve</param>
        /// <param name="ontologyService">Ontology Service</param>
        /// <param name="project">Current project</param>
        /// <param name="relation">Relation connection data</param>
        /// <param name="projectData">Record of ICollections</param>
        /// <exception cref="InvalidDataException">Throws if nodes and connectors is not defined in RDF file</exception>
        public static void ResolveConnection(this ConnectionAm connection, IOntologyService ontologyService, ProjectAm project, RelationConnector relation, ProjectData projectData)
        {
            var fromNode = project.Nodes?.FirstOrDefault(x => x.Iri == relation.ParentIri);
            var toNode = project.Nodes?.FirstOrDefault(x => x.Iri == relation.ChildIri);

            if (fromNode == null || toNode == null)
                throw new InvalidDataException($"Can't create an connection. Can't find connected nodes from IRI. From: {fromNode?.Iri} to {toNode?.Iri}");

            var fromConnector = fromNode.Connectors?.OfType<RelationAm>().FirstOrDefault(x => x.Type == ConnectorDirection.Output && x.RelationType == relation.RelationType);
            var toConnector = toNode.Connectors?.OfType<RelationAm>().FirstOrDefault(x => x.Type == ConnectorDirection.Input && x.RelationType == relation.RelationType);

            if (fromConnector == null || toConnector == null)
                throw new InvalidDataException($"Can't create an connection. Can't find connectors from IRI. From: {fromConnector?.Iri} to {toConnector?.Iri}");

            var existingConnection = projectData?.Connections?.FirstOrDefault(x =>
                x.FromConnectorIri == fromConnector.Iri &&
                x.ToConnectorIri == toConnector.Iri &&
                x.FromNodeIri == fromNode.Iri &&
                x.ToNodeIri == toNode.Iri
            );

            connection.Iri = existingConnection != null ? existingConnection.Iri : toNode.Iri.StripAndCreateIdIri();
            connection.MasterProjectIri = toNode.MasterProjectIri;
            connection.ProjectIri = toNode.ProjectIri;
            connection.FromConnectorIri = fromConnector.Iri;
            connection.ToConnectorIri = toConnector.Iri;
            connection.FromNodeIri = fromNode.Iri;
            connection.ToNodeIri = toNode.Iri;
        }
    }
}