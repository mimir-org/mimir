using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Enums;
using Microsoft.EntityFrameworkCore;
using SqlBulkTools;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Mb.Data.Repositories;

public class ConnectionRepository : GenericRepository<ModelBuilderDbContext, Connection>, IConnectionRepository
{
    private readonly IModelBuilderProcRepository _modelBuilderProcRepository;

    public ConnectionRepository(ModelBuilderDbContext dbContext, IModelBuilderProcRepository modelBuilderProcRepository) : base(dbContext)
    {
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
            if (newConnections.Any(x => x.Id == connection.Id))
            {
                Attach(connection, EntityState.Added);
                yield return (connection, WorkerStatus.Create);
            }
            else
            {
                Attach(connection, EntityState.Modified);
                yield return (connection, WorkerStatus.Update);
            }
        }
    }

    public Task<IEnumerable<(Connection connection, WorkerStatus status)>> DeleteConnections(ICollection<Connection> delete,
        string projectId, string invokedByDomain)
    {
        var returnValues = new List<(Connection connection, WorkerStatus status)>();

        if (delete == null || projectId == null || !delete.Any())
            return Task.FromResult<IEnumerable<(Connection connection, WorkerStatus status)>>(returnValues);

        foreach (var connection in delete)
        {
            Attach(connection, EntityState.Deleted);

            returnValues.Add((connection, WorkerStatus.Delete));
        }

        return Task.FromResult<IEnumerable<(Connection connection, WorkerStatus status)>>(returnValues);
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
            .AddColumn(x => x.Handles)
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
            .AddColumn(x => x.Handles)
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
            .AddColumn(x => x.Handles)
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
            .AddColumn(x => x.Handles)
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
}