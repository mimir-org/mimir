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

        public NodeRepository(ModelBuilderDbContext dbContext, IConnectorRepository connectorRepository, IAttributeRepository attributeRepository) : base(dbContext)
        {
            _connectorRepository = connectorRepository;
            _attributeRepository = attributeRepository;
        }

        public Task UpdateInsert(ICollection<Node> original, Project project)
        {
            if (project?.Nodes == null || !project.Nodes.Any())
                return Task.CompletedTask;

            var updates = original != null
                ? project.Nodes.Where(x => original.All(y => y.Id != x.Id)).ToList()
                : new List<Node>();

            foreach (var node in project.Nodes)
            {
                if (updates.Any(x => x.Id == node.Id))
                {
                    if (node.Attributes != null)
                    {
                        foreach (var attribute in node.Attributes)
                        {
                            attribute.UnitString = attribute.Units != null ? JsonConvert.SerializeObject(attribute.Units) : null;
                            _attributeRepository.Attach(attribute, EntityState.Added);
                        }
                    }

                    _connectorRepository.AttachWithAttributes(node.Connectors, EntityState.Added);
                    Attach(node, EntityState.Added);
                }
                else
                {
                    if (node.Attributes != null)
                    {
                        foreach (var attribute in node.Attributes)
                        {
                            attribute.UnitString = attribute.Units != null ? JsonConvert.SerializeObject(attribute.Units) : null;
                            _attributeRepository.Attach(attribute, EntityState.Modified);
                        }
                    }

                    _connectorRepository.AttachWithAttributes(node.Connectors, EntityState.Modified);
                    Attach(node, EntityState.Modified);
                }
            }

            return Task.CompletedTask;
        }

        public async Task DeleteNodes(ICollection<Node> delete)
        {
            foreach (var node in delete)
            {
                _attributeRepository.Attach(node.Attributes, EntityState.Deleted);
                _connectorRepository.AttachWithAttributes(node.Connectors, EntityState.Deleted);
                
                await Delete(node.Id);
            }
        }
    }
}
