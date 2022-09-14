using Mb.Models.Application;
using ModelBuilder.Rdf.Models;
using ModelBuilder.Rdf.Properties;
using ModelBuilder.Rdf.Services;

namespace ModelBuilder.Rdf.Extensions
{
    public static class TransportExtensions
    {
        /// <summary>
        /// Resolve transport from RDF graph
        /// </summary>
        /// <param name="transport">The transport that should be resolved</param>
        /// <param name="ontologyService">Ontology Service</param>
        /// <param name="project">Current project</param>
        /// <param name="iri">The transport IRI</param>
        /// <param name="projectData">Project data</param>
        /// <returns>The created edge with transport</returns>
        public static EdgeAm ResolveTransport(this TransportAm transport, IOntologyService ontologyService, ProjectAm project, string iri, ProjectData projectData)
        {
            var nodeFromConnector = string.Empty;
            var nodeToConnector = string.Empty;
            NodeAm nodeFrom = null;
            NodeAm nodeTo = null;

            transport.Iri = iri;
            transport.Name = ontologyService.GetValue(iri, Resources.Name, false);

            transport.Version = ontologyService.GetValue(iri, Resources.Version, false);
            transport.Rds = ontologyService.GetValue(iri, Resources.MimirRds, false);
            transport.Label = ontologyService.GetValue(iri, Resources.Label, false);
            transport.Description = ontologyService.GetValue(iri, Resources.Desc, false);

            transport.UpdatedBy = ontologyService.GetValue(iri, Resources.UpdatedBy, false);
            transport.Updated = ontologyService.GetDateTimeValue(iri, Resources.LastUpdated, false);
            transport.CreatedBy = ontologyService.GetValue(iri, Resources.CreatedBy, false);
            transport.Created = ontologyService.GetDateTimeValue(iri, Resources.Created, false);
            transport.LibraryTypeId = ontologyService.GetValue(iri, Resources.LibraryType, false);
            transport.TypeReferences.ResolveTypeReferences(transport.Iri, ontologyService);

            transport.Attributes = new List<AttributeAm>();
            var attributes = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasPhysicalQuantity).Select(x => x.Object).ToList();

            foreach (var a in attributes)
            {
                var attribute = new AttributeAm();
                attribute.ResolveAttribute(ontologyService, projectData, a.ToString(), null, null, null, iri, null);
                transport.Attributes.Add(attribute);
            }

            var inputTerminalNode = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasInputTerminal).Select(x => x.Object).SingleOrDefault();
            var outputTerminalNode = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasOutputTerminal).Select(x => x.Object).SingleOrDefault();
            var bidirectionalTerminalNodes = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasBidirectionalTerminal).Select(x => x.Object).ToList();

            if (bidirectionalTerminalNodes.Count == 2)
            {
                var defaultFlowDirection = ontologyService.GetEnumValue<DefaultFlowDirection>(bidirectionalTerminalNodes.First().ToString(), Resources.HasDefaultFlowDirection);
                if (defaultFlowDirection == DefaultFlowDirection.InputFlow)
                {
                    inputTerminalNode = bidirectionalTerminalNodes.First();
                    outputTerminalNode = bidirectionalTerminalNodes.Last();
                }
                else
                {
                    inputTerminalNode = bidirectionalTerminalNodes.Last();
                    outputTerminalNode = bidirectionalTerminalNodes.First();
                }
            }

            if (inputTerminalNode != null)
            {
                var inputTerminal = new TerminalAm();
                inputTerminal.ResolveTerminal(ontologyService, projectData, null, inputTerminalNode.ToString());
                transport.InputTerminal = inputTerminal;
                transport.InputTerminalId = inputTerminalNode.ResolveValue(false);
                inputTerminal.Id = transport.InputTerminalId;
                nodeFromConnector = ontologyService
                    .GetTriplesWithSubjectPredicate(inputTerminalNode.ToString(), Resources.HasNodeFromConnection)
                    .Select(x => x.Object).SingleOrDefault()?.ToString();
            }

            if (outputTerminalNode != null)
            {
                var outputTerminal = new TerminalAm();
                outputTerminal.ResolveTerminal(ontologyService, projectData, null, outputTerminalNode.ToString());
                transport.OutputTerminal = outputTerminal;
                transport.OutputTerminalId = outputTerminalNode.ResolveValue(false);
                outputTerminal.Id = transport.OutputTerminalId;
                nodeToConnector = ontologyService
                    .GetTriplesWithSubjectPredicate(outputTerminalNode.ToString(), Resources.HasNodeToConnection)
                    .Select(x => x.Object).SingleOrDefault()?.ToString();
            }

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