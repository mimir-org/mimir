using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mimirorg.TypeLibrary.Enums;
using ModelBuilder.Rdf.Models;
using ModelBuilder.Rdf.Properties;
using ModelBuilder.Rdf.Services;

namespace ModelBuilder.Rdf.Extensions
{
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
            ontologyService.AssertNode(connector.Id, Resources.Domain, connector.Domain, true);
            switch (connector)
            {
                case ConnectorTerminal connectorTerminal:
                    ontologyService.AssertNode(connectorTerminal.Id, Resources.Type, connection != null ? Resources.StreamTerminal : Resources.FSBTerminal);
                    ontologyService.AssertNode(connectorTerminal.Id, Resources.Label, connectorTerminal.Name, true);
                    ontologyService.AssertNode(connectorTerminal.Id, Resources.TerminalDirectionType, connectorTerminal.Direction.ToString(), true);
                    ontologyService.AssertNode(connectorTerminal.Id, Resources.LibraryType, connectorTerminal.TerminalType);
                    ontologyService.AssertNode(connectorTerminal.Id, Resources.HasColor, connectorTerminal.Color, true);
                    connectorTerminal.TypeReferences.AssertTypeReference(connectorTerminal.Id, ontologyService);

                    switch (connectorTerminal.Direction)
                    {
                        case ConnectorDirection.Input:
                            ontologyService.AssertNode(ownerIri, Resources.HasInputTerminal, connectorTerminal.Id);
                            ontologyService.AssertNode(connectorTerminal.Id, Resources.Type, Resources.InputTerminal);

                            if (flowDirection != DefaultFlowDirection.NotSet)
                                ontologyService.AssertNode(connectorTerminal.Id, Resources.HasDefaultFlowDirection, flowDirection.ToString(), true);

                            if (connection != null)
                                ontologyService.AssertNode(connectorTerminal.Id, Resources.HasNodeFromConnection, connection.FromConnectorIri);
                            break;
                        case ConnectorDirection.Output:
                            ontologyService.AssertNode(ownerIri, Resources.HasOutputTerminal, connectorTerminal.Id);
                            ontologyService.AssertNode(connectorTerminal.Id, Resources.Type, Resources.OutputTerminal);

                            if (flowDirection != DefaultFlowDirection.NotSet)
                                ontologyService.AssertNode(connectorTerminal.Id, Resources.HasDefaultFlowDirection, flowDirection.ToString(), true);

                            if (connection != null)
                                ontologyService.AssertNode(connectorTerminal.Id, Resources.HasNodeToConnection, connection.ToConnectorIri);
                            break;
                        case ConnectorDirection.Bidirectional:
                            ontologyService.AssertNode(ownerIri, Resources.HasBidirectionalTerminal, connectorTerminal.Id);
                            ontologyService.AssertNode(connectorTerminal.Id, Resources.Type, Resources.BidirectionalTerminal);

                            if (flowDirection != DefaultFlowDirection.NotSet)
                                ontologyService.AssertNode(connectorTerminal.Id, Resources.HasDefaultFlowDirection, flowDirection.ToString(), true);

                            if (connection != null)
                            {
                                if (flowDirection == DefaultFlowDirection.InputFlow)
                                    ontologyService.AssertNode(connectorTerminal.Id, Resources.HasNodeFromConnection, connection.FromConnectorIri);
                                else
                                    ontologyService.AssertNode(connectorTerminal.Id, Resources.HasNodeToConnection, connection.ToConnectorIri);
                            }

                            break;
                        default:
                            throw new ArgumentOutOfRangeException();
                    }

                    if (connectorTerminal.Attributes != null && connectorTerminal.Attributes.Any())
                    {
                        foreach (var attribute in connectorTerminal.Attributes)
                        {
                            attribute.AssertAttribute(connectorTerminal.Id, ontologyService);
                            attribute.AssertAttributeValue(ontologyService, projectData);
                        }
                    }

                    break;
            }
        }

        /// <summary>
        /// Check if connector is of type part of
        /// </summary>
        /// <param name="c"></param>
        /// <returns></returns>
        public static bool IsPartOf(this Connector c)
        {
            return c is ConnectorPartOf;
        }

        /// <summary>
        /// Check if connector is connected
        /// </summary>
        /// <param name="c"></param>
        /// <param name="project"></param>
        /// <returns></returns>
        public static bool IsConnected(this Connector c, Project project)
        {
            return project.Connections.Any(connection => connection.FromConnectorId == c.Id || connection.ToConnectorId == c.Id);
        }

        /// <summary>
        /// Resolve a connectorTerminal
        /// </summary>
        /// <param name="connectorTerminal">The connectorTerminal to resolve</param>
        /// <param name="ontologyService">Ontology Service</param>
        /// <param name="projectData">Project data</param>
        /// <param name="nodeIri">Node IRI</param>
        /// <param name="iri">The connectorTerminal IRI</param>
        public static void ResolveTerminal(this ConnectorTerminalAm connectorTerminal, IOntologyService ontologyService, ProjectData projectData, string nodeIri, string iri)
        {
            connectorTerminal.Iri = iri;
            connectorTerminal.NodeIri = nodeIri;
            connectorTerminal.Name = ontologyService.GetValue(iri, Resources.Label, false);
            connectorTerminal.Type = ontologyService.GetEnumValue<ConnectorDirection>(iri, Resources.TerminalDirectionType, false);
            connectorTerminal.ConnectorVisibility = ontologyService.GetEnumValue<ConnectorVisibility>(iri, Resources.Visibility, false);
            connectorTerminal.TypeReferences.ResolveTypeReferences(connectorTerminal.Iri, ontologyService);

            var isRequiredString = ontologyService.GetValue(iri, Resources.IsRequired, false);
            if (bool.TryParse(isRequiredString, out var isRequired))
                connectorTerminal.IsRequired = isRequired;

            connectorTerminal.Color = ontologyService.GetValue(iri, Resources.HasColor, false);
            connectorTerminal.TerminalTypeId = ontologyService.GetValue(iri, Resources.LibraryType, false);
            connectorTerminal.TerminalTypeIri = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.LibraryType)?.Select(x => x.Object).SingleOrDefault()?.ToString();

            var transmitter = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.Type)?.Select(x => x.Object).FirstOrDefault(x => x.ToString().Contains("Transmitter"));
            if (transmitter != null)
            {
                var terminalParentTypeName = transmitter.ToString().Split("Transmitter-").Last().Split("-").First();
                connectorTerminal.TerminalParentTypeName = string.IsNullOrWhiteSpace(terminalParentTypeName) ? null : terminalParentTypeName;
            }

            connectorTerminal.Attributes = new List<AttributeAm>();
            var attributes = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasPhysicalQuantity).Select(x => x.Object).ToList();

            foreach (var a in attributes)
            {
                var attribute = new AttributeAm();
                attribute.ResolveAttribute(ontologyService, projectData, a.ToString(), null, iri);
                connectorTerminal.Attributes.Add(attribute);
            }
        }
    }
}