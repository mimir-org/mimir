using System.Collections.Generic;
using System.Linq;
using Mb.Models.Application;
using RdfParserModule.Models;
using RdfParserModule.Properties;
using RdfParserModule.Services;

namespace RdfParserModule.Extensions
{
    public static class InterfaceExtensions
    {
        public static EdgeAm ResolveInterface(this InterfaceAm inter, IOntologyService ontologyService, ProjectAm project, string iri, ProjectData projectData)
        {
            var nodeFromConnector = string.Empty;
            var nodeToConnector = string.Empty;
            NodeAm nodeFrom = null;
            NodeAm nodeTo = null;

            inter.Iri = iri;
            inter.Name = ontologyService.GetValue(iri, Resources.Name, false);
            inter.StatusId = "4590637F39B6BA6F39C74293BE9138DF";

            inter.Version = ontologyService.GetValue(iri, Resources.Version, false);
            inter.Rds = ontologyService.GetValue(iri, Resources.MimirRds, false);
            inter.Label = ontologyService.GetValue(iri, Resources.Label, false);
            inter.Description = ontologyService.GetValue(iri, Resources.Desc, false);

            inter.UpdatedBy = ontologyService.GetValue(iri, Resources.UpdatedBy, false);
            inter.Updated = ontologyService.GetDateTimeValue(iri, Resources.LastUpdated, false);
            inter.CreatedBy = ontologyService.GetValue(iri, Resources.CreatedBy, false);
            inter.Created = ontologyService.GetDateTimeValue(iri, Resources.Created, false);
            inter.LibraryTypeId = ontologyService.GetValue(iri, Resources.LibraryType, false);

            inter.Attributes = new List<AttributeAm>();
            var attributes = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasPhysicalQuantity).Select(x => x.Object).ToList();

            foreach (var a in attributes)
            {
                var attribute = new AttributeAm();
                attribute.ResolveAttribute(ontologyService, a.ToString(), null, null, null, iri, null);
                inter.Attributes.Add(attribute);
            }

            var inputTerminalNode = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasInputTerminal).Select(x => x.Object).SingleOrDefault();
            var outputTerminalNode = ontologyService.GetTriplesWithSubjectPredicate(iri, Resources.HasOutputTerminal).Select(x => x.Object).SingleOrDefault();

            if (inputTerminalNode != null)
            {
                var inputTerminal = new TerminalAm();
                inputTerminal.ResolveTerminal(ontologyService, null, inputTerminalNode.ToString());
                inter.InputTerminal = inputTerminal;
                inter.InputTerminalId = inputTerminalNode.ResolveValue();
                nodeFromConnector = ontologyService
                    .GetTriplesWithSubjectPredicate(inputTerminalNode.ToString(), Resources.HasNodeFromConnection)
                    .Select(x => x.Object).SingleOrDefault()?.ToString();
            }

            if (outputTerminalNode != null)
            {
                var outputTerminal = new TerminalAm();
                outputTerminal.ResolveTerminal(ontologyService, null, outputTerminalNode.ToString());
                inter.OutputTerminal = outputTerminal;
                inter.OutputTerminalId = outputTerminalNode.ResolveValue();
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
                Interface = inter
            };

            return edge;
        }
    }
}
