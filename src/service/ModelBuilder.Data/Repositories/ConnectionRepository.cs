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

namespace Mb.Data.Repositories;

public class ConnectionRepository : GenericRepository<ModelBuilderDbContext, ConnectionDm>, IConnectionRepository
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

    public IEnumerable<(ConnectionDm connection, WorkerStatus status)> UpdateInsert(ICollection<ConnectionDm> original, ProjectDm project,
        string invokedByDomain)
    {
        if (project?.Connections == null || !project.Connections.Any() || original == null)
            yield break;

        var newConnections = project.Connections.Where(x => original.All(y => y.Id != x.Id)).ToList();

        foreach (var connection in project.Connections)
        {
            if (newConnections.Any(x => x.Id == connection.Id))
            {
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

                Attach(connection, EntityState.Modified);
                yield return (connection, WorkerStatus.Update);
            }
        }
    }

    public Task<IEnumerable<(ConnectionDm connection, WorkerStatus status)>> DeleteConnections(ICollection<ConnectionDm> delete,
        string projectId, string invokedByDomain)
    {
        var returnValues = new List<(ConnectionDm connection, WorkerStatus status)>();

        if (delete == null || projectId == null || !delete.Any())
            return Task.FromResult<IEnumerable<(ConnectionDm connection, WorkerStatus status)>>(returnValues);

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

        return Task.FromResult<IEnumerable<(ConnectionDm connection, WorkerStatus status)>>(returnValues);
    }

    public void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<ConnectionTerminalDm> connectionTerminals)
    {
        if (connectionTerminals == null || !connectionTerminals.Any())
            return;

        bulk.Setup<ConnectionTerminalDm>()
            .ForCollection(connectionTerminals)
            .WithTable("Connection")
            //Parent
            .AddColumn(x => x.Id)
            .AddColumn(x => x.FromConnector)
            .AddColumn(x => x.ToConnector)
            .AddColumn(x => x.MainProject)
            .AddColumn(x => x.Project)
            //Child
            .AddColumn(x => x.TerminalType)
            .AddColumn(x => x.TerminalParentType)
            .AddColumn(x => x.Discriminator)
            //Operations
            .BulkInsertOrUpdate()
            .MatchTargetOn(x => x.Id)
            .Commit(conn);
    }

    public void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<ConnectionPartOfDm> connectionPartOf)
    {
        if (connectionPartOf == null || !connectionPartOf.Any())
            return;

        bulk.Setup<ConnectionPartOfDm>()
            .ForCollection(connectionPartOf)
            .WithTable("Connection")
            //Parent
            .AddColumn(x => x.Id)
            .AddColumn(x => x.FromConnector)
            .AddColumn(x => x.ToConnector)
            .AddColumn(x => x.MainProject)
            .AddColumn(x => x.Project)
            //Operations
            .BulkInsertOrUpdate()
            .MatchTargetOn(x => x.Id)
            .Commit(conn);
    }

    public void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<ConnectionFulfilledByDm> connectionFulfilledBy)
    {
        if (connectionFulfilledBy == null || !connectionFulfilledBy.Any())
            return;

        bulk.Setup<ConnectionFulfilledByDm>()
            .ForCollection(connectionFulfilledBy)
            .WithTable("Connection")
            //Parent
            .AddColumn(x => x.Id)
            .AddColumn(x => x.FromConnector)
            .AddColumn(x => x.ToConnector)
            .AddColumn(x => x.MainProject)
            .AddColumn(x => x.Project)
            //Operations
            .BulkInsertOrUpdate()
            .MatchTargetOn(x => x.Id)
            .Commit(conn);
    }

    public void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<ConnectionHasLocationDm> connectionHasLocation)
    {
        if (connectionHasLocation == null || !connectionHasLocation.Any())
            return;

        bulk.Setup<ConnectionHasLocationDm>()
            .ForCollection(connectionHasLocation)
            .WithTable("Connection")
            //Parent
            .AddColumn(x => x.Id)
            .AddColumn(x => x.FromConnector)
            .AddColumn(x => x.ToConnector)
            .AddColumn(x => x.MainProject)
            .AddColumn(x => x.Project)
            //Operations
            .BulkInsertOrUpdate()
            .MatchTargetOn(x => x.Id)
            .Commit(conn);
    }

    public void BulkDelete(BulkOperations bulk, SqlConnection conn, List<ConnectionTerminalDm> connectionTerminal)
    {
        if (connectionTerminal == null || !connectionTerminal.Any())
            return;

        bulk.Setup<ConnectionTerminalDm>()
            .ForCollection(connectionTerminal)
            .WithTable("Connection")
            .AddColumn(x => x.Id)
            .BulkDelete()
            .MatchTargetOn(x => x.Id)
            .Commit(conn);
    }

    public void BulkDelete(BulkOperations bulk, SqlConnection conn, List<ConnectionPartOfDm> connectionPartOf)
    {
        if (connectionPartOf == null || !connectionPartOf.Any())
            return;

        bulk.Setup<ConnectionPartOfDm>()
            .ForCollection(connectionPartOf)
            .WithTable("Connection")
            .AddColumn(x => x.Id)
            .BulkDelete()
            .MatchTargetOn(x => x.Id)
            .Commit(conn);
    }

    public void BulkDelete(BulkOperations bulk, SqlConnection conn, List<ConnectionFulfilledByDm> connectionFulfilledBy)
    {
        if (connectionFulfilledBy == null || !connectionFulfilledBy.Any())
            return;

        bulk.Setup<ConnectionFulfilledByDm>()
            .ForCollection(connectionFulfilledBy)
            .WithTable("Connection")
            .AddColumn(x => x.Id)
            .BulkDelete()
            .MatchTargetOn(x => x.Id)
            .Commit(conn);
    }

    public void BulkDelete(BulkOperations bulk, SqlConnection conn, List<ConnectionHasLocationDm> connectionHasLocation)
    {
        if (connectionHasLocation == null || !connectionHasLocation.Any())
            return;

        bulk.Setup<ConnectionHasLocationDm>()
            .ForCollection(connectionHasLocation)
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
    public async Task<List<ObjectIdentityDm>> GetConnectionConnectedData(string connectionId)
    {
        if (string.IsNullOrWhiteSpace(connectionId))
            return null;

        var procParams = new Dictionary<string, object>
        {
            {"@ConnectionId", connectionId}
        };

        var attributes =
            await _modelBuilderProcRepository.ExecuteStoredProc<ObjectIdentityDm>("ConnectionLockData", procParams);
        return attributes;
    }
}