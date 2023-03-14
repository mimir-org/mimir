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
            // TODO: Resolve this later
            //if (connection.FromConnectorObject is ConnectorRelation and not ConnectorPartOf)
            //{
            //    var relationString = connection.FromConnectorObject is ConnectorFulfilledBy ? "fulfilledBy" : "hasLocation";
            //    ontologyService.AssertAspectObject(connection.FromAspectObject, $"imf:{relationString}", connection.ToAspectObject);
            //}

            //if (connection.ToConnectorObject is ConnectorRelation and not ConnectorPartOf)
            //{
            //    var relationString = connection.ToConnectorObject is ConnectorFulfilledBy ? "fulfilledBy" : "hasLocation";
            //    ontologyService.AssertAspectObject(connection.ToAspectObject, $"imf:{relationString}", connection.ToAspectObject);
            //}
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
            var fromAspectObject = project.AspectObjects?.FirstOrDefault(x => x.Id == relation.ParentIri);
            var toAspectObject = project.AspectObjects?.FirstOrDefault(x => x.Id == relation.ChildIri);

            if (fromAspectObject == null || toAspectObject == null)
                throw new InvalidDataException($"Can't create an connection. Can't find connected aspectObjects from IRI. From: {fromAspectObject?.Id} to {toAspectObject?.Id}");

            var fromConnector = fromAspectObject.Connectors?.OfType<RelationAm>().FirstOrDefault(x => x.Direction == ConnectorDirection.Output && x.RelationType == relation.RelationType);
            var toConnector = toAspectObject.Connectors?.OfType<RelationAm>().FirstOrDefault(x => x.Direction == ConnectorDirection.Input && x.RelationType == relation.RelationType);

            if (fromConnector == null || toConnector == null)
                throw new InvalidDataException($"Can't create an connection. Can't find connectors from IRI. From: {fromConnector?.Id} to {toConnector?.Id}");

            var existingConnection = projectData?.Connections?.FirstOrDefault(x =>
                x.FromConnector == fromConnector.Id &&
                x.ToConnector == toConnector.Id
            );

            connection.Id = existingConnection != null ? existingConnection.Id : toAspectObject.Id.StripAndCreateIdIri();
            connection.MainProject = toAspectObject.MainProject;
            connection.Project = toAspectObject.Project;
            connection.FromConnector = fromConnector.Id;
            connection.ToConnector = toConnector.Id;
        }
    }
}