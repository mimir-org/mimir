using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Common;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Models.Exceptions;
using Mb.Models.Extensions;
using Mb.Services.Contracts;

namespace Mb.Services.Services
{
    public class RemapService : IRemapService
    {
        private readonly ICommonRepository _commonRepository;
        private readonly IMapper _mapper;

        public RemapService(ICommonRepository commonRepository, IMapper mapper)
        {
            _commonRepository = commonRepository;
            _mapper = mapper;
        }

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

            project.Nodes = RemapNodes(replacement, project.Nodes, project.Edges, remap, true).ToList();
            project.Edges = RemapEdges(replacement, project.Edges, remap, true).ToList();

            project.Id = replacement.ToId;
            project.Iri = replacement.ToIri;

            return remap;
        }

        /// <summary>
        /// Remap project from old to new
        /// </summary>
        /// <param name="fromProject"></param>
        /// <param name="toProject"></param>
        /// <param name="nodes"></param>
        /// <param name="edges"></param>
        /// <returns></returns>
        /// <exception cref="ModelBuilderNullReferenceException"></exception>
        public ProjectAm Remap(Project fromProject, Project toProject, ICollection<string> nodes, ICollection<string> edges)
        {
            if (fromProject == null || toProject == null)
                throw new ModelBuilderNullReferenceException($"{nameof(fromProject)} or {nameof(toProject)} is null. It is not possible to remap project");

            // Get all nodes from original project
            var oldNodes = fromProject.Nodes.Where(x => nodes.Any(y => y == x.Id)).ToList();
            var oldEdges = fromProject.Edges.Where(x => edges.Any(y => y == x.Id)).ToList();

            // Create new nodes from old nodes
            var remapData = CreateRemap(toProject.Id, oldNodes, oldEdges);

            // Remove old root nodes
            remapData.nodes = remapData.nodes.Where(x => !x.IsRoot).ToList();

            // Remove edges that point to old root nodes
            remapData.edges = remapData.edges.Where(edge => remapData.nodes.Any(x => x.Id == edge.FromNodeId)).ToList();

            // Initial list of edges and nodes if null
            toProject.Nodes ??= new List<Node>();
            toProject.Edges ??= new List<Edge>();

            // Add edges and nodes to new sub project
            foreach (var clonedDataNode in remapData.nodes)
            {
                toProject.Nodes.Add(clonedDataNode);
            }

            foreach (var clonedDataEdge in remapData.edges)
            {
                toProject.Edges.Add(clonedDataEdge);
            }

            foreach (var node in toProject.Nodes)
            {
                // Find input partOf connector
                var relationConnector = (Relation)node.Connectors.FirstOrDefault(x => x is Relation { Type: ConnectorType.Input, RelationType: RelationType.PartOf });
                if (relationConnector == null)
                    continue;

                // Check if there is an edge pointing to input partOf connector
                if (toProject.Edges.Any(x => x.ToConnectorId == relationConnector.Id && x.ToNodeId == node.Id))
                    continue;

                // Find the root aspect node that should connect
                var rootNode = toProject.Nodes.FirstOrDefault(x => x.IsRoot && x.Aspect == node.Aspect);

                // Find output partOf connector on root node
                var fromConnector = rootNode?.Connectors.FirstOrDefault(x => x is Relation { Type: ConnectorType.Output, RelationType: RelationType.PartOf });

                if (fromConnector == null)
                    continue;

                var (edgeId, edgeIri) = _commonRepository.CreateOrUseIdAndIri(null, null);

                // Create an edge and point it from root connector to current node
                var edge = new Edge
                {
                    Id = edgeId,
                    Iri = edgeIri,
                    FromConnectorId = fromConnector.Id,
                    FromConnectorIri = fromConnector.Iri,
                    FromConnector = fromConnector,
                    FromNodeId = rootNode.Id,
                    FromNode = rootNode,
                    FromNodeIri = rootNode.Iri,
                    ToConnectorId = relationConnector.Id,
                    ToConnector = relationConnector,
                    ToConnectorIri = relationConnector.Iri,
                    ToNodeId = node.Id,
                    ToNode = node,
                    ToNodeIri = node.Iri,
                    MasterProjectId = toProject.Id,
                    MasterProjectIri = toProject.Iri,
                    ProjectId = toProject.Id
                };

                toProject.Edges.Add(edge);
            }

            // Map and save the new project
            var projectAm = _mapper.Map<ProjectAm>(toProject);
            return projectAm;
        }

