using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mimirorg.Common.Exceptions;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using SqlBulkTools;
using Mb.Models.Common;

namespace Mb.Data.Repositories
{
    public class NodeRepository : GenericRepository<ModelBuilderDbContext, Node>, INodeRepository
    {
        private readonly IConnectorRepository _connectorRepository;
        private readonly IAttributeRepository _attributeRepository;
        private readonly ICommonRepository _commonRepository;
        private readonly IModelBuilderProcRepository _modelBuilderProcRepository;

        public NodeRepository(ModelBuilderDbContext dbContext, IConnectorRepository connectorRepository, IAttributeRepository attributeRepository, ICommonRepository commonRepository, IModelBuilderProcRepository modelBuilderProcRepository) : base(dbContext)
        {
            _connectorRepository = connectorRepository;
            _attributeRepository = attributeRepository;
            _commonRepository = commonRepository;
            _modelBuilderProcRepository = modelBuilderProcRepository;
        }

        public IEnumerable<(Node node, WorkerStatus status)> UpdateInsert(ICollection<Node> original, Project project,
            string invokedByDomain)
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
                            attribute.UnitString = attribute.Units != null
                                ? JsonConvert.SerializeObject(attribute.Units)
                                : null;
                            _attributeRepository.Attach(attribute, EntityState.Added);
                        }
                    }

                    node.Version = _commonRepository.GetDomain() != node.Domain
                        ? string.IsNullOrEmpty(node.Version) ? "1.0" : node.Version
                        : "1.0";

                    _connectorRepository.AttachWithAttributes(node.Connectors, EntityState.Added);

                    yield return (node, WorkerStatus.Create);
                    Attach(node, EntityState.Added);
                }
                else
                {
                    // Parties is not allowed changed our node
                    if (_commonRepository.GetDomain() == node.Domain &&
                        _commonRepository.GetDomain() != invokedByDomain)
                    {
                        Detach(node);
                        continue;
                    }

                    if (node.Attributes != null)
                    {
                        foreach (var attribute in node.Attributes)
                        {
                            attribute.UnitString = attribute.Units != null
                                ? JsonConvert.SerializeObject(attribute.Units)
                                : null;
                            _attributeRepository.Attach(attribute, EntityState.Modified);
                        }
                    }

                    _connectorRepository.AttachWithAttributes(node.Connectors, EntityState.Modified);
                    yield return (node, WorkerStatus.Update);
                    Attach(node, EntityState.Modified);
                }
            }
        }

        public IEnumerable<(Node node, WorkerStatus status)> DeleteNodes(ICollection<Node> delete, string projectId,
            string invokedByDomain)
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
                _connectorRepository.AttachWithAttributes(node.Connectors, EntityState.Deleted);
                Attach(node, EntityState.Deleted);

                returnValues.Add((node, WorkerStatus.Delete));
            }

            return returnValues;
        }

        /// <summary>
        /// Bulk node update
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn"></param>
        /// <param name="nodes">The nodes to be upserted</param>
        public void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Node> nodes)
        {
            if (nodes == null || !nodes.Any())
                return;

            bulk.Setup<Node>()
                .ForCollection(nodes)
                .WithTable("Node")
                .AddColumn(x => x.Id)
                .AddColumn(x => x.Iri)
                .AddColumn(x => x.Rds)
                .AddColumn(x => x.Description)
                .AddColumn(x => x.TypeReferenceString)
                .AddColumn(x => x.Name)
                .AddColumn(x => x.Label)
                .AddColumn(x => x.PositionX)
                .AddColumn(x => x.PositionY)
                .AddColumn(x => x.IsLocked)
                .AddColumn(x => x.IsLockedStatusBy)
                .AddColumn(x => x.IsLockedStatusDate)
                .AddColumn(x => x.PositionBlockX)
                .AddColumn(x => x.PositionBlockY)
                .AddColumn(x => x.Level)
                .AddColumn(x => x.Order)
                .AddColumn(x => x.UpdatedBy)
                .AddColumn(x => x.Updated)
                .AddColumn(x => x.Created)
                .AddColumn(x => x.CreatedBy)
                .AddColumn(x => x.LibraryTypeId)
                .AddColumn(x => x.Version)
                .AddColumn(x => x.Aspect)
                .AddColumn(x => x.NodeType)
                .AddColumn(x => x.MasterProjectId)
                .AddColumn(x => x.MasterProjectIri)
                .AddColumn(x => x.Symbol)
                .AddColumn(x => x.PurposeString)
                .AddColumn(x => x.ProjectId)
                .AddColumn(x => x.ProjectIri)
                .AddColumn(x => x.Width)
                .AddColumn(x => x.Height)
                .BulkInsertOrUpdate()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }

        /// <summary>
        /// Bulk delete nodes
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="nodes">The nodes to be deleted</param>
        public void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Node> nodes)
        {
            if (nodes == null || !nodes.Any())
                return;

            bulk.Setup<Node>()
                .ForCollection(nodes)
                .WithTable("Node")
                .AddColumn(x => x.Id)
                .BulkDelete()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }

        /// <summary>
        /// Bulk attributes update lock status
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="lockDms">The attributes to be updated</param>
        public void BulkUpdateLockStatus(BulkOperations bulk, SqlConnection conn, List<LockDm> lockDms)
        {
            if (lockDms == null || !lockDms.Any())
                return;

            if (lockDms.Any(x => x.Type is not EntityType.Node))
                throw new MimirorgBadRequestException("EntityType is not of type Node");

            bulk.Setup<LockDm>()
                .ForCollection(lockDms)
                .WithTable("Node")
                .AddColumn(x => x.Id)
                .AddColumn(x => x.IsLocked)
                .AddColumn(x => x.IsLockedStatusBy)
                .AddColumn(x => x.IsLockedStatusDate)
                .BulkUpdate()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }


        /// <summary>
        /// Get node connected data
        /// </summary>
        /// <param name="nodeId">The node you want data from</param>
        /// <returns>A collection connected identity data</returns>
        /// <remarks>Get det node identifier and all connected children including
        /// children nodes, children edges, children attributes from children transports, children interfaces and children terminals</remarks>
        public async Task<List<ObjectIdentity>> GetNodeConnectedData(string nodeId)
        {
            if (string.IsNullOrWhiteSpace(nodeId))
                return null;

            var procParams = new Dictionary<string, object>
            {
                {"@NodeId", nodeId}
            };

            var attributes = await _modelBuilderProcRepository.ExecuteStoredProc<ObjectIdentity>("NodeLockData", procParams);
            return attributes;
        }

    }
}