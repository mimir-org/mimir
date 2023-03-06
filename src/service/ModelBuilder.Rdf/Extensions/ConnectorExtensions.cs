using System.Web;
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
        public static object ConnectorType { get; private set; }

        /// <summary>
        /// Assert terminal
        /// </summary>
        /// <param name="connector">The terminal to be asserted</param>
        /// <param name="ontologyService">Ontology Service</param>
        /// <param name="ownerIri">The terminal owner IRI</param>
        /// <param name="projectData">Record of ICollections</param>
        /// <param name="connection">Connected Mimir connection</param>
        /// <param name="flowDirection">Default flow direction. Used to define the default flow direction when connector is bi-directional</param>
        /// <exception cref="ArgumentOutOfRangeException"></exception>
        public static void AssertConnector(this Connector connector, IOntologyService ontologyService, string ownerIri, ProjectData projectData, Connection connection, DefaultFlowDirection flowDirection)
        {
            ontologyService.AssertNode(connector.Iri, Resources.Domain, connector.Domain, true);
            switch (connector)
            {
                case Terminal terminal:
                    ontologyService.AssertNode($"mimir:Transmitter-{HttpUtility.UrlEncode(terminal.TerminalParentTypeName)}-{terminal.Name}", Resources.SubClassOf, Resources.Transmitter);
                    ontologyService.AssertNode(terminal.Iri, Resources.Type, $"mimir:Transmitter-{HttpUtility.UrlEncode(terminal.TerminalParentTypeName)}-{HttpUtility.UrlEncode(terminal.Name)}");
                    ontologyService.AssertNode(terminal.Iri, Resources.Type, connection != null ? Resources.StreamTerminal : Resources.FSBTerminal);
                    ontologyService.AssertNode(terminal.Iri, Resources.Label, terminal.Name, true);
                    ontologyService.AssertNode(terminal.Iri, Resources.TerminalDirectionType, terminal.Type.ToString(), true);
                    ontologyService.AssertNode(terminal.Iri, Resources.LibraryType, terminal.TerminalTypeIri);
                    ontologyService.AssertNode(terminal.Iri, Resources.HasColor, terminal.Color, true);
                    ontologyService.AssertNode(terminal.Iri, Resources.Visibility, terminal.ConnectorVisibility.ToString(), true);
                    ontologyService.AssertNode(terminal.Iri, Resources.IsRequired, terminal.IsRequired.ToString(), true);
                    terminal.TypeReferences.AssertTypeReference(terminal.Iri, ontologyService);

                    switch (terminal.Type)
                    {
                        case ConnectorDirection.Input:
                            ontologyService.AssertNode(ownerIri, Resources.HasInputTerminal, terminal.Iri);
                            ontologyService.AssertNode(terminal.Iri, Resources.Type, Resources.InputTerminal);

                            if (flowDirection != DefaultFlowDirection.NotSet)
                                ontologyService.AssertNode(terminal.Iri, Resources.HasDefaultFlowDirection, flowDirection.ToString(), true);

                            if (connection != null)
                                ontologyService.AssertNode(terminal.Iri, Resources.HasNodeFromConnection, connection.FromConnectorIri);
                            break;
                        case ConnectorDirection.Output:
                            ontologyService.AssertNode(ownerIri, Resources.HasOutputTerminal, terminal.Iri);
                            ontologyService.AssertNode(terminal.Iri, Resources.Type, Resources.OutputTerminal);

                            if (flowDirection != DefaultFlowDirection.NotSet)
                                ontologyService.AssertNode(terminal.Iri, Resources.HasDefaultFlowDirection, flowDirection.ToString(), true);

                            if (connection != null)
                                ontologyService.AssertNode(terminal.Iri, Resources.HasNodeToConnection, connection.ToConnectorIri);
                            break;
                        case ConnectorDirection.Bidirectional:
                            ontologyService.AssertNode(ownerIri, Resources.HasBidirectionalTerminal, terminal.Iri);
                            ontologyService.AssertNode(terminal.Iri, Resources.Type, Resources.BidirectionalTerminal);

                            if (flowDirection != DefaultFlowDirection.NotSet)
                                ontologyService.AssertNode(terminal.Iri, Resources.HasDefaultFlowDirection, flowDirection.ToString(), true);

                            if (connection != null)
                            {
                                if (flowDirection == DefaultFlowDirection.InputFlow)
                                    ontologyService.AssertNode(terminal.Iri, Resources.HasNodeFromConnection, connection.FromConnectorIri);
                                else
                                    ontologyService.AssertNode(terminal.Iri, Resources.HasNodeToConnection, connection.ToConnectorIri);
                            }

                            break;
                        default:
                            throw new ArgumentOutOfRangeException();
                    }

                    if (terminal.Attributes != null && terminal.Attributes.Any())
                    {
                        foreach (var attribute in terminal.Attributes)
                        {
                            attribute.AssertAttribute(terminal.Iri, ontologyService);
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
            return c is Relation { RelationType: RelationType.PartOf };
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
        /// Resolve a terminal
        /// </summary>
        /// <param name="terminal">The terminal to resolve</param>
        /// <param name="ontologyService">Ontology Service</param>
        /// <param name="projectData">Project data</param>
        /// <param name="nodeIri">Node IRI</param>
        /// <param name="iri">The terminal IRI</param>
        public static void ResolveTerminal(this TerminalAm terminal, IOntologyService ontologyService, ProjectData projectData, string nodeIri, string iri)
        {
            terminal.Iri = iri;
            terminal.NodeIri = nodeIri;
            terminal.Name = ontologyService.GetValue(iri, Resources.Label, false);
            terminal.Type = ontologyService.GetEnumValue<ConnectorDirection>(iri, Resources.TerminalDirectionType, false);
            terminal.ConnectorVisibility = ontologyService.GetEnumValue<ConnectorVisibility>(iri, Resources.Visibility, false);
            terminal.TypeReferences.ResolveTypeReferences(terminal.Iri, ontologyService);

            var isRequiredString = ontologyService.GetValue(iri, Resources.IsRequired, false);
            if (bool.TryParse(isRequiredString, out var isRequired))
                terminal.IsRequired = isRequired;

            terminal.Color = ontologyService.GetValue(iri, Resources.HasColor, false);
            terminal.TerminalTypeId = ontologyService.GetValue(iri, Resources.LibraryType, false);
            terminal.TerminalTypeIri = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.LibraryType)?.Select(x => x.Object).SingleOrDefault()?.ToString();

            var transmitter = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.Type)?.Select(x => x.Object).FirstOrDefault(x => x.ToString().Contains("Transmitter"));
            if (transmitter != null)
            {
                var terminalParentTypeName = transmitter.ToString().Split("Transmitter-").Last().Split("-").First();
                terminal.TerminalParentTypeName = string.IsNullOrWhiteSpace(terminalParentTypeName) ? null : terminalParentTypeName;
            }

            terminal.Attributes = new List<AttributeAm>();
            var attributes = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasPhysicalQuantity).Select(x => x.Object).ToList();

            foreach (var a in attributes)
            {
                var attribute = new AttributeAm();
                attribute.ResolveAttribute(ontologyService, projectData, a.ToString(), null, iri);
                terminal.Attributes.Add(attribute);
            }
        }
    }
}