using System;
using System.Linq;
using Mb.Data.Contracts;
using Mb.Models.Data;
using Mb.Models.Enums;
using RdfParserModule.Properties;
using RdfParserModule.Services;

namespace RdfParserModule.Extensions
{
    public static class ConnectorExtensions
    {
        public static void AssertConnector(this Connector connector, IOntologyService ontologyService, ILibRepository libRepository)
        {
            ontologyService.AssertNode(connector.Iri, Resources.Domain, connector.Domain, true);
            switch (connector)
            {
                case Terminal terminal:
                    ontologyService.AssertNode($"eq:Transmitter-{terminal.TerminalCategoryId}-{terminal.Name}", Resources.SubClassOf, Resources.Transmitter);
                    ontologyService.AssertNode(terminal.Iri, Resources.Type, $"eq:Transmitter-{terminal.TerminalCategoryId}-{terminal.Name}");
                    ontologyService.AssertNode(terminal.Iri, Resources.Type, Resources.FSBTerminal);
                    ontologyService.AssertNode(terminal.Iri, Resources.Label, $"{terminal.Name} {terminal.Type}", true);
                    ontologyService.AssertNode(terminal.Iri, Resources.HasColor, terminal.Color, true);
                    ontologyService.AssertNode(terminal.Iri, Resources.Visibility, terminal.ConnectorVisibility.ToString(), true);
                    switch (terminal.Type)
                    {
                        case ConnectorType.Input:
                            ontologyService.AssertNode(connector.NodeIri, Resources.HasInputTerminal, terminal.Iri);
                            ontologyService.AssertNode(terminal.Iri, Resources.Type, Resources.InputTerminal);
                            break;
                        case ConnectorType.Output:
                            ontologyService.AssertNode(connector.NodeIri, Resources.HasOutputTerminal, terminal.Iri);
                            ontologyService.AssertNode(terminal.Iri, Resources.Type, Resources.OutputTerminal);
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
    }
}