using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Mb.Core.Repositories
{
    public class NodeRepository : GenericRepository<ModelBuilderDbContext, Node>, INodeRepository
    {
        private readonly IConnectorRepository _connectorRepository;
        private readonly IAttributeRepository _attributeRepository;
        private readonly ICompositeRepository _compositeRepository;

        public NodeRepository(ModelBuilderDbContext dbContext, IConnectorRepository connectorRepository, IAttributeRepository attributeRepository, ICompositeRepository compositeRepository) : base(dbContext)
        {
            _connectorRepository = connectorRepository;
            _attributeRepository = attributeRepository;
            _compositeRepository = compositeRepository;
        }

        public IEnumerable<Node> UpdateInsert(ICollection<Node> original, Project project)
        {
            if (project?.Nodes == null || !project.Nodes.Any())
                yield break;

            var updates = original != null
                ? project.Nodes.Where(x => original.All(y => y.Id != x.Id)).ToList()
                : new List<Node>();

            foreach (var node in project.Nodes)
            {
                if (updates.Any(x => x.Id == node.Id))
                {
                    if (node.MasterProjectId != project.Id)
                    {
                        Attach(node, EntityState.Unchanged);
                        yield return node;
                        continue;
                    }

                    if (node.Attributes != null)
                    {
                        foreach (var attribute in node.Attributes)
                        {
                            attribute.UnitString = attribute.Units != null ? JsonConvert.SerializeObject(attribute.Units) : null;
                            _attributeRepository.Attach(attribute, EntityState.Added);
                        }
                    }

                    _compositeRepository.AttachWithAttributes(node.Composites, EntityState.Added);
                    _connectorRepository.AttachWithAttributes(node.Connectors, EntityState.Added);
                    Attach(node, EntityState.Added);
                }
                else
                {
                    if (node.MasterProjectId != project.Id)
                        continue;

                    if (node.Attributes != null)
                    {
                        foreach (var attribute in node.Attributes)
                        {
                            attribute.UnitString = attribute.Units != null ? JsonConvert.SerializeObject(attribute.Units) : null;
                            _attributeRepository.Attach(attribute, EntityState.Modified);
                        }
                    }

                    _compositeRepository.AttachWithAttributes(node.Composites, EntityState.Modified);
                    _connectorRepository.AttachWithAttributes(node.Connectors, EntityState.Modified);
                    Attach(node, EntityState.Modified);
                }
            }
        }

        public async Task<IEnumerable<Node>> DeleteNodes(ICollection<Node> delete, string projectId)
        {
            var subNodes = new List<Node>();

            foreach (var node in delete)
            {
                if (node.MasterProjectId != projectId)
                {
                    subNodes.Add(node);
                    continue;
                }
                _attributeRepository.Attach(node.Attributes, EntityState.Deleted);
                _compositeRepository.AttachWithAttributes(node.Composites, EntityState.Deleted);
                _connectorRepository.AttachWithAttributes(node.Connectors, EntityState.Deleted);

                await Delete(node.Id);
            }

            return subNodes;
        }
    }
}
