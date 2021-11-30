using System.Collections.Generic;
using System.Linq;
using Mb.Data.Contracts;
using Mb.Models.Data;
using Mb.Models.Extensions;
using Mb.Services.Contracts;

namespace Mb.Services.Services
{
    public class CloneService : ICloneService
    {
        private readonly ICommonRepository _commonRepository;

        public CloneService(ICommonRepository commonRepository)
        {
            _commonRepository = commonRepository;
        }

        public (ICollection<Node> nodes, ICollection<Edge> edges) MakeClones(string projectId, ICollection<Node> nodes, ICollection<Edge> edges)
        {
            var cloneNodes = new List<Node>();
            var cloneEdges = new List<Edge>();

            foreach (var node in nodes)
            {
                var clone = node.DeepCopy();
                clone.ProjectId = projectId;
                clone.Id = _commonRepository.CreateUniqueId();
                clone.Composites = CloneComposites(node.Composites, clone.Id).ToList();
                clone.Connectors = CloneConnectors(node.Connectors, edges, clone, node).ToList();
                clone.Attributes = CloneAttributes(node.Attributes, nodeId: clone.Id).ToList();
                cloneNodes.Add(clone);
            }

            foreach (var edge in edges)
            {
                var clone = edge.DeepCopy();
                clone.Id = _commonRepository.CreateUniqueId();
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

        private IEnumerable<Composite> CloneComposites(ICollection<Composite> composites, string nodeId)
        {
            if (composites == null || !composites.Any())
                yield break;

            foreach (var composite in composites)
            {
                var clone = composite.DeepCopy();
                clone.Id = _commonRepository.CreateUniqueId();
                clone.NodeId = nodeId;
                clone.Attributes = CloneAttributes(composite.Attributes, compositeId: clone.Id).ToList();
            }
        }

        private IEnumerable<Attribute> CloneAttributes(ICollection<Attribute> attributes, string compositeId = null, string terminalId = null, string nodeId = null, string transportId = null)
        {
            if (attributes == null || !attributes.Any())
                yield break;

            foreach (var attribute in attributes)
            {
                var clone = attribute.DeepCopy();
                clone.Id = _commonRepository.CreateUniqueId();
                clone.CompositeId = compositeId;
                clone.TerminalId = terminalId;
                clone.NodeId = nodeId;
                clone.TransportId = transportId;
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

                if(clone == null)
                    yield break;

                clone.Id = _commonRepository.CreateUniqueId();
                clone.NodeId = cloneNode.Id;
                clone.Node = cloneNode;
                if (clone is Terminal t && connector is Terminal tOld)
                {
                    t.Attributes = CloneAttributes(tOld.Attributes, terminalId: clone.Id).ToList();
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

        private Transport CloneTransport(Edge edge)
        {
            if (edge.Transport == null)
                return null;

            var clone = edge.Transport.DeepCopy();
            clone.Id = _commonRepository.CreateUniqueId();
            clone.Attributes = CloneAttributes(edge.Transport.Attributes, transportId: clone.Id).ToList();
            return clone;
        }

        private Interface CloneInterface(Edge edge)
        {
            if (edge.Interface == null)
                return null;

            var clone = edge.Interface.DeepCopy();
            clone.Id = _commonRepository.CreateUniqueId();
            clone.Attributes = CloneAttributes(edge.Interface.Attributes, transportId: clone.Id).ToList(); // TODO: We need interface id item here
            return clone;
        }
    }
}
