using System;
using Mb.Models.Data;
using Mb.Models.Enums;
using RdfParserModule.Properties;
using RdfParserModule.Services;

namespace RdfParserModule.Extensions
{
    public static class EdgeExtensions
    {
        public static void AssertEdge(this Edge edge, IOntologyService ontologyService)
        {
            if (edge.FromConnector is Relation { RelationType: not RelationType.PartOf } fromRelation)
            {
                var relationString = fromRelation.RelationType.ToString().LowerCaseFirstCharacter();
                ontologyService.AssertNode(edge.FromNodeIri, $"imf:{relationString}", edge.ToNodeIri);
            }

            if (edge.ToConnector is Relation { RelationType: not RelationType.PartOf } toRelation)
            {
                var relationString = toRelation.RelationType.ToString().LowerCaseFirstCharacter();
                ontologyService.AssertNode(edge.ToNodeIri, $"imf:{relationString}", edge.FromNodeIri);
            }

            if (edge.Transport != null)
            {
                ontologyService.AssertNode(edge.Transport.Iri, Resources.Type, Resources.Transport);
                ontologyService.AssertNode(edge.Transport.Iri, Resources.Label, edge.Transport.Name, true);
                ontologyService.AssertNode(edge.Transport.Iri, Resources.HasAspect, $"imf:{edge.FromNode.Aspect}");
                //ontologyService.AssertNode(edge.transport.Iri, Resources.hasParent, $"imf:{edge.FromNode.Aspect}");

                if (edge.Transport.InputTerminal != null)
                    edge.AssertStreamTerminal(edge.Transport.Iri, edge.Transport.InputTerminal, ontologyService);

                if (edge.Transport.OutputTerminal != null)
                    edge.AssertStreamTerminal(edge.Transport.Iri, edge.Transport.OutputTerminal, ontologyService);
            }

            if (edge.Interface != null)
            {
                ontologyService.AssertNode(edge.Interface.Iri, Resources.Type, Resources.Interface);
                ontologyService.AssertNode(edge.Interface.Iri, Resources.Label, edge.Interface.Name, true);
                ontologyService.AssertNode(edge.Interface.Iri, Resources.HasAspect, $"imf:{edge.FromNode.Aspect}");
                //ontologyService.AssertNode(edge.Interface.Iri, Resources.hasParent, $"imf:{edge.FromNode.Aspect}");

                if (edge.Interface.InputTerminal != null)
                    edge.AssertStreamTerminal(edge.Interface.Iri, edge.Interface.InputTerminal, ontologyService);

                if (edge.Interface.OutputTerminal != null)
                    edge.AssertStreamTerminal(edge.Interface.Iri, edge.Interface.OutputTerminal, ontologyService);
            }
        }

        private static void AssertStreamTerminal(this Edge edge, string iri, Terminal terminal, IOntologyService ontologyService)
        {
            ontologyService.AssertNode($"eq:Transmitter-{terminal.TerminalCategoryId}-{terminal.Name}", Resources.SubClassOf, Resources.Transmitter);
            ontologyService.AssertNode(terminal.Iri, Resources.Type, $"eq:Transmitter-{terminal.TerminalCategoryId}-{terminal.Name}");
            ontologyService.AssertNode(terminal.Iri, Resources.Domain, terminal.Domain, true);

            string hasTerminal = null;
            string terminalType = null;
            Connector edgeConnector = null;

            switch (terminal.Type)
            {
                case ConnectorType.Input:
                    hasTerminal = Resources.HasInputTerminal;
                    terminalType = Resources.InputTerminal;
                    edgeConnector = edge.FromConnector;
                    break;
                case ConnectorType.Output:
                    hasTerminal = Resources.HasOutputTerminal;
                    terminalType = Resources.OutputTerminal;
                    edgeConnector = edge.ToConnector;
                    break;
                default:
                    throw new ArgumentOutOfRangeException(nameof(terminal.Type), terminal.Type, null);
            }

            if (!string.IsNullOrWhiteSpace(terminalType))
                ontologyService.AssertNode(terminal.Iri, Resources.Type, terminalType);

            if (!string.IsNullOrWhiteSpace(hasTerminal))
                ontologyService.AssertNode(iri, hasTerminal, terminal.Iri);

            ontologyService.AssertNode(terminal.Iri, Resources.Type, Resources.StreamTerminal);
            ontologyService.AssertNode(terminal.Iri, Resources.Type, $"{terminal.Name} {terminal.Type}", true);

            if (edgeConnector != null)
                ontologyService.AssertNode(terminal.Iri, Resources.Label, edgeConnector.Iri);
        }
    }
}