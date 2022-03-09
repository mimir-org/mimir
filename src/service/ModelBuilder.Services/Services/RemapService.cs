using System.Collections.Generic;
using System.Linq;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Common;
using Mb.Models.Const;
using Mb.Models.Enums;
using Mb.Models.Extensions;
using Mb.Services.Contracts;

namespace Mb.Services.Services
{
    public class RemapService : IRemapService
    {
        private readonly ICommonRepository _commonRepository;

        #region Constructors

        public RemapService(ICommonRepository commonRepository)
        {
            _commonRepository = commonRepository;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Remap a project
        /// </summary>
        /// <param name="project">ProjectAm</param>
        /// <returns>IDictionary&lt;string, string&gt;</returns>
        /// <remarks>The remap function will create new id's on project and all sub objects, if the
        /// id is missing or legal.The function will also create iri for all objects.</remarks>
        public IDictionary<string, string> Remap(ProjectAm project)
        {
            var remap = new Dictionary<string, string>();
            var r = new ReplacementId { FromId = project.Id, FromIri = project.Iri };
            var replacement = _commonRepository.CreateOrUseIdAndIri(r);

            project.Nodes = RemapNodes(replacement, project.Nodes, project.Edges, remap, false).ToList();
            project.Edges = RemapEdges(replacement, project.Edges, remap, false).ToList();

            project.Id = replacement.ToId;
            project.Iri = replacement.ToIri;

            return remap;
        }

        /// <summary>
        /// Clone a project
        /// </summary>
        /// <param name="project">ProjectAm</param>
        /// <returns>IDictionary&lt;string, string&gt;</returns>
        /// <remarks>The clone function will create a new project and sub objects, based on
        /// the predefined object.</remarks>
        public IDictionary<string, string> Clone(ProjectAm project)
        {
            var remap = new Dictionary<string, string>();
            var r = new ReplacementId();
            var replacement = _commonRepository.CreateOrUseIdAndIri(r);

            // Need to set this if there is a clone after new Id and Iri is created
            replacement.FromId = project.Id;
            replacement.FromIri = project.Iri;

            // We need to connect parentless edges to root nodes of same aspect
            RemapParentlessEdges(project);

            // We need to remove edges that misses connected node
            var edgesToDelete = project.GetNotConnectedEdges().ToList();
            project.Edges = project.Edges.Where(x => edgesToDelete.All(y => x.Id != y.Id)).ToList();

            // Create deep clone of whole project
            project.Nodes = RemapNodes(replacement, project.Nodes, project.Edges, remap, true).ToList();
            project.Edges = RemapEdges(replacement, project.Edges, remap, true).ToList();

            project.Id = replacement.ToId;
            project.Iri = replacement.ToIri;

            return remap;
        }

        /// <summary>
        /// Remap a collection of nodes and all sub objects.
        /// </summary>
        /// <param name="project">ReplacementId</param>
        /// <param name="nodes">ICollection&lt;NodeAm&gt; nodes</param>
        /// <param name="edges">ICollection&lt;EdgeAm&gt; edges</param>
        /// <param name="remap">Dictionary&lt;string, string&gt; remap</param>
        /// <param name="createCopy">bool</param>
        /// <returns>IEnumerable&lt;NodeAm&gt;</returns>
        /// <remarks>If id is not correct, it will create new unique id's for all nodes and children objects.
        /// The createCopy parameter will always create new id's for all objects, and make a deep copy. The remap function will also create iri.</remarks>
        public IEnumerable<NodeAm> RemapNodes(ReplacementId project, ICollection<NodeAm> nodes, ICollection<EdgeAm> edges, Dictionary<string, string> remap, bool createCopy)
        {
            if (nodes == null || !nodes.Any())
                yield break;

            foreach (var node in nodes)
            {
                var r = createCopy ? new ReplacementId() : new ReplacementId { FromId = node.Id, FromIri = node.Iri };
                var nodeReplacement = _commonRepository.CreateOrUseIdAndIri(r);

                // Need to set this if there is a clone after new Id and Iri is created
                nodeReplacement.FromId = node.Id;
                nodeReplacement.FromIri = node.Iri;

                if (nodeReplacement.FromId != nodeReplacement.ToId)
                    remap.Add(nodeReplacement.ToId, nodeReplacement.FromId);

                node.Simples = RemapSimples(nodeReplacement, node.Simples, createCopy).ToList();
                node.Connectors = RemapConnectors(nodeReplacement, node.Connectors, edges, createCopy).ToList();
                var attr = RemapAttributes(nodeReplacement, node.Attributes, createCopy).ToList();
                node.Attributes = attr.Any() ? attr : null;

                node.Id = nodeReplacement.ToId;
                node.Iri = nodeReplacement.ToIri;
                node.ProjectId = project.ToId;
                node.ProjectIri = project.ToIri;

                if (string.IsNullOrWhiteSpace(node.MasterProjectId))
                    node.MasterProjectId = project.ToId;

                if (string.IsNullOrEmpty(node.MasterProjectIri) || !node.MasterProjectIri.IsValidIri())
                    node.MasterProjectIri = project.ToIri;

                yield return node;
            }
        }

        /// <summary>
        /// Remap a collection of edges and all sub objects.
        /// </summary>
        /// <param name="project">ReplacementId</param>
        /// <param name="edges">ICollection&lt;EdgeAm&gt;</param>
        /// <param name="remap">Dictionary&lt;string, string&gt;</param>
        /// <param name="createCopy">bool</param>
        /// <returns>IEnumerable&lt;EdgeAm&gt;</returns>
        /// <remarks>If id is not correct, it will create new unique id's for all edges and children objects.
        /// The createCopy parameter will always create new id's for all objects, and make a deep copy. The remap function will also create iri.</remarks>
        public IEnumerable<EdgeAm> RemapEdges(ReplacementId project, ICollection<EdgeAm> edges, Dictionary<string, string> remap, bool createCopy)
        {
            if (edges == null || !edges.Any())
                yield break;

            foreach (var edge in edges)
            {
                var r = createCopy ? new ReplacementId() : new ReplacementId { FromId = edge.Id, FromIri = edge.Iri };
                var edgeReplacement = _commonRepository.CreateOrUseIdAndIri(r);

                // Need to set this if there is a clone after new Id and Iri is created
                edgeReplacement.FromId = edge.Id;
                edgeReplacement.FromIri = edge.Iri;

                if (edgeReplacement.FromId != edgeReplacement.ToId && !string.IsNullOrWhiteSpace(edgeReplacement.FromId) || edgeReplacement.FromIri != edgeReplacement.ToId && !string.IsNullOrWhiteSpace(edgeReplacement.FromIri))
                    remap.Add(edgeReplacement.ToId, edgeReplacement.FromId);

                edge.Transport = RemapTransport(edge.Transport, createCopy);
                edge.Interface = RemapInterface(edge.Interface, createCopy);

                edge.Id = edgeReplacement.ToId;
                edge.Iri = edgeReplacement.ToIri;
                edge.ProjectId = project.ToId;
                edge.ProjectIri = project.ToIri;

                var toConnectorReplacement = _commonRepository.CreateOrUseIdAndIri(new ReplacementId { FromId = edge.ToConnectorId, FromIri = edge.ToConnectorIri });
                var fromConnectorReplacement = _commonRepository.CreateOrUseIdAndIri(new ReplacementId { FromId = edge.FromConnectorId, FromIri = edge.FromConnectorIri });
                var toNodeReplacement = _commonRepository.CreateOrUseIdAndIri(new ReplacementId { FromId = edge.ToNodeId, FromIri = edge.ToNodeIri });
                var fromNodeReplacement = _commonRepository.CreateOrUseIdAndIri(new ReplacementId { FromId = edge.FromNodeId, FromIri = edge.FromNodeIri });

                edge.ToConnectorId = toConnectorReplacement.ToId;
                edge.FromConnectorId = fromConnectorReplacement.ToId;
                edge.ToNodeId = toNodeReplacement.ToId;
                edge.FromNodeId = fromNodeReplacement.ToId;

                edge.ToConnectorIri = toConnectorReplacement.ToIri;
                edge.FromConnectorIri = fromConnectorReplacement.ToIri;
                edge.ToNodeIri = toNodeReplacement.ToIri;
                edge.FromNodeIri = fromNodeReplacement.ToIri;

                if (string.IsNullOrWhiteSpace(edge.MasterProjectId))
                    edge.MasterProjectId = project.ToId;

                if (string.IsNullOrEmpty(edge.MasterProjectIri) || !edge.MasterProjectIri.IsValidIri())
                    edge.MasterProjectIri = project.ToIri;

                yield return edge;
            }
        }

        /// <summary>
        /// Remap all parentless edges to root nodes
        /// </summary>
        /// <param name="project">ProjectAm</param>
        /// <remarks>If there is some edges that is not connected to a parent, we need to find
        /// a root node in same aspect, and connect the part of relation to that node.</remarks>
        public void RemapParentlessEdges(ProjectAm project)
        {
            var parentLessEdges = project.GetParentlessEdges().ToList();
            foreach (var edge in parentLessEdges)
            {
                var actualNode = project.Nodes.FirstOrDefault(x => x.Id == edge.ToNodeId);
                if (actualNode == null)
                    continue;

                var rootNode = project.Nodes.FirstOrDefault(x => x.IsRoot && x.Aspect == actualNode.Aspect);
                if (rootNode == null)
                    continue;

                edge.FromNodeId = rootNode.Id;
                edge.FromConnectorId = rootNode.Connectors?.FirstOrDefault(x => x.Type == ConnectorType.Output && x.RelationType == RelationType.PartOf)?.Id;
            }
        }

        #endregion

        #region Private methods

        // Remap connectors
        private IEnumerable<ConnectorAm> RemapConnectors(ReplacementId replacement, ICollection<ConnectorAm> connectors, ICollection<EdgeAm> edges, bool createCopy)
        {
            if (connectors == null || !connectors.Any())
                yield break;

            foreach (var connector in connectors)
            {
                var r = createCopy ? new ReplacementId() : new ReplacementId { FromId = connector.Id, FromIri = connector.Iri };
                var connectorReplacement = _commonRepository.CreateOrUseIdAndIri(r);

                // Need to set this if there is a clone after new Id and Iri is created
                connectorReplacement.FromId = connector.Id;
                connectorReplacement.FromIri = connector.Iri;

                if (string.IsNullOrWhiteSpace(connectorReplacement.FromId))
                {
                    _ = edges?.Where(x => x.FromConnectorIri == connectorReplacement.FromIri).Select(y =>
                    {
                        y.FromConnectorIri = connectorReplacement.ToIri;
                        y.FromConnectorId = connectorReplacement.ToId;
                        y.FromNodeId = replacement.ToId;
                        y.FromNodeIri = replacement.ToIri;
                        return y;
                    }).ToList();
                }
                else
                {
                    _ = edges?.Where(x => x.FromConnectorId == connectorReplacement.FromId).Select(y =>
                    {
                        y.FromConnectorIri = connectorReplacement.ToIri;
                        y.FromConnectorId = connectorReplacement.ToId;
                        y.FromNodeId = replacement.ToId;
                        y.FromNodeIri = replacement.ToIri;
                        return y;
                    }).ToList();
                }

                if (string.IsNullOrWhiteSpace(connectorReplacement.FromId))
                {
                    _ = edges?.Where(x => x.ToConnectorIri == connectorReplacement.FromIri).Select(y =>
                    {
                        y.ToConnectorIri = connectorReplacement.ToIri;
                        y.ToConnectorId = connectorReplacement.ToId;
                        y.ToNodeId = replacement.ToId;
                        y.ToNodeIri = replacement.ToIri;
                        return y;
                    }).ToList();
                }
                else
                {
                    _ = edges?.Where(x => x.ToConnectorId == connectorReplacement.FromId).Select(y =>
                    {
                        y.ToConnectorIri = connectorReplacement.ToIri;
                        y.ToConnectorId = connectorReplacement.ToId;
                        y.ToNodeId = replacement.ToId;
                        y.ToNodeIri = replacement.ToIri;
                        return y;
                    }).ToList();
                }

                var attr = RemapAttributes(connectorReplacement, connector.Attributes, createCopy).ToList();
                connector.Attributes = attr.Any() ? attr : null;

                connector.Id = connectorReplacement.ToId;
                connector.Iri = connectorReplacement.ToIri;

                if (connector.NodeId == replacement.FromId)
                {
                    connector.NodeId = replacement.ToId;
                    connector.NodeIri = replacement.ToIri;
                }

                if (!string.IsNullOrWhiteSpace(connector.TerminalTypeId) && string.IsNullOrWhiteSpace(connector.TerminalTypeIri))
                {
                    connector.TerminalTypeIri = GlobalSettings.IriTerminalTypePrefix + connector.TerminalTypeId;
                }


                yield return connector;
            }
        }

        private static bool ShouldReplace(string id, string fromId, string iri, string fromIri)
        {
            if(id == fromId && !string.IsNullOrWhiteSpace(id))
                return true;

            if (iri == fromIri && !string.IsNullOrWhiteSpace(iri))
                return true;

            return false;
        }

        // Remap attributes
        private IEnumerable<AttributeAm> RemapAttributes(ReplacementId replacement, ICollection<AttributeAm> attributes, bool createCopy)
        {
            if (attributes == null || !attributes.Any())
                yield break;

            foreach (var attribute in attributes)
            {
                var r = createCopy ? new ReplacementId() : new ReplacementId { FromId = attribute.Id, FromIri = attribute.Iri };
                var attributeReplacement = _commonRepository.CreateOrUseIdAndIri(r);

                // Need to set this if there is a clone after new Id and Iri is created
                attributeReplacement.FromId = attribute.Id;
                attributeReplacement.FromIri = attribute.Iri;

                if (ShouldReplace(attribute.TerminalId, replacement.FromId, attribute.TerminalIri, replacement.FromIri))
                {
                    attribute.TerminalId = replacement.ToId;
                    attribute.TerminalIri = replacement.ToIri;
                }

                if (ShouldReplace(attribute.NodeId, replacement.FromId, attribute.NodeIri, replacement.FromIri))
                {
                    attribute.NodeId = replacement.ToId;
                    attribute.NodeIri = replacement.ToIri;
                }

                if (ShouldReplace(attribute.TransportId, replacement.FromId, attribute.TransportIri, replacement.FromIri))
                {
                    attribute.TransportId = replacement.ToId;
                    attribute.TransportIri = replacement.ToIri;
                }

                if (ShouldReplace(attribute.SimpleId, replacement.FromId, attribute.SimpleIri, replacement.FromIri))
                {
                    attribute.SimpleId = replacement.ToId;
                    attribute.SimpleIri = replacement.ToIri;
                }

                attribute.Id = attributeReplacement.ToId;
                attribute.Iri = attributeReplacement.ToIri;

                if (!string.IsNullOrWhiteSpace(attribute.AttributeTypeId) && string.IsNullOrWhiteSpace(attribute.AttributeTypeIri))
                {
                    attribute.AttributeTypeIri = GlobalSettings.IriAttributeTypePrefix + attribute.AttributeTypeId;
                }

                yield return attribute;
            }
        }

        // Remap simple
        private IEnumerable<SimpleAm> RemapSimples(ReplacementId replacement, ICollection<SimpleAm> simples, bool createCopy)
        {
            if (simples == null || !simples.Any())
                yield break;

            foreach (var simple in simples)
            {
                var r = createCopy ? new ReplacementId() : new ReplacementId { FromId = simple.Id, FromIri = simple.Iri };
                var simpleReplacement = _commonRepository.CreateOrUseIdAndIri(r);

                // Need to set this if there is a clone after new Id and Iri is created
                simpleReplacement.FromId = simple.Id;
                simpleReplacement.FromIri = simple.Iri;

                var attr = RemapAttributes(simpleReplacement, simple.Attributes, createCopy).ToList();
                simple.Attributes = attr.Any() ? attr : null;
                simple.Id = simpleReplacement.ToId;
                simple.Iri = simpleReplacement.ToIri;
                simple.NodeId = replacement.ToId;
                simple.NodeIri = replacement.ToIri;

                yield return simple;
            }
        }

        // Remap transport
        private TransportAm RemapTransport(TransportAm transport, bool createCopy)
        {
            if (transport == null)
                return null;

            var r = createCopy ? new ReplacementId() : new ReplacementId { FromId = transport.Id, FromIri = transport.Iri };
            var transportReplacement = _commonRepository.CreateOrUseIdAndIri(r);

            // Need to set this if there is a clone after new Id and Iri is created
            transportReplacement.FromId = transport.Id;
            transportReplacement.FromIri = transport.Iri;

            var attr = RemapAttributes(transportReplacement, transport.Attributes, createCopy).ToList();
            transport.Attributes = attr.Any() ? attr : null;
            transport.InputTerminal = RemapTerminal(transportReplacement, transport.InputTerminal, createCopy);
            transport.OutputTerminal = RemapTerminal(transportReplacement, transport.OutputTerminal, createCopy);
            transport.InputTerminalId = transport.InputTerminal?.Id;
            transport.OutputTerminalId = transport.OutputTerminal?.Id;
            transport.Id = transportReplacement.ToId;
            transport.Iri = transportReplacement.ToIri;
            return transport;
        }

        // Remap interface
        private InterfaceAm RemapInterface(InterfaceAm interfaceAm, bool createCopy)
        {
            if (interfaceAm == null)
                return null;

            var r = createCopy ? new ReplacementId() : new ReplacementId { FromId = interfaceAm.Id, FromIri = interfaceAm.Iri };
            var interfaceReplacement = _commonRepository.CreateOrUseIdAndIri(r);

            // Need to set this if there is a clone after new Id and Iri is created
            interfaceReplacement.FromId = interfaceAm.Id;
            interfaceReplacement.FromIri = interfaceAm.Iri;

            var attr = RemapAttributes(interfaceReplacement, interfaceAm.Attributes, createCopy).ToList();
            interfaceAm.Attributes = attr.Any() ? attr : null;
            interfaceAm.InputTerminal = RemapTerminal(interfaceReplacement, interfaceAm.InputTerminal, createCopy);
            interfaceAm.OutputTerminal = RemapTerminal(interfaceReplacement, interfaceAm.OutputTerminal, createCopy);
            interfaceAm.InputTerminalId = interfaceAm.InputTerminal?.Id;
            interfaceAm.OutputTerminalId = interfaceAm.OutputTerminal?.Id;
            interfaceAm.Id = interfaceReplacement.ToId;
            interfaceAm.Iri = interfaceReplacement.ToIri;
            return interfaceAm;
        }

        // Remap terminal
        private TerminalAm RemapTerminal(ReplacementId replacement, TerminalAm terminal, bool createCopy)
        {
            if (terminal == null)
                return null;

            var r = createCopy ? new ReplacementId() : new ReplacementId { FromId = terminal.Id, FromIri = terminal.Iri };
            var terminalReplacement = _commonRepository.CreateOrUseIdAndIri(r);

            // Need to set this if there is a clone after new Id and Iri is created
            terminalReplacement.FromId = terminal.Id;
            terminalReplacement.FromIri = terminal.Iri;

            var attr = RemapAttributes(terminalReplacement, terminal.Attributes, createCopy).ToList();
            terminal.Attributes = attr.Any() ? attr : null;

            terminal.Id = terminalReplacement.ToId;
            terminal.Iri = terminalReplacement.ToIri;

            if (terminal.NodeId == replacement.FromId)
            {
                terminal.NodeId = replacement.FromId;
                terminal.NodeIri = replacement.ToIri;
            }

            if (!string.IsNullOrWhiteSpace(terminal.TerminalTypeId) && string.IsNullOrWhiteSpace(terminal.TerminalTypeIri))
            {
                terminal.TerminalTypeIri = GlobalSettings.IriTerminalTypePrefix + terminal.TerminalTypeId;
            }

            return terminal;
        }

        #endregion
    }
}