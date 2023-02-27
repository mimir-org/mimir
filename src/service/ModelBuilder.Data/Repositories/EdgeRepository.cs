using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Mimirorg.Common.Extensions;
using SqlBulkTools;
using Mimirorg.Common.Exceptions;
using Mb.Models.Common;

namespace Mb.Data.Repositories
{
    public class EdgeRepository : GenericRepository<ModelBuilderDbContext, Edge>, IEdgeRepository
    {
        private readonly IAttributeRepository _attributeRepository;
        private readonly IConnectorRepository _connectorRepository;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly ICommonRepository _commonRepository;
        private readonly IModelBuilderProcRepository _modelBuilderProcRepository;

        public EdgeRepository(ModelBuilderDbContext dbContext, IAttributeRepository attributeRepository,
            IConnectorRepository connectorRepository, IHttpContextAccessor contextAccessor,
            ICommonRepository commonRepository, IModelBuilderProcRepository modelBuilderProcRepository) : base(
            dbContext)
        {
            _attributeRepository = attributeRepository;
            _connectorRepository = connectorRepository;
            _contextAccessor = contextAccessor;
            _commonRepository = commonRepository;
            _modelBuilderProcRepository = modelBuilderProcRepository;
        }

        public IEnumerable<(Edge edge, WorkerStatus status)> UpdateInsert(ICollection<Edge> original, Project project,
            string invokedByDomain)
        {
            if (project?.Edges == null || !project.Edges.Any() || original == null)
                yield break;

            var newEdges = project.Edges.Where(x => original.All(y => y.Id != x.Id)).ToList();

            foreach (var edge in project.Edges)
            {
                ResetEdgeBeforeSave(edge);

                if (newEdges.Any(x => x.Id == edge.Id))
                {
                    SetEdgeProperties(edge, true);

                    Attach(edge, EntityState.Added);
                    yield return (edge, WorkerStatus.Create);
                }
                else
                {
                    // Parties is not allowed changed our edge
                    if (_commonRepository.GetDomain() == edge.Domain &&
                        _commonRepository.GetDomain() != invokedByDomain)
                    {
                        Detach(edge);
                        continue;
                    }

                    SetEdgeProperties(edge, false);

                    Attach(edge, EntityState.Modified);
                    yield return (edge, WorkerStatus.Update);
                }
            }
        }

        public async Task<IEnumerable<(Edge edge, WorkerStatus status)>> DeleteEdges(ICollection<Edge> delete,
            string projectId, string invokedByDomain)
        {
            var returnValues = new List<(Edge edge, WorkerStatus status)>();

            if (delete == null || projectId == null || !delete.Any())
                return returnValues;

            foreach (var edge in delete)
            {
                // Parties is not allowed delete our edge
                if (_commonRepository.GetDomain() == edge.Domain && _commonRepository.GetDomain() != invokedByDomain)
                {
                    Detach(edge);
                    continue;
                }

                //Edge - (delete)
                Attach(edge, EntityState.Deleted);

                //projectWorker.Edges.Add(new EdgeWorker { Edge = edge, WorkerStatus = WorkerStatus.Delete });
                returnValues.Add((edge, WorkerStatus.Delete));
            }

            return returnValues;
        }

        /// <summary>
        /// Bulk edge update
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="edges">The edges to be upserted</param>
        public void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Edge> edges)
        {
            if (edges == null || !edges.Any())
                return;

            bulk.Setup<Edge>()
                .ForCollection(edges)
                .WithTable("Edge")
                .AddColumn(x => x.Id)
                .AddColumn(x => x.Iri)
                .AddColumn(x => x.FromConnectorId)
                .AddColumn(x => x.FromConnectorIri)
                .AddColumn(x => x.ToConnectorId)
                .AddColumn(x => x.ToConnectorIri)
                .AddColumn(x => x.FromNodeId)
                .AddColumn(x => x.FromNodeIri)
                .AddColumn(x => x.ToNodeId)
                .AddColumn(x => x.ToNodeIri)
                .AddColumn(x => x.IsLocked)
                .AddColumn(x => x.IsLockedStatusBy)
                .AddColumn(x => x.IsLockedStatusDate)
                .AddColumn(x => x.MasterProjectId)
                .AddColumn(x => x.MasterProjectIri)
                .AddColumn(x => x.ProjectId)
                .AddColumn(x => x.ProjectIri)
                .BulkInsertOrUpdate()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }


        /// <summary>
        /// Bulk delete edges
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="edges">The edges to be deleted</param>
        public void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Edge> edges)
        {
            if (edges == null || !edges.Any())
                return;

            bulk.Setup<Edge>()
                .ForCollection(edges)
                .WithTable("Edge")
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

            if (lockDms.Any(x => x.Type is not EntityType.Edge))
                throw new MimirorgBadRequestException("EntityType is not of type Edge");

            bulk.Setup<LockDm>()
                .ForCollection(lockDms)
                .WithTable("Edge")
                .AddColumn(x => x.Id)
                .AddColumn(x => x.IsLocked)
                .AddColumn(x => x.IsLockedStatusBy)
                .AddColumn(x => x.IsLockedStatusDate)
                .BulkUpdate()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }

        /// <summary>
        /// Get edge connected data
        /// </summary>
        /// <param name="edgeId">The edge you want data from</param>
        /// <returns>A collection connected identity data</returns>
        /// <remarks>Get det edge identifier and all connected attributes from terminals</remarks>
        public async Task<List<ObjectIdentity>> GetEdgeConnectedData(string edgeId)
        {
            if (string.IsNullOrWhiteSpace(edgeId))
                return null;

            var procParams = new Dictionary<string, object>
            {
                {"@EdgeId", edgeId}
            };

            var attributes =
                await _modelBuilderProcRepository.ExecuteStoredProc<ObjectIdentity>("EdgeLockData", procParams);
            return attributes;
        }

        private void ResetEdgeBeforeSave(Edge edge)
        {
            edge.FromConnector = null;
            edge.ToConnector = null;
            edge.FromNode = null;
            edge.ToNode = null;
        }

        private void SetEdgeProperties(Edge edge, bool isNewEdge)
        {
            var dateTimeNow = DateTime.Now.ToUniversalTime();
            var contextAccessorName = _contextAccessor.GetName();

            if (!isNewEdge)
                return;

            //TODO: Versioning

            const string version = "1.0";
        }
    }
}