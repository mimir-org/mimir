using Mb.Models.Application;
using Mb.Models.Data;
using Mimirorg.Common.Extensions;
using Mimirorg.TypeLibrary.Enums;
using ModelBuilder.Rdf.Models;
using ModelBuilder.Rdf.Properties;
using ModelBuilder.Rdf.Services;

namespace ModelBuilder.Rdf.Extensions;

public static class ConnectorExtensions
{
    /// <summary>
    /// Assert connectorTerminal
    /// </summary>
    /// <param name="connector">The connectorTerminal to be asserted</param>
    /// <param name="ontologyService">Ontology Service</param>
    /// <param name="ownerIri">The connectorTerminal owner IRI</param>
    /// <param name="projectData">Record of ICollections</param>
    /// <param name="connection">Connected Mimir connection</param>
    /// <param name="flowDirection">Default flow direction. Used to define the default flow direction when connector is bi-directional</param>
    /// <exception cref="ArgumentOutOfRangeException"></exception>
    public static void AssertConnector(this Connector connector, IOntologyService ontologyService, string ownerIri, ProjectData projectData, Connection connection, DefaultFlowDirection flowDirection)
    {
        ontologyService.AssertBlock(connector.Id.ToString(), Resources.Domain, connector.Id.ToString().ResolveDomain(), true);
        switch (connector)
        {
            case Connector connectorTerminal:
                ontologyService.AssertBlock(connectorTerminal.Id.ToString(), Resources.Type, connection != null ? Resources.StreamTerminal : Resources.FSBTerminal);
                ontologyService.AssertBlock(connectorTerminal.Id.ToString(), Resources.Label, connectorTerminal.Name, true);
                ontologyService.AssertBlock(connectorTerminal.Id.ToString(), Resources.TerminalDirectionType, connectorTerminal.Direction.ToString(), true);
                                ontologyService.AssertBlock(connectorTerminal.Id.ToString(), Resources.HasColor, connectorTerminal.Color, true);

                switch (connectorTerminal.Direction)
                {
                    case ConnectorDirection.Input:
                        ontologyService.AssertBlock(ownerIri, Resources.HasInputTerminal, connectorTerminal.Id.ToString());
                        ontologyService.AssertBlock(connectorTerminal.Id.ToString(), Resources.Type, Resources.InputTerminal);

                        if (flowDirection != DefaultFlowDirection.NotSet)
                            ontologyService.AssertBlock(connectorTerminal.Id.ToString(), Resources.HasDefaultFlowDirection, flowDirection.ToString(), true);

                        if (connection != null)
                            ontologyService.AssertBlock(connectorTerminal.Id.ToString(), Resources.HasBlockFromConnection, connection.FromConnector);
                        break;
                    case ConnectorDirection.Output:
                        ontologyService.AssertBlock(ownerIri, Resources.HasOutputTerminal, connectorTerminal.Id.ToString());
                        ontologyService.AssertBlock(connectorTerminal.Id.ToString(), Resources.Type, Resources.OutputTerminal);

                        if (flowDirection != DefaultFlowDirection.NotSet)
                            ontologyService.AssertBlock(connectorTerminal.Id.ToString(), Resources.HasDefaultFlowDirection, flowDirection.ToString(), true);

                        if (connection != null)
                            ontologyService.AssertBlock(connectorTerminal.Id.ToString(), Resources.HasBlockToConnection, connection.ToConnector);
                        break;
                    case ConnectorDirection.Bidirectional:
                        ontologyService.AssertBlock(ownerIri, Resources.HasBidirectionalTerminal, connectorTerminal.Id.ToString());
                        ontologyService.AssertBlock(connectorTerminal.Id.ToString(), Resources.Type, Resources.BidirectionalTerminal);

                        if (flowDirection != DefaultFlowDirection.NotSet)
                            ontologyService.AssertBlock(connectorTerminal.Id.ToString(), Resources.HasDefaultFlowDirection, flowDirection.ToString(), true);

                        if (connection != null)
                        {
                            if (flowDirection == DefaultFlowDirection.InputFlow)
                                ontologyService.AssertBlock(connectorTerminal.Id.ToString(), Resources.HasBlockFromConnection, connection.FromConnector);
                            else
                                ontologyService.AssertBlock(connectorTerminal.Id.ToString(), Resources.HasBlockToConnection, connection.ToConnector);
                        }

                        break;
                    default:
                        throw new ArgumentOutOfRangeException();
                }

                if (connectorTerminal.Attributes != null && connectorTerminal.Attributes.Any())
                {
                    foreach (var attribute in connectorTerminal.Attributes)
                    {
                        attribute.AssertAttribute(connectorTerminal.Id.ToString(), ontologyService);
                        attribute.AssertAttributeValue(ontologyService, projectData);
                    }
                }

                break;
        }
    }


}