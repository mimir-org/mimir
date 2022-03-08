using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Models.Extensions;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Mb.Data.Repositories
{
    public class NodeRepository : GenericRepository<ModelBuilderDbContext, Node>, INodeRepository
    {
        private readonly IConnectorRepository _connectorRepository;
        private readonly IAttributeRepository _attributeRepository;
        private readonly ISimpleRepository _simpleRepository;
        private readonly ICommonRepository _commonRepository;

        public NodeRepository(ModelBuilderDbContext dbContext, IConnectorRepository connectorRepository, IAttributeRepository attributeRepository, ISimpleRepository simpleRepository, ICommonRepository commonRepository) : base(dbContext)
        {
            _connectorRepository = connectorRepository;
            _attributeRepository = attributeRepository;
            _simpleRepository = simpleRepository;
            _commonRepository = commonRepository;
        }

        public IEnumerable<(Node node, WorkerStatus status)> UpdateInsert(ICollection<Node> original, Project project, string invokedByDomain)
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
                    if (node.Attributes != null)
                    {
                        foreach (var attribute in node.Attributes)
                        {
                            attribute.UnitString = attribute.Units != null ? JsonConvert.SerializeObject(attribute.Units) : null;
                            _attributeRepository.Attach(attribute, EntityState.Added);
                        }
                    }

                    node.Version = _commonRepository.GetDomain() != node.Domain ? string.IsNullOrEmpty(node.Version) ? "1.0" : node.Version : "1.0";
                    _simpleRepository.AttachWithAttributes(node.Simples, EntityState.Added);
                    _connectorRepository.AttachWithAttributes(node.Connectors, EntityState.Added);

                    yield return (node, WorkerStatus.Create);
                    Attach(node, EntityState.Added);
                }
                else
                {
                    // Parties is not allowed changed our node
                    if (_commonRepository.GetDomain() == node.Domain && _commonRepository.GetDomain() != invokedByDomain)
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

                    _simpleRepository.AttachWithAttributes(node.Simples, EntityState.Modified);
                    _connectorRepository.AttachWithAttributes(node.Connectors, EntityState.Modified);
                    yield return (node, WorkerStatus.Update);
                    Attach(node, EntityState.Modified);
                }
            }
        }

        public IEnumerable<(Node node, WorkerStatus status)> DeleteNodes(ICollection<Node> delete, string projectId, string invokedByDomain)
        {
            var returnValues = new List<(Node edge, WorkerStatus status)>();

            if (delete == null || projectId == null || !delete.Any())
                return returnValues;

            foreach (var node in delete)
            {
                // Parties is not allowed delete our node
                if (_commonRepository.GetDomain() == node.Domain && _commonRepository.GetDomain() != invokedByDomain)
                {
                    Detach(node);
                    continue;
                }

                _attributeRepository.Attach(node.Attributes, EntityState.Deleted);
                _simpleRepository.AttachWithAttributes(node.Simples, EntityState.Deleted);
                _connectorRepository.AttachWithAttributes(node.Connectors, EntityState.Deleted);
                Attach(node, EntityState.Deleted);

                returnValues.Add((node, WorkerStatus.Delete));
            }

            return returnValues;
        }

        #region Private

        private void SetNodeVersion(Node originalNode, Node node)
        {
            if (originalNode?.Id == null || string.IsNullOrWhiteSpace(node?.Id))
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

            //Simples
            if (originalNode.Simples?.Count != node.Simples?.Count)
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