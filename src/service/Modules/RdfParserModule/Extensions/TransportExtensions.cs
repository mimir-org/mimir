using System.Collections.Generic;
using System.Linq;
using Mb.Models.Application;
using RdfParserModule.Models;
using RdfParserModule.Properties;
using RdfParserModule.Services;

namespace RdfParserModule.Extensions
{
    public static class TransportExtensions
    {
        public static EdgeAm ResolveTransport(this TransportAm transport, IOntologyService ontologyService, ProjectAm project, string iri, ProjectData projectData)
        {
            var nodeFromConnector = string.Empty;
            var nodeToConnector = string.Empty;
            NodeAm nodeFrom = null;
            NodeAm nodeTo = null;

            transport.Iri = iri;
            transport.Name = ontologyService.GetValue(iri, Resources.Name, false);
            transport.StatusId = "4590637F39B6BA6F39C74293BE9138DF";

            transport.Version = ontologyService.GetValue(iri, Resources.Version, false);
            transport.Rds = ontologyService.GetValue(iri, Resources.MimirRds, false);
            transport.Label = ontologyService.GetValue(iri, Resources.Label, false);
            transport.Description = ontologyService.GetValue(iri, Resources.Desc, false);
            
            transport.UpdatedBy = ontologyService.GetValue(iri, Resources.UpdatedBy, false);
            transport.Updated = ontologyService.GetDateTimeValue(iri, Resources.LastUpdated, false);
            transport.CreatedBy = ontologyService.GetValue(iri, Resources.CreatedBy, false);
            transport.Created = ontologyService.GetDateTimeValue(iri, Resources.Created, false);
            transport.LibraryTypeId = ontologyService.GetValue(iri, Resources.LibraryType, false);

            transport.Attributes = new List<AttributeAm>();
            var attributes = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasPhysicalQuantity).Select(x => x.Object).ToList();
            
            foreach (var a in attributes)
            {
                var attribute = new AttributeAm();
                attribute.ResolveAttribute(ontologyService, a.ToString(), null, null, null, iri, null);
                transport.Attributes.Add(attribute);
            }

            var inputTerminalNode = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasInputTerminal).Select(x => x.Object).SingleOrDefault();
            var outputTerminalNode = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasOutputTerminal).Select(x => x.Object).SingleOrDefault();

            if (inputTerminalNode != null)
            {
                var inputTerminal = new TerminalAm();
                inputTerminal.ResolveTerminal(ontologyService, null, inputTerminalNode.ToString());
                transport.InputTerminal = inputTerminal;
                transport.InputTerminalId = inputTerminalNode.ResolveValue();
                nodeFromConnector = ontologyService
                    .GetTriplesWithSubjectPredicate(inputTerminalNode.ToString(), Resources.HasNodeFromConnection)
                    .Select(x => x.Object).SingleOrDefault()?.ToString();
            }

            if (outputTerminalNode != null)
            {
                var outputTerminal = new TerminalAm();
                outputTerminal.ResolveTerminal(ontologyService, null, outputTerminalNode.ToString());
                transport.OutputTerminal = outputTerminal;
                transport.OutputTerminalId = outputTerminalNode.ResolveValue();
                nodeToConnector = ontologyService
                    .GetTriplesWithSubjectPredicate(outputTerminalNode.ToString(), Resources.HasNodeToConnection)
                    .Select(x => x.Object).SingleOrDefault()?.ToString();
            }

            //if (inputTerminalNode == null && outputTerminalNode == null)
            //{
            //    var inputTerminalNode = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasInputTerminal).Select(x => x.Object).SingleOrDefault();
            //    var outputTerminalNode = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasOutputTerminal).Select(x => x.Object).SingleOrDefault();
            //}

            foreach (var node in project.Nodes)
            {
                if (node.Connectors == null)
                    continue;

                foreach (var connector in node.Connectors)
                {
                    if (connector.Iri == nodeFromConnector)
                        nodeFrom = node;

                    if (connector.Iri == nodeToConnector)
                        nodeTo = node;
                }

                if (nodeFrom != null && nodeTo != null)
                    break;
            }

            var existingEdge = projectData?.Edges?.FirstOrDefault(x =>
                x.FromConnectorIri == nodeFromConnector &&
                x.ToConnectorIri == nodeToConnector &&
                x.FromNodeIri == nodeFrom?.Iri &&
                x.ToNodeIri == nodeTo?.Iri
            );

            var edge = new EdgeAm
            {
                Iri = existingEdge != null ? existingEdge.Iri : nodeTo?.Iri.StripAndCreateIdIri(),
                MasterProjectIri = nodeTo?.MasterProjectIri,
                ProjectIri = nodeTo?.ProjectIri,
                FromConnectorIri = nodeFromConnector,
                ToConnectorIri = nodeToConnector,
                FromNodeIri = nodeFrom?.Iri,
                ToNodeIri = nodeTo?.Iri,
                Transport = transport
            };

            return edge;
        }
    }
}
