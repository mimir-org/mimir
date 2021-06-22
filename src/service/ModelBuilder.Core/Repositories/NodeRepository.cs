using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;

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

        public async Task UpdateInsert(IList<Node> original, Project project)
        {
            if (project?.Nodes == null || !project.Nodes.Any())
                return;

            var updates = original != null
                ? project.Nodes.Where(x => original.All(y => y.Id != x.Id)).ToList()
                : new List<Node>();

            foreach (var node in project.Nodes)
            {
                if (updates.Any(x => x.Id == node.Id))
                {
                    Attach(node, EntityState.Added);

                    //foreach (var attribute in node.Attributes)
                    //{
                    //    _attributeRepository.Attach(attribute, EntityState.Added);
                    //}

                    //await _attributeRepository.SaveAsync();

                    //foreach (var attribute in node.Attributes)
                    //{
                    //    _attributeRepository.Detach(attribute);
                    //}

                    foreach (var connector in node.Connectors)
                    {
                        _connectorRepository.Attach(connector, EntityState.Added);
                    }

                    
                }
                else
                {
                    Attach(node, EntityState.Modified);

                    //foreach (var attribute in node.Attributes)
                    //{
                    //    _attributeRepository.Attach(attribute, EntityState.Modified);
                    //}

                    //await _attributeRepository.SaveAsync();

                    //foreach (var attribute in node.Attributes)
                    //{
                    //    _attributeRepository.Detach(attribute);
                    //}

                    foreach (var connector in node.Connectors)
                    {
                        _connectorRepository.Attach(connector, EntityState.Modified);
                    }

                    
                }
            }

            await SaveAsync();
            await _connectorRepository.SaveAsync();

            foreach (var node in project.Nodes)
            {
                Detach(node);
                //foreach (var attribute in node.Attributes)
                //{
                //    _attributeRepository.Detach(attribute);
                //}

                foreach (var connector in node.Connectors)
                {
                    _connectorRepository.Detach(connector);
                }
            }
        }

        public async Task DeleteNodes(IList<Node> delete)
        {
            foreach (var node in delete)
            {
                foreach (var attribute in node.Attributes)
                {
                    _attributeRepository.Attach(attribute, EntityState.Deleted);
                }

                foreach (var connector in node.Connectors)
                {
                    _connectorRepository.Attach(connector, EntityState.Deleted);
                }

                await Delete(node.Id);
            }

            await SaveAsync();

            foreach (var node in delete)
            {
                foreach (var attribute in node.Attributes)
                {
                    _attributeRepository.Detach(attribute);
                }

                foreach (var connector in node.Connectors)
                {
                    _connectorRepository.Detach(connector);
                }
            }
        }
    }
}
