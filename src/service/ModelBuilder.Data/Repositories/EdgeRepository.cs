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
using Mimirorg.TypeLibrary.Enums;
using Mimirorg.Common.Exceptions;
using Mb.Models.Common;

namespace Mb.Data.Repositories
{
    public class EdgeRepository : GenericRepository<ModelBuilderDbContext, Edge>, IEdgeRepository
    {
        private readonly IAttributeRepository _attributeRepository;
        private readonly ITransportRepository _transportRepository;
        private readonly IInterfaceRepository _interfaceRepository;
        private readonly IConnectorRepository _connectorRepository;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly ICommonRepository _commonRepository;
        private readonly IModelBuilderProcRepository _modelBuilderProcRepository;

        public EdgeRepository(ModelBuilderDbContext dbContext, IAttributeRepository attributeRepository,
            ITransportRepository transportRepository, IInterfaceRepository interfaceRepository,
            IConnectorRepository connectorRepository, IHttpContextAccessor contextAccessor,
            ICommonRepository commonRepository, IModelBuilderProcRepository modelBuilderProcRepository) : base(
            dbContext)
        {
            _attributeRepository = attributeRepository;
            _transportRepository = transportRepository;
            _interfaceRepository = interfaceRepository;
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

                    _transportRepository.UpdateInsert(edge.Transport, EntityState.Added);
                    _interfaceRepository.UpdateInsert(edge.Interface, EntityState.Added);
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

                    _transportRepository.UpdateInsert(edge.Transport, EntityState.Modified);
                    _interfaceRepository.UpdateInsert(edge.Interface, EntityState.Modified);
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

                //Attributes - Transport (delete)
                if (edge.Transport?.Attributes != null && edge.Transport.Attributes.Any())
                    _attributeRepository.Attach(edge.Transport.Attributes, EntityState.Deleted);

                //Attributes - Interface (delete)
                if (edge.Interface?.Attributes != null && edge.Interface.Attributes.Any())
                    _attributeRepository.Attach(edge.Interface.Attributes, EntityState.Deleted);

                //Attributes - Terminal transport (delete)
                if (edge.Transport?.InputTerminalId != null && edge.Transport?.OutputTerminalId != null)
                {
                    var terminalTransportAttributes = _attributeRepository.FindBy(x =>
                        x.TerminalId == edge.Transport.InputTerminalId ||
                        x.TerminalId == edge.Transport.OutputTerminalId).ToList();

                    if (terminalTransportAttributes.Any())
                        _attributeRepository.Attach(terminalTransportAttributes, EntityState.Deleted);
                }

                //Attributes - Terminal Interface (delete)
                if (edge.Interface?.InputTerminalId != null && edge.Interface?.OutputTerminalId != null)
                {
                    var terminalInterfaceAttributes = _attributeRepository.FindBy(x =>
                        x.TerminalId == edge.Interface.InputTerminalId ||
                        x.TerminalId == edge.Interface.OutputTerminalId).ToList();

                    if (terminalInterfaceAttributes.Any())
                        _attributeRepository.Attach(terminalInterfaceAttributes, EntityState.Deleted);
                }

                //Transport - (delete)
                if (edge.Transport != null)
                    _transportRepository.Attach(edge.Transport, EntityState.Deleted);

                //Interface - (delete)
                if (edge.Interface != null)
                    _interfaceRepository.Attach(edge.Interface, EntityState.Deleted);

                //Edge - (delete)
                Attach(edge, EntityState.Deleted);

                //Terminal - Transport output (delete) 
                if (edge.Transport?.InputTerminalId != null)
                    await _connectorRepository.Delete(edge.Transport.InputTerminalId);

                //Terminal - Transport input (delete)
                if (edge.Transport?.OutputTerminalId != null)
                    await _connectorRepository.Delete(edge.Transport.OutputTerminalId);

                //Terminal - Interface input (delete)
                if (edge.Interface?.InputTerminalId != null)
                    await _connectorRepository.Delete(edge.Interface.InputTerminalId);

                //Terminal - Interface output (delete)
                if (edge.Interface?.OutputTerminalId != null)
                    await _connectorRepository.Delete(edge.Interface.OutputTerminalId);

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
                .AddColumn(x => x.TransportId)
                .AddColumn(x => x.InterfaceId)
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
        /// <remarks>Get det edge identifier and all connected attributes from transport, interface and terminals</remarks>
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

            if (!string.IsNullOrWhiteSpace(edge?.Transport?.UpdatedBy))
                edge.Transport.UpdatedBy = contextAccessorName;

            if (edge?.Transport?.Updated != null)
                edge.Transport.Updated = dateTimeNow;

            if (string.IsNullOrWhiteSpace(edge?.Transport?.StatusId))
            {
                if (edge?.Transport != null)
                    edge.Transport.StatusId = ObjectType.NotSet.ToString();
            }

            if (!string.IsNullOrWhiteSpace(edge?.Interface?.UpdatedBy))
                edge.Interface.UpdatedBy = contextAccessorName;

            if (edge?.Interface?.Updated != null)
                edge.Interface.Updated = dateTimeNow;

            if (string.IsNullOrWhiteSpace(edge?.Interface?.StatusId))
            {
                if (edge?.Interface != null)
                    edge.Interface.StatusId = ObjectType.NotSet.ToString();
            }

            if (!isNewEdge)
                return;

            //TODO: Versioning

            const string version = "1.0";

            if (!string.IsNullOrWhiteSpace(edge?.Transport?.Version))
                edge.Transport.Version = version;

            if (!string.IsNullOrWhiteSpace(edge?.Transport?.CreatedBy))
                edge.Transport.CreatedBy = contextAccessorName;

            if (edge?.Transport?.Created != null)
                edge.Transport.Created = dateTimeNow;

            if (!string.IsNullOrWhiteSpace(edge?.Interface?.Version))
                edge.Interface.Version = version;

            if (!string.IsNullOrWhiteSpace(edge?.Interface?.CreatedBy))
                edge.Interface.CreatedBy = contextAccessorName;

            if (edge?.Interface?.Created != null)
                edge.Interface.Created = dateTimeNow;
        }
    }
}