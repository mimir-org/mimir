using System;
using System.Collections.Generic;
using System.Linq;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;
using RdfParserModule.Properties;
using RdfParserModule.Services;

namespace RdfParserModule.Extensions
{
    public static class ConnectorExtensions
    {
        public static void AssertConnector(this Connector connector, IOntologyService ontologyService, string ownerIri, ILibRepository libRepository, Edge edge)
        {
            ontologyService.AssertNode(connector.Iri, Resources.Domain, connector.Domain, true);
            switch (connector)
            {
                case Terminal terminal:
                    ontologyService.AssertNode($"eq:Transmitter-{terminal.TerminalCategoryId}-{terminal.Name}", Resources.SubClassOf, Resources.Transmitter);
                    ontologyService.AssertNode(terminal.Iri, Resources.Type, $"eq:Transmitter-{terminal.TerminalCategoryId}-{terminal.Name}");
                    ontologyService.AssertNode(terminal.Iri, Resources.Type, edge != null ? Resources.StreamTerminal : Resources.FSBTerminal);
                    ontologyService.AssertNode(terminal.Iri, Resources.Label, terminal.Name, true);
                    ontologyService.AssertNode(terminal.Iri, Resources.TerminalDirectionType, terminal.Type.ToString(), true);
                    ontologyService.AssertNode(terminal.Iri, Resources.LibraryType, terminal.TerminalTypeIri);
                    ontologyService.AssertNode(terminal.Iri, Resources.HasColor, terminal.Color, true);
                    ontologyService.AssertNode(terminal.Iri, Resources.Visibility, terminal.ConnectorVisibility.ToString(), true);
                    ontologyService.AssertNode(terminal.Iri, Resources.IsRequired, terminal.IsRequired.ToString(), true);
                    
                    switch (terminal.Type)
                    {
                        case ConnectorType.Input:
                            ontologyService.AssertNode(ownerIri, Resources.HasInputTerminal, terminal.Iri);
                            ontologyService.AssertNode(terminal.Iri, Resources.Type, Resources.InputTerminal);
                            
                            if(edge != null)
                                ontologyService.AssertNode(terminal.Iri, Resources.HasNodeFromConnection, edge.FromConnectorIri);
                            break;
                        case ConnectorType.Output:
                            ontologyService.AssertNode(ownerIri, Resources.HasOutputTerminal, terminal.Iri);
                            ontologyService.AssertNode(terminal.Iri, Resources.Type, Resources.OutputTerminal);
                            
                            if (edge != null)
                                ontologyService.AssertNode(terminal.Iri, Resources.HasNodeToConnection, edge.ToConnectorIri);
                            break;
                        default:
                            throw new ArgumentOutOfRangeException();
                    }

                    if (terminal.Attributes != null && terminal.Attributes.Any())
                    {
                        foreach (var attribute in terminal.Attributes)
                        {
                            attribute.AssertAttribute(terminal.Iri, ontologyService);
                            attribute.AssertAttributeValue(ontologyService, libRepository);
                        }
                    }
                    break;
            }
        }

        public static bool IsPartOf(this Connector c)
        {
            return c is Relation { RelationType: RelationType.PartOf };
        }

        public static Connector GetParentConnector(this Connector c, Project project)
        {
            if (c.IsChildConnector() && c.IsConnected(project))
            {
                return (from edge in project.Edges where edge.ToConnectorId == c.Id select edge.FromConnector).FirstOrDefault();
            }
            return null;
        }

        public static bool IsChildConnector(this Connector c)
        {
            return c is Relation { RelationType: RelationType.PartOf, Type: ConnectorType.Input };
        }

        public static bool IsParentConnector(this Connector c)
        {
            return c is Relation { RelationType: RelationType.PartOf, Type: ConnectorType.Output };
        }

        public static Connector ConnectedTo(this Connector c, Project project)
        {
            return (from edge in project.Edges where edge.FromConnectorId == c.Id select edge.ToConnector).FirstOrDefault();
        }

        public static bool IsConnected(this Connector c, Project project)
        {
            return project.Edges.Any(edge => edge.FromConnectorId == c.Id || edge.ToConnectorId == c.Id);
        }

        /// <summary>
        /// Resolve a terminal
        /// </summary>
        /// <param name="terminal">The terminal to resolve</param>
        /// <param name="ontologyService">Ontology Service</param>
        /// <param name="nodeIri">Node IRI</param>
        /// <param name="iri">The terminal IRI</param>
        public static void ResolveTerminal(this TerminalAm terminal, IOntologyService ontologyService, string nodeIri, string iri)
        {
            terminal.Iri = iri;
            terminal.NodeIri = nodeIri;
            terminal.Name = ontologyService.GetValue(iri, Resources.Label, false);
            terminal.Type = ontologyService.GetEnumValue<ConnectorType>(iri, Resources.TerminalDirectionType, false);
            terminal.ConnectorVisibility = ontologyService.GetEnumValue<ConnectorVisibility>(iri, Resources.Visibility, false);
            
            var isRequiredString = ontologyService.GetValue(iri, Resources.IsRequired, false);
            if(bool.TryParse(isRequiredString, out var isRequired))
                terminal.IsRequired = isRequired;

            terminal.Color = ontologyService.GetValue(iri, Resources.HasColor, false);
            terminal.TerminalTypeId = ontologyService.GetValue(iri, Resources.LibraryType, false);
            terminal.TerminalTypeIri = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.LibraryType)?.Select(x => x.Object).SingleOrDefault()?.ToString();
            
            var transmitter = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.Type)?.Select(x => x.Object).FirstOrDefault(x => x.ToString().Contains("Transmitter"));
            if (transmitter != null)
            {
                var terminalCategoryId = transmitter.ToString().Split("Transmitter-").Last().Split("-").First();
                terminal.TerminalCategoryId = terminalCategoryId;
            }

            terminal.Attributes = new List<AttributeAm>();
            var attributes = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasPhysicalQuantity).Select(x => x.Object).ToList();

            foreach (var a in attributes)
            {
                var attribute = new AttributeAm();
                attribute.ResolveAttribute(ontologyService, a.ToString(), null, null, iri, null, null);
                terminal.Attributes.Add(attribute);
            }
        }
    }
}