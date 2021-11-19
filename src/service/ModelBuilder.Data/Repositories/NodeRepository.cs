using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Mb.Data.Repositories
{
    public class NodeRepository : GenericRepository<ModelBuilderDbContext, Node>, INodeRepository
    {
        private readonly IConnectorRepository _connectorRepository;
        private readonly IAttributeRepository _attributeRepository;
        private readonly ICompositeRepository _compositeRepository;
        private readonly ModelBuilderConfiguration _modelBuilderConfiguration;

        public NodeRepository(ModelBuilderDbContext dbContext, IConnectorRepository connectorRepository, IAttributeRepository attributeRepository, ICompositeRepository compositeRepository, IOptions<ModelBuilderConfiguration> modelBuilderConfiguration) : base(dbContext)
        {
            _connectorRepository = connectorRepository;
            _attributeRepository = attributeRepository;
            _compositeRepository = compositeRepository;
            _modelBuilderConfiguration = modelBuilderConfiguration?.Value;
        }

        public IEnumerable<Node> UpdateInsert(ICollection<Node> original, Project project, string invokedByDomain)
        {
            if (project?.Nodes == null || !project.Nodes.Any())
                yield break;

            var newNodes = original != null
                ? project.Nodes.Where(x => original.All(y => y.Id != x.Id)).ToList()
                : new List<Node>();

            foreach (var node in project.Nodes)
            {
                if (newNodes.Any(x => x.Id == node.Id))
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

                    node.Version = _modelBuilderConfiguration.Domain != node.Domain ? string.IsNullOrEmpty(node.Version) ? "1.0" : node.Version : "1.0";
                    _compositeRepository.AttachWithAttributes(node.Composites, EntityState.Added);
                    _connectorRepository.AttachWithAttributes(node.Connectors, EntityState.Added);
                    Attach(node, EntityState.Added);
                }
                else
                {
                    if (node.MasterProjectId != project.Id)
                        continue;

                    // Parties is not allowed changed our node
                    if (_modelBuilderConfiguration.Domain == node.Domain && _modelBuilderConfiguration.Domain != invokedByDomain)
                    {
                        Detach(node);
                        continue;
                    }

                    if (node.Attributes != null)
                    {
                        foreach (var attribute in node.Attributes)
                        {
                            attribute.UnitString = attribute.Units != null ? JsonConvert.SerializeObject(attribute.Units) : null;
                            _attributeRepository.Attach(attribute, EntityState.Modified);
                        }
                    }

                    SetNodeVersion(original?.FirstOrDefault(x => x.Id == node.Id), node);

                    _compositeRepository.AttachWithAttributes(node.Composites, EntityState.Modified);
                    _connectorRepository.AttachWithAttributes(node.Connectors, EntityState.Modified);
                    Attach(node, EntityState.Modified);
                }
            }
        }

        public async Task<IEnumerable<Node>> DeleteNodes(ICollection<Node> delete, string projectId, string invokedByDomain)
        {
            var subNodes = new List<Node>();

            foreach (var node in delete)
            {
                if (node.MasterProjectId != projectId)
                {
                    subNodes.Add(node);
                    continue;
                }

                // Parties is not allowed delete our node
                if (_modelBuilderConfiguration.Domain == node.Domain && _modelBuilderConfiguration.Domain != invokedByDomain)
                {
                    Detach(node);
                    continue;
                }

                _attributeRepository.Attach(node.Attributes, EntityState.Deleted);
                _compositeRepository.AttachWithAttributes(node.Composites, EntityState.Deleted);
                _connectorRepository.AttachWithAttributes(node.Connectors, EntityState.Deleted);

                await Delete(node.Id);
            }

            return subNodes;
        }

        #region Private

        private void SetNodeVersion(Node originalNode, Node node)
        {
            if(originalNode?.Id == null || string.IsNullOrWhiteSpace(node?.Id))
                return;

            //TODO: The rules for when to trigger major/minor version incrementation is not finalized!

            //Rds
            if (originalNode.Rds != node.Rds)
            {
                node.Version = originalNode.Version.IncrementMinorVersion();
                return;
            }
            
            //Description
            if (originalNode.Description != node.Description)
            {
                node.Version = originalNode.Version.IncrementMinorVersion();
                return;
            }

            //SemanticReference
            if (originalNode.SemanticReference != node.SemanticReference)
            {
                node.Version = originalNode.Version.IncrementMinorVersion();
                return;
            }

            //Name
            if (originalNode.Name != node.Name)
            {
                node.Version = originalNode.Version.IncrementMinorVersion();
                return;
            }

            //Label
            if (originalNode.Label != node.Label)
            {
                node.Version = originalNode.Version.IncrementMinorVersion();
                return;
            }

            //StatusId
            if (originalNode.StatusId != node.StatusId)
            {
                node.Version = originalNode.Version.IncrementMinorVersion();
                return;
            }

            //Aspect
            if (originalNode.Aspect != node.Aspect)
            {
                node.Version = originalNode.Version.IncrementMinorVersion();
                return;
            }

            //IsRoot
            if (originalNode.IsRoot != node.IsRoot)
            {
                node.Version = originalNode.Version.IncrementMinorVersion(); //Major
                return;
            }

            //MasterProjectId
            if (originalNode.MasterProjectId != node.MasterProjectId)
            {
                node.Version = originalNode.Version.IncrementMinorVersion(); //Major
                return;
            }

            //Symbol
            if (originalNode.Symbol != node.Symbol)
            {
                node.Version = originalNode.Version.IncrementMinorVersion();
                return;
            }

            //PurposeString
            if (originalNode.PurposeString != node.PurposeString)
            {
                node.Version = originalNode.Version.IncrementMinorVersion();
                return;
            }

            //Connectors
            if (originalNode.Connectors?.Count != node.Connectors?.Count)
            {
                node.Version = originalNode.Version.IncrementMinorVersion();
                return;
            }

            //Attributes
            if (originalNode.Attributes?.Count != node.Attributes?.Count)
            {
                node.Version = originalNode.Version.IncrementMinorVersion();
                return;
            }

            //Composites
            if (originalNode.Composites?.Count != node.Composites?.Count)
            {
                node.Version = originalNode.Version.IncrementMinorVersion();
            }

            //FromEdges
            if (originalNode.FromEdges?.Count != node.FromEdges?.Count)
            {
                node.Version = originalNode.Version.IncrementMinorVersion();
                return;
            }

            //ToEdges
            if (originalNode.ToEdges?.Count != node.ToEdges?.Count)
            {
                node.Version = originalNode.Version.IncrementMinorVersion();
                return;
            }

            //Cost
            if (originalNode.Cost != node.Cost)
            {
                node.Version = originalNode.Version.IncrementMinorVersion();
                return;
            }

            node.Version = originalNode.Version;

        }

        #endregion Private
    }
}
