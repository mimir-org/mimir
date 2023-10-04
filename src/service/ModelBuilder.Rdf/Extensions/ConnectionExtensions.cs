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
        //    ontologyService.AssertBlock(connection.FromBlock, $"imf:{relationString}", connection.ToBlock);
        //}

        //if (connection.ToConnectorObject is ConnectorRelation and not ConnectorPartOf)
        //{
        //    var relationString = connection.ToConnectorObject is ConnectorFulfilledBy ? "fulfilledBy" : "hasLocation";
        //    ontologyService.AssertBlock(connection.ToBlock, $"imf:{relationString}", connection.ToBlock);
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
        //var fromBlock = project.blocks?.FirstOrDefault(x => x.Id == relation.ParentIri);
        //var toBlock = project.blocks?.FirstOrDefault(x => x.Id == relation.ChildIri);

        //if (fromBlock == null || toBlock == null)
        //    throw new InvalidDataException($"Can't create an connection. Can't find connected blocks from IRI. From: {fromBlock?.Id} to {toBlock?.Id}");

        //var fromConnector = fromBlock.Connectors?.OfType<RelationAm>().FirstOrDefault(x => x.Direction == ConnectorDirection.Output && x.RelationType == relation.RelationType);
        //var toConnector = toBlock.Connectors?.OfType<RelationAm>().FirstOrDefault(x => x.Direction == ConnectorDirection.Input && x.RelationType == relation.RelationType);

        //if (fromConnector == null || toConnector == null)
        //    throw new InvalidDataException($"Can't create an connection. Can't find connectors from IRI. From: {fromConnector?.Id} to {toConnector?.Id}");

        //var existingConnection = projectData?.Connections?.FirstOrDefault(x =>
        //    x.FromConnector == fromConnector.Id &&
        //    x.ToConnector == toConnector.Id
        //);

        //connection.Id = existingConnection != null ? existingConnection.Id : toBlock.Id.StripAndCreateIdIri();
        //connection.MainProject = toBlock.MainProject;
        //connection.Project = toBlock.Project;
        //connection.FromConnector = fromConnector.Id;
        //connection.ToConnector = toConnector.Id;
    }
}