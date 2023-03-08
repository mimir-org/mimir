using Mb.Models.Application;
using Mb.Models.Data;
using Mimirorg.TypeLibrary.Enums;
using ModelBuilder.Rdf.Models;
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
            if (connection.FromConnectorObject is ConnectorRelation and not ConnectorRelationPartOf)
            {
                var relationString = connection.FromConnectorObject is ConnectorRelationFulfilledBy ? "fulfilledBy" : "hasLocation";
                ontologyService.AssertAspectObject(connection.FromAspectObject, $"imf:{relationString}", connection.ToAspectObject);
            }

            if (connection.ToConnectorObject is ConnectorRelation and not ConnectorRelationPartOf)
            {
                var relationString = connection.ToConnectorObject is ConnectorRelationFulfilledBy ? "fulfilledBy" : "hasLocation";
                ontologyService.AssertAspectObject(connection.ToAspectObject, $"imf:{relationString}", connection.ToAspectObject);
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
        /// <exception cref="InvalidDataException">Throws if aspectObjects and connectors is not defined in RDF file</exception>
        public static void ResolveConnection(this ConnectionAm connection, IOntologyService ontologyService, ProjectAm project, RelationConnector relation, ProjectData projectData)
        {
            var fromAspectObject = project.AspectObjects?.FirstOrDefault(x => x.Iri == relation.ParentIri);
            var toAspectObject = project.AspectObjects?.FirstOrDefault(x => x.Iri == relation.ChildIri);

            if (fromAspectObject == null || toAspectObject == null)
                throw new InvalidDataException($"Can't create an connection. Can't find connected aspectObjects from IRI. From: {fromAspectObject?.Iri} to {toAspectObject?.Iri}");

            var fromConnector = fromAspectObject.Connectors?.OfType<RelationAm>().FirstOrDefault(x => x.Type == ConnectorDirection.Output && x.RelationType == relation.RelationType);
            var toConnector = toAspectObject.Connectors?.OfType<RelationAm>().FirstOrDefault(x => x.Type == ConnectorDirection.Input && x.RelationType == relation.RelationType);

            if (fromConnector == null || toConnector == null)
                throw new InvalidDataException($"Can't create an connection. Can't find connectors from IRI. From: {fromConnector?.Iri} to {toConnector?.Iri}");

            var existingConnection = projectData?.Connections?.FirstOrDefault(x =>
                x.FromConnectorIri == fromConnector.Iri &&
                x.ToConnectorIri == toConnector.Iri &&
                x.FromAspectObjectIri == fromAspectObject.Iri &&
                x.ToAspectObjectIri == toAspectObject.Iri
            );

            connection.Iri = existingConnection != null ? existingConnection.Iri : toAspectObject.Iri.StripAndCreateIdIri();
            connection.MasterProjectIri = toAspectObject.MasterProjectIri;
            connection.ProjectIri = toAspectObject.ProjectIri;
            connection.FromConnectorIri = fromConnector.Iri;
            connection.ToConnectorIri = toConnector.Iri;
            connection.FromAspectObjectIri = fromAspectObject.Iri;
            connection.ToAspectObjectIri = toAspectObject.Iri;
        }
    }
}