        /// <summary>
        /// Making a new clone of all objects
        /// </summary>
        /// <param name="projectId"></param>
        /// <param name="nodes"></param>
        /// <param name="edges"></param>
        /// <returns></returns>
        public (ICollection<Node> nodes, ICollection<Edge> edges) CreateRemap(string projectId, ICollection<Node> nodes, ICollection<Edge> edges)
        {
            var cloneNodes = new List<Node>();
            var cloneEdges = new List<Edge>();

            foreach (var node in nodes)
            {
                var (nodeId, nodeIri) = _commonRepository.CreateOrUseIdAndIri(null, null);

                var clone = node.DeepCopy();
                clone.ProjectId = projectId;
                clone.Id = nodeId;
                clone.Iri = nodeIri;
                clone.Simples = CloneSimples(node.Simples, clone.Id).ToList();
                clone.Connectors = CloneConnectors(node.Connectors, edges, clone, node).ToList();
                clone.Attributes = CloneAttributes(node.Attributes, nodeId: clone.Id).ToList();
                cloneNodes.Add(clone);
            }

            foreach (var edge in edges)
            {
                var (edgeId, edgeIri) = _commonRepository.CreateOrUseIdAndIri(null, null);
                var clone = edge.DeepCopy();
                clone.Id = edgeId;
                clone.Iri = edgeIri;
                clone.ProjectId = projectId;

                if (edge.Transport != null)
                {
                    clone.Transport = CloneTransport(edge);
                    clone.TransportId = clone.Transport.Id;
                    clone.Interface = CloneInterface(edge);
                    clone.InterfaceId = clone.Interface.Id;
                }
                cloneEdges.Add(clone);
            }

            return (cloneNodes, cloneEdges);
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

                if(nodeReplacement.FromId != nodeReplacement.ToId)
                    remap.Add(nodeReplacement.ToId, nodeReplacement.FromId);

                node.Simples = RemapSimples(nodeReplacement, node.Simples, createCopy).ToList();
                node.Connectors = RemapConnectors(nodeReplacement, node.Connectors, edges, createCopy).ToList();
                var attr = RemapAttributes(nodeReplacement, node.Attributes, createCopy).ToList();
                node.Attributes = attr.Any() ? attr : null;

                node.Id = nodeReplacement.ToId;
                node.Iri = nodeReplacement.ToIri;
                node.ProjectId = project.ToId;

                if (string.IsNullOrWhiteSpace(node.MasterProjectId))
                    node.MasterProjectId = project.ToId;

                if (string.IsNullOrEmpty(node.MasterProjectIri))
                    node.MasterProjectIri = project.ToId;

                yield return createCopy ? node.DeepCopy() : node;
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

                if (edgeReplacement.FromId != edgeReplacement.ToId)
                    remap.Add(edgeReplacement.ToId, edgeReplacement.FromId);

                edge.Transport = RemapTransport(edge.Transport, createCopy);
                edge.Interface = RemapInterface(edge.Interface, createCopy);

                edge.Id = edgeReplacement.ToId;
                edge.Iri = edgeReplacement.ToIri;

                if (string.IsNullOrWhiteSpace(edge.MasterProjectId))
                    edge.MasterProjectId = project.ToId;

                if (string.IsNullOrEmpty(edge.MasterProjectIri))
                    edge.MasterProjectIri = project.ToId;

                yield return createCopy ? edge.DeepCopy() : edge;
            }
        }

        #region Private methods

        private IEnumerable<Simple> CloneSimples(ICollection<Simple> simples, string nodeId)
        {
            if (simples == null || !simples.Any())
                yield break;

            foreach (var simple in simples)
            {
                var (id, _) = _commonRepository.CreateOrUseIdAndIri(null, null);
                var clone = simple.DeepCopy();
                clone.Id = id;
                clone.NodeId = nodeId;
                clone.Attributes = CloneAttributes(simple.Attributes, simpleId: clone.Id).ToList();
            }
        }

        private IEnumerable<Attribute> CloneAttributes(ICollection<Attribute> attributes, string simpleId = null, string terminalId = null, string nodeId = null, string transportId = null, string interfaceId = null)
        {
            if (attributes == null || !attributes.Any())
                yield break;

            foreach (var attribute in attributes)
            {
                var (id, iri) = _commonRepository.CreateOrUseIdAndIri(null, null);
                var clone = attribute.DeepCopy();
                clone.Id = id;
                clone.Iri = iri;
                clone.SimpleId = simpleId;
                clone.TerminalId = terminalId;
                clone.NodeId = nodeId;
                clone.TransportId = transportId;
                clone.InterfaceId = interfaceId;
                yield return clone;
            }
        }

        private IEnumerable<Connector> CloneConnectors(ICollection<Connector> connectors, ICollection<Edge> edges, Node cloneNode, Node oldNode)
        {
            if (connectors == null || !connectors.Any())
                yield break;

            foreach (var connector in connectors)
            {
                Connector clone = connector switch
                {
                    Relation rel => rel.DeepCopy(),
                    Terminal ter => ter.DeepCopy(),
                    _ => null
                };

                if (clone == null)
                    yield break;

                var (id, iri) = _commonRepository.CreateOrUseIdAndIri(null, null);

                clone.Id = id;
                clone.Iri = iri;
                clone.NodeId = cloneNode.Id;
                clone.Node = cloneNode;
                if (clone is Terminal t && connector is Terminal tOld)
                {
                    t.Attributes = CloneAttributes(tOld.Attributes, terminalId: clone.Id).ToList();
                }

                foreach (var edge in edges)
                {
                    if (edge.FromConnectorId == connector.Id)
                    {
                        edge.FromConnectorId = clone.Id;
                        edge.FromConnectorIri = clone.Iri;
                    }

                    if (edge.ToConnectorId == connector.Id)
                    {
                        edge.ToConnectorId = clone.Id;
                        edge.ToConnectorId = clone.Iri;
                    }

                    if (edge.FromNodeId == oldNode.Id)
                    {
                        edge.FromNodeId = cloneNode.Id;
                        edge.FromNode = cloneNode;
                        edge.FromNodeIri = cloneNode.Iri;
                    }

                    if (edge.ToNodeId == oldNode.Id)
                    {
                        edge.ToNodeId = cloneNode.Id;
                        edge.ToNode = cloneNode;
                        edge.ToNodeIri = cloneNode.Iri;
                    }
                }

                yield return clone;
            }
        }

        private Transport CloneTransport(Edge edge)
        {
            if (edge.Transport == null)
                return null;

            var (id, iri) = _commonRepository.CreateOrUseIdAndIri(null, null);

            var clone = edge.Transport.DeepCopy();
            clone.Id = id;
            clone.Iri = iri;

            clone.Attributes = CloneAttributes(edge.Transport.Attributes, transportId: clone.Id).ToList();
            return clone;
        }

        private Interface CloneInterface(Edge edge)
        {
            if (edge.Interface == null)
                return null;

            var (id, iri) = _commonRepository.CreateOrUseIdAndIri(null, null);
            var clone = edge.Interface.DeepCopy();
            clone.Id = id;
            clone.Iri = iri;

            clone.Attributes = CloneAttributes(edge.Interface.Attributes, interfaceId: clone.Id).ToList();
            return clone;
        }

        // Remap connectors
        private IEnumerable<ConnectorAm> RemapConnectors(ReplacementId replacement, ICollection<ConnectorAm> connectors, ICollection<EdgeAm> edges, bool createCopy)
        {
            if (connectors == null || !connectors.Any())
                yield break;

            foreach (var connector in connectors)
            {
                var r = createCopy ? new ReplacementId() : new ReplacementId { FromId = connector.Id, FromIri = connector.Iri };
                var connectorReplacement = _commonRepository.CreateOrUseIdAndIri(r);

                _ = edges?.Where(x => x.FromConnectorId == connectorReplacement.FromId).Select(y =>
                {
                    y.FromConnectorIri = connectorReplacement.ToIri;
                    y.FromConnectorId = connectorReplacement.ToId;
                    y.FromNodeId = replacement.ToId;
                    y.FromNodeIri = replacement.ToIri;
                    return y;
                }).ToList();

                _ = edges?.Where(x => x.ToConnectorId == connectorReplacement.FromId).Select(y =>
                {
                    y.ToConnectorIri = connectorReplacement.ToIri;
                    y.ToConnectorId = connectorReplacement.ToId;
                    y.ToNodeId = replacement.ToId;
                    y.ToNodeIri = replacement.ToIri;
                    return y;
                }).ToList();

                var attr = RemapAttributes(connectorReplacement, connector.Attributes, createCopy).ToList();
                connector.Attributes = attr.Any() ? attr : null;

                connector.Id = connectorReplacement.ToId;
                connector.Iri = connectorReplacement.ToIri;

                if (connector.NodeId == replacement.FromId)
                {
                    connector.NodeId = replacement.ToId;
                    connector.NodeIri = replacement.ToIri;
                }

                yield return createCopy ? connector.DeepCopy() : connector;
            }
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

                if (attribute.TerminalId == replacement.FromId)
                    attribute.TerminalId = replacement.ToId;

                if (attribute.NodeId == replacement.FromId)
                {
                    attribute.NodeId = replacement.ToId;
                    attribute.NodeIri = replacement.ToIri;
                }

                if (attribute.TransportId == replacement.FromId)
                    attribute.TransportId = replacement.ToId;

                if (attribute.SimpleId == replacement.FromId)
                    attribute.SimpleId = replacement.ToId;

                attribute.Id = attributeReplacement.ToId;
                attribute.Iri = attributeReplacement.ToIri;

                yield return createCopy ? attribute.DeepCopy() : attribute;
            }
        }

        // Remap simple
        private IEnumerable<SimpleAm> RemapSimples(ReplacementId replacement, ICollection<SimpleAm> simples, bool createCopy)
        {
            if (simples == null || !simples.Any())
                yield break;

            foreach (var simple in simples)
            {
                var r = createCopy ? new ReplacementId() : new ReplacementId { FromId = simple.Id };
                var simpleReplacement = _commonRepository.CreateOrUseIdAndIri(r);

                var attr = RemapAttributes(simpleReplacement, simple.Attributes, createCopy).ToList();
                simple.Attributes = attr.Any() ? attr : null;
                simple.Id = simpleReplacement.ToId;
                simple.NodeId = replacement.ToId;

                yield return createCopy ? simple.DeepCopy() : simple;
            }
        }

        // Remap transport
        private TransportAm RemapTransport(TransportAm transport, bool createCopy)
        {
            if (transport == null)
                return null;

            var r = createCopy ? new ReplacementId() : new ReplacementId { FromId = transport.Id, FromIri = transport.Iri };
            var transportReplacement = _commonRepository.CreateOrUseIdAndIri(r);

            var attr = RemapAttributes(transportReplacement, transport.Attributes, createCopy).ToList();
            transport.Attributes = attr.Any() ? attr : null;
            transport.InputTerminal = RemapTerminal(transportReplacement, transport.InputTerminal, createCopy);
            transport.OutputTerminal = RemapTerminal(transportReplacement, transport.OutputTerminal, createCopy);
            transport.InputTerminalId = transport.InputTerminal?.Id;
            transport.OutputTerminalId = transport.OutputTerminal?.Id;
            transport.Id = transportReplacement.ToId;
            transport.Iri = transportReplacement.ToIri;
            return createCopy ? transport.DeepCopy() : transport;
        }

        // Remap interface
        private InterfaceAm RemapInterface(InterfaceAm interfaceAm, bool createCopy)
        {
            if (interfaceAm == null)
                return null;

            var r = createCopy ? new ReplacementId() : new ReplacementId { FromId = interfaceAm.Id, FromIri = interfaceAm.Iri };
            var transportReplacement = _commonRepository.CreateOrUseIdAndIri(r);

            var attr = RemapAttributes(transportReplacement, interfaceAm.Attributes, createCopy).ToList();
            interfaceAm.Attributes = attr.Any() ? attr : null;
            interfaceAm.InputTerminal = RemapTerminal(transportReplacement, interfaceAm.InputTerminal, createCopy);
            interfaceAm.OutputTerminal = RemapTerminal(transportReplacement, interfaceAm.OutputTerminal, createCopy);
            interfaceAm.InputTerminalId = interfaceAm.InputTerminal?.Id;
            interfaceAm.OutputTerminalId = interfaceAm.OutputTerminal?.Id;
            interfaceAm.Id = transportReplacement.ToId;
            interfaceAm.Iri = transportReplacement.ToIri;
            return createCopy ? interfaceAm.DeepCopy() : interfaceAm;
        }

        // Remap terminal
        private TerminalAm RemapTerminal(ReplacementId replacement, TerminalAm terminal, bool createCopy)
        {
            if (terminal == null)
                return null;

            var r = createCopy ? new ReplacementId() : new ReplacementId { FromId = terminal.Id, FromIri = terminal.Iri };
            var terminalReplacement = _commonRepository.CreateOrUseIdAndIri(r);
            var attr = RemapAttributes(terminalReplacement, terminal.Attributes, createCopy).ToList();
            terminal.Attributes = attr.Any() ? attr : null;

            terminal.Id = terminalReplacement.ToId;
            terminal.Iri = terminalReplacement.ToIri;

            if (terminal.NodeId == replacement.FromId)
            {
                terminal.NodeId = replacement.FromId;
                terminal.NodeIri = replacement.ToIri;
            }

            return createCopy ? terminal.DeepCopy() : terminal;
        }

        #endregion
    }
}
