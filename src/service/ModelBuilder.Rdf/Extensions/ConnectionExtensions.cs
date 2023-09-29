using Mb.Models.Application;
using Mb.Models.Data;
using Mimirorg.TypeLibrary.Enums;
using ModelBuilder.Rdf.Models;
using ModelBuilder.Rdf.Services;

namespace ModelBuilder.Rdf.Extensions;

public static class ConnectionExtensions
{
    /// <summary>
    /// Assert connection to RDF graph
    /// </summary>
    /// <param name="connection">The connection to assert</param>
    /// <param name="ontologyService">Ontology Service</param>
    /// <param name="projectData">Record of ICollections</param>
    public static void AssertConnection(this ConnectionDm connection, IOntologyService ontologyService, ProjectData projectData)
    {
        // TODO: Resolve this later
        //if (connection.FromConnectorObject is ConnectorRelation and not ConnectorPartOf)
        //{
        //    var relationString = connection.FromConnectorObject is ConnectorFulfilledBy ? "fulfilledBy" : "hasLocation";
        //    ontologyService.Assertblock(connection.Fromblock, $"imf:{relationString}", connection.Toblock);
        //}

        //if (connection.ToConnectorObject is ConnectorRelation and not ConnectorPartOf)
        //{
        //    var relationString = connection.ToConnectorObject is ConnectorFulfilledBy ? "fulfilledBy" : "hasLocation";
        //    ontologyService.Assertblock(connection.Toblock, $"imf:{relationString}", connection.Toblock);
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
    /// <exception cref="InvalidDataException">Throws if blocks and connectors is not defined in RDF file</exception>
    public static void ResolveConnection(this ConnectionAm connection, IOntologyService ontologyService, ProjectAm project, RelationConnector relation, ProjectData projectData)
    {
        //var fromblock = project.blocks?.FirstOrDefault(x => x.Id == relation.ParentIri);
        //var toblock = project.blocks?.FirstOrDefault(x => x.Id == relation.ChildIri);

        //if (fromblock == null || toblock == null)
        //    throw new InvalidDataException($"Can't create an connection. Can't find connected blocks from IRI. From: {fromblock?.Id} to {toblock?.Id}");

        //var fromConnector = fromblock.Connectors?.OfType<RelationAm>().FirstOrDefault(x => x.Direction == ConnectorDirection.Output && x.RelationType == relation.RelationType);
        //var toConnector = toblock.Connectors?.OfType<RelationAm>().FirstOrDefault(x => x.Direction == ConnectorDirection.Input && x.RelationType == relation.RelationType);

        //if (fromConnector == null || toConnector == null)
        //    throw new InvalidDataException($"Can't create an connection. Can't find connectors from IRI. From: {fromConnector?.Id} to {toConnector?.Id}");

        //var existingConnection = projectData?.Connections?.FirstOrDefault(x =>
        //    x.FromConnector == fromConnector.Id &&
        //    x.ToConnector == toConnector.Id
        //);

        //connection.Id = existingConnection != null ? existingConnection.Id : toblock.Id.StripAndCreateIdIri();
        //connection.MainProject = toblock.MainProject;
        //connection.Project = toblock.Project;
        //connection.FromConnector = fromConnector.Id;
        //connection.ToConnector = toConnector.Id;
    }
}