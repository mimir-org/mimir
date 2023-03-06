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
    public class ConnectionRepository : GenericRepository<ModelBuilderDbContext, Connection>, IConnectionRepository
    {
        private readonly IAttributeRepository _attributeRepository;
        private readonly IConnectorRepository _connectorRepository;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly ICommonRepository _commonRepository;
        private readonly IModelBuilderProcRepository _modelBuilderProcRepository;

        public ConnectionRepository(ModelBuilderDbContext dbContext, IAttributeRepository attributeRepository,
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

        public IEnumerable<(Connection connection, WorkerStatus status)> UpdateInsert(ICollection<Connection> original, Project project,
            string invokedByDomain)
        {
            if (project?.Connections == null || !project.Connections.Any() || original == null)
                yield break;

            var newConnections = project.Connections.Where(x => original.All(y => y.Id != x.Id)).ToList();

            foreach (var connection in project.Connections)
            {
                ResetConnectionBeforeSave(connection);

                if (newConnections.Any(x => x.Id == connection.Id))
                {
                    SetConnectionProperties(connection, true);

                    Attach(connection, EntityState.Added);
                    yield return (connection, WorkerStatus.Create);
                }
                else
                {
                    // Parties is not allowed changed our connection
                    if (_commonRepository.GetDomain() == connection.Domain &&
                        _commonRepository.GetDomain() != invokedByDomain)
                    {
                        Detach(connection);
                        continue;
                    }

                    SetConnectionProperties(connection, false);

                    Attach(connection, EntityState.Modified);
                    yield return (connection, WorkerStatus.Update);
                }
            }
        }

        public async Task<IEnumerable<(Connection connection, WorkerStatus status)>> DeleteConnections(ICollection<Connection> delete,
            string projectId, string invokedByDomain)
        {
            var returnValues = new List<(Connection connection, WorkerStatus status)>();

            if (delete == null || projectId == null || !delete.Any())
                return returnValues;

            foreach (var connection in delete)
            {
                // Parties is not allowed delete our connection
                if (_commonRepository.GetDomain() == connection.Domain && _commonRepository.GetDomain() != invokedByDomain)
                {
                    Detach(connection);
                    continue;
                }

                //Connection - (delete)
                Attach(connection, EntityState.Deleted);

                returnValues.Add((connection, WorkerStatus.Delete));
            }

            return returnValues;
        }

        /// <summary>
        /// Bulk connection update
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="connections">The connections to be upserted</param>
        public void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Connection> connections)
        {
            if (connections == null || !connections.Any())
                return;

            bulk.Setup<Connection>()
                .ForCollection(connections)
                .WithTable("Connection")
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
        /// Bulk delete connections
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="connections">The connections to be deleted</param>
        public void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Connection> connections)
        {
            if (connections == null || !connections.Any())
                return;

            bulk.Setup<Connection>()
                .ForCollection(connections)
                .WithTable("Connection")
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

            if (lockDms.Any(x => x.Type is not EntityType.Connection))
                throw new MimirorgBadRequestException("EntityType is not of type Connection");

            bulk.Setup<LockDm>()
                .ForCollection(lockDms)
                .WithTable("Connection")
                .AddColumn(x => x.Id)
                .AddColumn(x => x.IsLocked)
                .AddColumn(x => x.IsLockedStatusBy)
                .AddColumn(x => x.IsLockedStatusDate)
                .BulkUpdate()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }

        /// <summary>
        /// Get connection connected data
        /// </summary>
        /// <param name="connectionId">The connection you want data from</param>
        /// <returns>A collection connected identity data</returns>
        /// <remarks>Get det connection identifier and all connected attributes from terminals</remarks>
        public async Task<List<ObjectIdentity>> GetConnectionConnectedData(string connectionId)
        {
            if (string.IsNullOrWhiteSpace(connectionId))
                return null;

            var procParams = new Dictionary<string, object>
            {
                {"@ConnectionId", connectionId}
            };

            var attributes =
                await _modelBuilderProcRepository.ExecuteStoredProc<ObjectIdentity>("ConnectionLockData", procParams);
            return attributes;
        }

        private void ResetConnectionBeforeSave(Connection connection)
        {
            connection.FromConnector = null;
            connection.ToConnector = null;
            connection.FromNode = null;
            connection.ToNode = null;
        }

        private void SetConnectionProperties(Connection connection, bool isNewConnection)
        {
            var dateTimeNow = DateTime.Now.ToUniversalTime();
            var contextAccessorName = _contextAccessor.GetName();

            if (!isNewConnection)
                return;

            //TODO: Versioning

            const string version = "1.0";
        }
    }
}