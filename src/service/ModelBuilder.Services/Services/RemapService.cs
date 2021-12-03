using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            var remapData = CreateRemap(toProject.Id, oldNodes, oldEdges, false);

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

                // Create an edge and point it from root connector to current node
                var edge = new Edge
                {
                    Id = _commonRepository.CreateUniqueId(),
                    FromConnectorId = fromConnector.Id,
                    FromConnector = fromConnector,
                    FromNodeId = rootNode.Id,
                    FromNode = rootNode,
                    ToConnectorId = relationConnector.Id,
                    ToConnector = relationConnector,
                    ToNodeId = node.Id,
                    ToNode = node,
                    MasterProjectId = toProject.Id,
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
        /// <param name="reuseValidIds"></param>
        /// <returns></returns>
        public (ICollection<Node> nodes, ICollection<Edge> edges) CreateRemap(string projectId, ICollection<Node> nodes, ICollection<Edge> edges, bool reuseValidIds)
        {
            var cloneNodes = new List<Node>();
            var cloneEdges = new List<Edge>();

            foreach (var node in nodes)
            {
                var clone = node.DeepCopy();
                clone.ProjectId = projectId;
                clone.Id = reuseValidIds ? _commonRepository.CreateOrUseId(node.Id) : _commonRepository.CreateUniqueId();
                clone.Composites = CloneComposites(node.Composites, clone.Id, reuseValidIds).ToList();
                clone.Connectors = CloneConnectors(node.Connectors, edges, clone, node, reuseValidIds).ToList();
                clone.Attributes = CloneAttributes(node.Attributes, reuseValidIds, nodeId: clone.Id).ToList();
                cloneNodes.Add(clone);
            }

            foreach (var edge in edges)
            {
                var clone = edge.DeepCopy();
                clone.Id = reuseValidIds ? _commonRepository.CreateOrUseId(edge.Id) : _commonRepository.CreateUniqueId();
                clone.ProjectId = projectId;

                if (edge.Transport != null)
                {
                    clone.Transport = CloneTransport(edge, reuseValidIds);
                    clone.TransportId = clone.Transport.Id;
                    clone.Interface = CloneInterface(edge, reuseValidIds);
                    clone.InterfaceId = clone.Interface.Id;
                }
                cloneEdges.Add(clone);
            }

            return (cloneNodes, cloneEdges);
        }

        private IEnumerable<Composite> CloneComposites(ICollection<Composite> composites, string nodeId, bool reuseValidIds)
        {
            if (composites == null || !composites.Any())
                yield break;

            foreach (var composite in composites)
            {
                var clone = composite.DeepCopy();
                clone.Id = reuseValidIds ? _commonRepository.CreateOrUseId(composite.Id) : _commonRepository.CreateUniqueId();
                clone.NodeId = nodeId;
                clone.Attributes = CloneAttributes(composite.Attributes, reuseValidIds, compositeId: clone.Id).ToList();
            }
        }

        private IEnumerable<Attribute> CloneAttributes(ICollection<Attribute> attributes, bool reuseValidIds, string compositeId = null, string terminalId = null, string nodeId = null, string transportId = null)
        {
            if (attributes == null || !attributes.Any())
                yield break;

            foreach (var attribute in attributes)
            {
                var clone = attribute.DeepCopy();
                clone.Id = reuseValidIds ? _commonRepository.CreateOrUseId(attribute.Id) : _commonRepository.CreateUniqueId();
                clone.CompositeId = compositeId;
                clone.TerminalId = terminalId;
                clone.NodeId = nodeId;
                clone.TransportId = transportId;
                yield return clone;
            }
        }

        private IEnumerable<Connector> CloneConnectors(ICollection<Connector> connectors, ICollection<Edge> edges, Node cloneNode, Node oldNode, bool reuseValidIds)
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

                if(clone == null)
                    yield break;

                clone.Id = reuseValidIds ? _commonRepository.CreateOrUseId(connector.Id) : _commonRepository.CreateUniqueId();
                clone.NodeId = cloneNode.Id;
                clone.Node = cloneNode;
                if (clone is Terminal t && connector is Terminal tOld)
                {
                    t.Attributes = CloneAttributes(tOld.Attributes, reuseValidIds, terminalId: clone.Id).ToList();
                }

                foreach (var edge in edges)
                {
                    if (edge.FromConnectorId == connector.Id)
                        edge.FromConnectorId = clone.Id;
                    if (edge.ToConnectorId == connector.Id)
                        edge.ToConnectorId = clone.Id;

                    if (edge.FromNodeId == oldNode.Id)
                    {
                        edge.FromNodeId = cloneNode.Id;
                        edge.FromNode = cloneNode;
                    }

                    if (edge.ToNodeId == oldNode.Id)
                    {
                        edge.ToNodeId = cloneNode.Id;
                        edge.ToNode = cloneNode;
                    }
                }

                yield return clone;
            }
        }

        private Transport CloneTransport(Edge edge, bool reuseValidIds)
        {
            if (edge.Transport == null)
                return null;

            var clone = edge.Transport.DeepCopy();
            clone.Id = reuseValidIds ? _commonRepository.CreateOrUseId(edge.Transport.Id) : _commonRepository.CreateUniqueId();
            clone.Attributes = CloneAttributes(edge.Transport.Attributes, reuseValidIds, transportId: clone.Id).ToList();
            return clone;
        }

        private Interface CloneInterface(Edge edge, bool reuseValidIds)
        {
            if (edge.Interface == null)
                return null;

            var clone = edge.Interface.DeepCopy();
            clone.Id = reuseValidIds ? _commonRepository.CreateOrUseId(edge.Interface.Id) : _commonRepository.CreateUniqueId();
            clone.Attributes = CloneAttributes(edge.Interface.Attributes, reuseValidIds, transportId: clone.Id).ToList(); // TODO: We need interface id item here
            return clone;
        }

        
    }
}
