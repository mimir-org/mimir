using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Application;
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
        /// Remap a project, create new id if the id is not valid
        /// </summary>
        /// <param name="project"></param>
        public IDictionary<string, string> Remap(ProjectAm project)
        {

            var reMappedIds = new Dictionary<string, string>();
            
            var (projectId, projectIri) = _commonRepository.CreateOrUseIdAndIri(project.Id, project.Iri);

            foreach (var node in project.Nodes)
            {
                var (nodeId, nodeIri) = _commonRepository.CreateOrUseIdAndIri(node.Id, node.Iri);

                if (node.Id != nodeId)
                    reMappedIds.Add(nodeId, node.Id);
                
                RemapSimples(nodeId, node);
                RemapConnectors(nodeId, nodeIri, node, project);

                foreach (var attribute in node.Attributes)
                {
                    var (attributeId, attributeIri) = _commonRepository.CreateOrUseIdAndIri(attribute.Id, attribute.Iri);
                    attribute.Id = attributeId;
                    attribute.Iri = attributeIri;
                    attribute.NodeId = nodeId;
                    attribute.NodeIri = nodeIri;
                }

                node.Id = nodeId;
                node.Iri = nodeIri;
                node.ProjectId = projectId;

                if (string.IsNullOrEmpty(node.MasterProjectId))
                    node.MasterProjectId = projectId;

                if (string.IsNullOrEmpty(node.MasterProjectIri))
                    node.MasterProjectIri = projectIri;
            }

            foreach (var edge in project.Edges)
            {
                var (edgeId, edgeIri) = _commonRepository.CreateOrUseIdAndIri(edge.Id, edge.Iri);
                
                if (edge.Id != edgeId)
                    reMappedIds.Add(edgeId, edge.Id);

                if (edge.Transport != null)
                    RemapTransport(edge);

                if (edge.Interface != null)
                    RemapInterface(edge);

                edge.Id = edgeId;
                edge.Iri = edgeIri;

                if (string.IsNullOrEmpty(edge.MasterProjectId))
                    edge.MasterProjectId = projectId;

                if (string.IsNullOrEmpty(edge.MasterProjectIri))
                    edge.MasterProjectIri = projectIri;
            }

            project.Id = projectId;
            project.Iri = projectIri;

            return reMappedIds;
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

        private void RemapTransport(EdgeAm edge)
        {
            if (edge.Transport == null)
                return;

            var (transportId, transportIri) = _commonRepository.CreateOrUseIdAndIri(edge.Transport.Id, edge.Transport.Iri);

            if (edge.Transport.Attributes != null)
            {
                foreach (var attribute in edge.Transport.Attributes)
                {
                    var (attributeId, attributeIri) = _commonRepository.CreateOrUseIdAndIri(attribute.Id, attribute.Iri);
                    attribute.Id = attributeId;
                    attribute.Iri = attributeIri;
                    
                    if(attribute.TransportId == edge.Transport.Id)
                        attribute.TransportId = transportId;
                }
            }

            edge.Transport.Id = transportId;
            edge.Transport.Iri = transportIri;
        }

        private void RemapInterface(EdgeAm edge)
        {
            if (edge.Interface == null)
                return;

            var (interfaceId, interfaceIri) = _commonRepository.CreateOrUseIdAndIri(edge.Interface.Id, edge.Interface.Iri);

            if (edge.Interface.Attributes != null)
            {
                foreach (var attribute in edge.Interface.Attributes)
                {
                    var (attributeId, attributeIri) = _commonRepository.CreateOrUseIdAndIri(attribute.Id, attribute.Iri);
                    attribute.Id = attributeId;
                    attribute.Iri = attributeIri;

                    if(attribute.InterfaceId == edge.Interface.Id)
                        attribute.InterfaceId = interfaceId;
                }
            }

            edge.Interface.Id = interfaceId;
            edge.Interface.Iri = interfaceIri;
        }

        private void RemapConnectors(string newNodeId, string newNodeIri, NodeAm node, ProjectAm project)
        {
            if (node?.Connectors == null || !node.Connectors.Any())
                return;

            foreach (var connector in node.Connectors)
            {
                var (connectorId, connectorIri) = _commonRepository.CreateOrUseIdAndIri(connector.Id, connector.Iri);

                foreach (var edge in project.Edges)
                {
                    if (edge.FromConnectorId == connector.Id)
                    {
                        edge.FromConnectorId = connectorId;
                        edge.FromConnectorIri = connectorIri;
                    }

                    if (edge.ToConnectorId == connector.Id)
                    {
                        edge.ToConnectorId = connectorId;
                        edge.ToConnectorIri = connectorIri;
                    }

                    if (edge.FromNodeId == node.Id)
                    {
                        edge.FromNodeId = newNodeId;
                        edge.FromNodeIri = newNodeIri;
                    }

                    if (edge.ToNodeId == node.Id)
                    {
                        edge.ToNodeId = newNodeId;
                        edge.ToNodeIri = newNodeIri;
                    }
                }

                if (connector.Attributes != null && connector.Attributes.Any())
                {
                    foreach (var attribute in connector.Attributes)
                    {
                        var (attributeId, attributeIri) = _commonRepository.CreateOrUseIdAndIri(attribute.Id, attribute.Iri);
                        attribute.Id = attributeId;
                        attribute.Iri = attributeIri;

                        if (attribute.TerminalId == connector.Id)
                            attribute.TerminalId = connectorId;
                    }
                }

                connector.Id = connectorId;
                connector.Iri = connectorIri;
                connector.NodeId = newNodeId;
                connector.NodeIri = newNodeIri;
            }
        }

        private void RemapSimples(string newNodeId, NodeAm node)
        {
            if (node?.Simples == null || !node.Simples.Any())
                return;

            foreach (var simple in node.Simples)
            {
                var (simpleId, _) = _commonRepository.CreateOrUseIdAndIri(simple.Id, null);

                if (simple.Attributes != null && simple.Attributes.Any())
                {
                    foreach (var attribute in simple.Attributes)
                    {
                        var (attributeId, attributeIri) = _commonRepository.CreateOrUseIdAndIri(attribute.Id, attribute.Iri);
                        attribute.Id = attributeId;
                        attribute.Iri = attributeIri;
                        
                        if(attribute.SimpleId == simple.Id)
                            attribute.SimpleId = simpleId;
                    }
                }

                simple.Id = simpleId;
                simple.NodeId = newNodeId;
            }
        }

        #endregion
    }
}
