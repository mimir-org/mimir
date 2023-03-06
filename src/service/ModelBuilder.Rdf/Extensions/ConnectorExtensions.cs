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
        /// Assert terminalConnector
        /// </summary>
        /// <param name="connector">The terminalConnector to be asserted</param>
        /// <param name="ontologyService">Ontology Service</param>
        /// <param name="ownerIri">The terminalConnector owner IRI</param>
        /// <param name="projectData">Record of ICollections</param>
        /// <param name="connection">Connected Mimir connection</param>
        /// <param name="flowDirection">Default flow direction. Used to define the default flow direction when connector is bi-directional</param>
        /// <exception cref="ArgumentOutOfRangeException"></exception>
        public static void AssertConnector(this Connector connector, IOntologyService ontologyService, string ownerIri, ProjectData projectData, Connection connection, DefaultFlowDirection flowDirection)
        {
            ontologyService.AssertNode(connector.Id, Resources.Domain, connector.Domain, true);
            switch (connector)
            {
                case ConnectorTerminal terminalConnector:
                    ontologyService.AssertNode(terminalConnector.Id, Resources.Type, connection != null ? Resources.StreamTerminal : Resources.FSBTerminal);
                    ontologyService.AssertNode(terminalConnector.Id, Resources.Label, terminalConnector.Name, true);
                    ontologyService.AssertNode(terminalConnector.Id, Resources.TerminalDirectionType, terminalConnector.Direction.ToString(), true);
                    ontologyService.AssertNode(terminalConnector.Id, Resources.LibraryType, terminalConnector.TerminalType);
                    ontologyService.AssertNode(terminalConnector.Id, Resources.HasColor, terminalConnector.Color, true);
                    terminalConnector.TypeReferences.AssertTypeReference(terminalConnector.Id, ontologyService);

                    switch (terminalConnector.Direction)
                    {
                        case ConnectorDirection.Input:
                            ontologyService.AssertNode(ownerIri, Resources.HasInputTerminal, terminalConnector.Id);
                            ontologyService.AssertNode(terminalConnector.Id, Resources.Type, Resources.InputTerminal);

                            if (flowDirection != DefaultFlowDirection.NotSet)
                                ontologyService.AssertNode(terminalConnector.Id, Resources.HasDefaultFlowDirection, flowDirection.ToString(), true);

                            if (connection != null)
                                ontologyService.AssertNode(terminalConnector.Id, Resources.HasNodeFromConnection, connection.FromConnectorIri);
                            break;
                        case ConnectorDirection.Output:
                            ontologyService.AssertNode(ownerIri, Resources.HasOutputTerminal, terminalConnector.Id);
                            ontologyService.AssertNode(terminalConnector.Id, Resources.Type, Resources.OutputTerminal);

                            if (flowDirection != DefaultFlowDirection.NotSet)
                                ontologyService.AssertNode(terminalConnector.Id, Resources.HasDefaultFlowDirection, flowDirection.ToString(), true);

                            if (connection != null)
                                ontologyService.AssertNode(terminalConnector.Id, Resources.HasNodeToConnection, connection.ToConnectorIri);
                            break;
                        case ConnectorDirection.Bidirectional:
                            ontologyService.AssertNode(ownerIri, Resources.HasBidirectionalTerminal, terminalConnector.Id);
                            ontologyService.AssertNode(terminalConnector.Id, Resources.Type, Resources.BidirectionalTerminal);

                            if (flowDirection != DefaultFlowDirection.NotSet)
                                ontologyService.AssertNode(terminalConnector.Id, Resources.HasDefaultFlowDirection, flowDirection.ToString(), true);

                            if (connection != null)
                            {
                                if (flowDirection == DefaultFlowDirection.InputFlow)
                                    ontologyService.AssertNode(terminalConnector.Id, Resources.HasNodeFromConnection, connection.FromConnectorIri);
                                else
                                    ontologyService.AssertNode(terminalConnector.Id, Resources.HasNodeToConnection, connection.ToConnectorIri);
                            }

                            break;
                        default:
                            throw new ArgumentOutOfRangeException();
                    }

                    if (terminalConnector.Attributes != null && terminalConnector.Attributes.Any())
                    {
                        foreach (var attribute in terminalConnector.Attributes)
                        {
                            attribute.AssertAttribute(terminalConnector.Id, ontologyService);
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
        /// Resolve a terminalConnector
        /// </summary>
        /// <param name="terminalConnector">The terminalConnector to resolve</param>
        /// <param name="ontologyService">Ontology Service</param>
        /// <param name="projectData">Project data</param>
        /// <param name="nodeIri">Node IRI</param>
        /// <param name="iri">The terminalConnector IRI</param>
        public static void ResolveTerminal(this ConnectorTerminalAm terminalConnector, IOntologyService ontologyService, ProjectData projectData, string nodeIri, string iri)
        {
            terminalConnector.Iri = iri;
            terminalConnector.NodeIri = nodeIri;
            terminalConnector.Name = ontologyService.GetValue(iri, Resources.Label, false);
            terminalConnector.Type = ontologyService.GetEnumValue<ConnectorDirection>(iri, Resources.TerminalDirectionType, false);
            terminalConnector.ConnectorVisibility = ontologyService.GetEnumValue<ConnectorVisibility>(iri, Resources.Visibility, false);
            terminalConnector.TypeReferences.ResolveTypeReferences(terminalConnector.Iri, ontologyService);

            var isRequiredString = ontologyService.GetValue(iri, Resources.IsRequired, false);
            if (bool.TryParse(isRequiredString, out var isRequired))
                terminalConnector.IsRequired = isRequired;

            terminalConnector.Color = ontologyService.GetValue(iri, Resources.HasColor, false);
            terminalConnector.TerminalTypeId = ontologyService.GetValue(iri, Resources.LibraryType, false);
            terminalConnector.TerminalTypeIri = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.LibraryType)?.Select(x => x.Object).SingleOrDefault()?.ToString();

            var transmitter = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.Type)?.Select(x => x.Object).FirstOrDefault(x => x.ToString().Contains("Transmitter"));
            if (transmitter != null)
            {
                var terminalParentTypeName = transmitter.ToString().Split("Transmitter-").Last().Split("-").First();
                terminalConnector.TerminalParentTypeName = string.IsNullOrWhiteSpace(terminalParentTypeName) ? null : terminalParentTypeName;
            }

            terminalConnector.Attributes = new List<AttributeAm>();
            var attributes = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasPhysicalQuantity).Select(x => x.Object).ToList();

            foreach (var a in attributes)
            {
                var attribute = new AttributeAm();
                attribute.ResolveAttribute(ontologyService, projectData, a.ToString(), null, iri);
                terminalConnector.Attributes.Add(attribute);
            }
        }
    }
}