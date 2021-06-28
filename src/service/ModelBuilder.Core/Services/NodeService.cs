using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Core.Repositories.Contracts;
using Mb.Core.Services.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Core.Services
{
    public class NodeService : INodeService
    {
        private readonly IMapper _mapper;
        private readonly INodeRepository _nodeRepository;
        private readonly IAttributeRepository _attributeRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly IConnectorRepository _connectorRepository;

        public NodeService(INodeRepository nodeRepository, IMapper mapper, IAttributeRepository attributeRepository, IProjectRepository projectRepository, IConnectorRepository connectorRepository)
        {
            _nodeRepository = nodeRepository;
            _mapper = mapper;
            _attributeRepository = attributeRepository;
            _projectRepository = projectRepository;
            _connectorRepository = connectorRepository;
        }

        public async Task UpdateNodes(string projectId, List<NodeAm> nodes)
        {
            var existingNodes = _nodeRepository.GetAll()
                .Include(x => x.Projects)
                .Include(x => x.Connectors)
                .Include(x => x.Attributes)
                .Where(x => x.Projects.Any(y => y.Id == projectId))
                .ToList();

            var deleteNodes = existingNodes.Where(x => nodes.All(y => y.Id != x.Id)).ToList();
            var createNodes = nodes.Where(x => existingNodes.All(y => y.Id != x.Id)).ToList();
            var updateNodes = existingNodes.Where(x => nodes.Any(y => y.Id == x.Id)).ToList();

            await DeleteNodes(deleteNodes, nodes);
            await UpdateNodes(updateNodes, nodes);
            await CreateNodes(projectId, createNodes);

            await _nodeRepository.SaveAsync();
            
            foreach (var node in existingNodes)
            {
                if (node.Projects != null)
                {
                    foreach (var project in node.Projects)
                    {
                        _projectRepository.Detach(project);
                    }
                }

                if (node.Connectors != null)
                {
                    foreach (var connector in node.Connectors)
                    {
                        _connectorRepository.Detach(connector);
                    }
                }

                _nodeRepository.Detach(node);
            }
        }

        private Task UpdateNodes(IEnumerable<Node> existingNodes, IReadOnlyCollection<NodeAm> nodes)
        {
            foreach (var node in existingNodes)
            {
                var sourceNode = nodes.SingleOrDefault(x => x.Id == node.Id);
                if(sourceNode == null)
                    continue;

                _mapper.Map(sourceNode, node);
                _nodeRepository.Update(node);
            }

            return Task.CompletedTask;
        }

        private async Task DeleteNodes(IEnumerable<Node> existingNodes, IReadOnlyCollection<NodeAm> nodes)
        {
            foreach (var node in existingNodes)
            {
                await _nodeRepository.Delete(node.Id);
            }
        }

        private async Task CreateNodes(string projectId, IReadOnlyCollection<NodeAm> nodes)
        {
            foreach (var node in nodes)
            {
                var destinationNode = new Node();
                _mapper.Map(node, destinationNode);
                destinationNode.Projects = new List<Project> { new() { Id = projectId } };
                await _nodeRepository.CreateAsync(destinationNode);
            }
        }

        private Task UpdateAttributes(Node node, NodeAm sourceNode)
        {
            return Task.CompletedTask;
        }
    }
}
