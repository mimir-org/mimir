using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Common;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Mimirorg.Common.Exceptions;
using SqlBulkTools;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Mb.Data.Repositories;

public class AspectObjectRepository : GenericRepository<ModelBuilderDbContext, AspectObjectDm>, IAspectObjectRepository
{
    private readonly IConnectorRepository _connectorRepository;
    private readonly IAttributeRepository _attributeRepository;
    private readonly ICommonRepository _commonRepository;
    private readonly IModelBuilderProcRepository _modelBuilderProcRepository;

    public AspectObjectRepository(ModelBuilderDbContext dbContext, IConnectorRepository connectorRepository, IAttributeRepository attributeRepository, ICommonRepository commonRepository, IModelBuilderProcRepository modelBuilderProcRepository) : base(dbContext)
    {
        _connectorRepository = connectorRepository;
        _attributeRepository = attributeRepository;
        _commonRepository = commonRepository;
        _modelBuilderProcRepository = modelBuilderProcRepository;
    }

    public IEnumerable<(AspectObjectDm aspectObject, WorkerStatus status)> UpdateInsert(ICollection<AspectObjectDm> original, ProjectDm project,
        string invokedByDomain)
    {
        if (project?.AspectObjects == null || !project.AspectObjects.Any())
            yield break;

        var newAspectObjects = original != null
            ? project.AspectObjects.Where(x => original.All(y => y.Id != x.Id)).ToList()
            : new List<AspectObjectDm>();

        foreach (var aspectObject in project.AspectObjects)
        {
            if (newAspectObjects.Any(x => x.Id == aspectObject.Id))
            {
                if (aspectObject.Attributes != null)
                {
                    foreach (var attribute in aspectObject.Attributes)
                    {
                        attribute.Units = attribute.Units;
                        _attributeRepository.Attach(attribute, EntityState.Added);
                    }
                }

                _connectorRepository.AttachWithAttributes(aspectObject.Connectors, EntityState.Added);

                yield return (aspectObject, WorkerStatus.Create);
                Attach(aspectObject, EntityState.Added);
            }
            else
            {
                if (aspectObject.Attributes != null)
                {
                    foreach (var attribute in aspectObject.Attributes)
                    {
                        _attributeRepository.Attach(attribute, EntityState.Modified);
                    }
                }

                _connectorRepository.AttachWithAttributes(aspectObject.Connectors, EntityState.Modified);
                yield return (aspectObject, WorkerStatus.Update);
                Attach(aspectObject, EntityState.Modified);
            }
        }
    }

    public IEnumerable<(AspectObjectDm aspectObject, WorkerStatus status)> DeleteAspectObjects(ICollection<AspectObjectDm> delete, string projectId,
        string invokedByDomain)
    {
        var returnValues = new List<(AspectObjectDm connection, WorkerStatus status)>();

        if (delete == null || projectId == null || !delete.Any())
            return returnValues;

        foreach (var aspectObject in delete)
        {
            _attributeRepository.Attach(aspectObject.Attributes, EntityState.Deleted);
            _connectorRepository.AttachWithAttributes(aspectObject.Connectors, EntityState.Deleted);
            Attach(aspectObject, EntityState.Deleted);

            returnValues.Add((aspectObject, WorkerStatus.Delete));
        }

        return returnValues;
    }

    /// <summary>
    /// Get complete aspect object
    /// </summary>
    /// <param name="id">Aspect object id</param>
    /// <returns>Complete aspect object</returns>
    public Task<AspectObjectDm> GetAsyncComplete(string id)
    {
        if (string.IsNullOrWhiteSpace(id))
            throw new MimirorgNullReferenceException("The Id can't be null.");

        var aspectObject = FindBy(x => x.Id == id).FirstOrDefault();

        if (aspectObject == null)
            throw new MimirorgNotFoundException($"The aspect object with id {id} can't be found.");

        aspectObject.Connectors.AddRange(_connectorRepository.GetAll().Where(x => x.AspectObject == id).ToList());
        aspectObject.Attributes.AddRange(_attributeRepository.GetAll().Where(x => x.AspectObject == aspectObject.Id).ToList());

        return Task.FromResult(aspectObject);
    }

    /// <summary>
    /// Bulk aspectObject update
    /// </summary>
    /// <param name="bulk">Bulk operations</param>
    /// <param name="conn"></param>
    /// <param name="aspectObjects">The aspectObjects to be upserted</param>
    public void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<AspectObjectDm> aspectObjects)
    {
        if (aspectObjects == null || !aspectObjects.Any())
            return;

        bulk.Setup<AspectObjectDm>()
            .ForCollection(aspectObjects)
            .WithTable("AspectObject")
            .AddColumn(x => x.Id)
            .AddColumn(x => x.Rds)
            .AddColumn(x => x.Description)
            .AddColumn(x => x.ReferenceType)
            .AddColumn(x => x.Name)
            .AddColumn(x => x.Label)
            .AddColumn(x => x.PositionTree)
            .AddColumn(x => x.PositionBlock)
            .AddColumn(x => x.IsLocked)
            .AddColumn(x => x.IsLockedStatusBy)
            .AddColumn(x => x.IsLockedStatusDate)
            .AddColumn(x => x.UpdatedBy)
            .AddColumn(x => x.Updated)
            .AddColumn(x => x.Created)
            .AddColumn(x => x.CreatedBy)
            .AddColumn(x => x.LibraryType)
            .AddColumn(x => x.Version)
            .AddColumn(x => x.Aspect)
            .AddColumn(x => x.AspectObjectType)
            .AddColumn(x => x.MainProject)
            .AddColumn(x => x.Symbol)
            .AddColumn(x => x.Purpose)
            .AddColumn(x => x.Project)
            .BulkInsertOrUpdate()
            .MatchTargetOn(x => x.Id)
            .Commit(conn);
    }

    /// <summary>
    /// Bulk delete aspectObjects
    /// </summary>
    /// <param name="bulk">Bulk operations</param>
    /// <param name="conn">Sql Connection</param>
    /// <param name="aspectObjects">The aspectObjects to be deleted</param>
    public void BulkDelete(BulkOperations bulk, SqlConnection conn, List<AspectObjectDm> aspectObjects)
    {
        if (aspectObjects == null || !aspectObjects.Any())
            return;

        bulk.Setup<AspectObjectDm>()
            .ForCollection(aspectObjects)
            .WithTable("AspectObject")
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

        bulk.Setup<LockDm>()
            .ForCollection(lockDms)
            .WithTable("AspectObject")
            .AddColumn(x => x.Id)
            .AddColumn(x => x.IsLocked)
            .AddColumn(x => x.IsLockedStatusBy)
            .AddColumn(x => x.IsLockedStatusDate)
            .BulkUpdate()
            .MatchTargetOn(x => x.Id)
            .Commit(conn);
    }


    /// <summary>
    /// Get aspectObject connected data
    /// </summary>
    /// <param name="aspectObjectId">The aspectObject you want data from</param>
    /// <returns>A collection connected identity data</returns>
    /// <remarks>Get det aspectObject identifier and all connected children including
    /// children aspectObjects, children connections and children terminals</remarks>
    public async Task<List<ObjectIdentityDm>> GetAspectObjectConnectedData(string aspectObjectId)
    {
        if (string.IsNullOrWhiteSpace(aspectObjectId))
            return null;

        var procParams = new Dictionary<string, object>
        {
            {"@AspectObjectId", aspectObjectId}
        };

        var attributes = await _modelBuilderProcRepository.ExecuteStoredProc<ObjectIdentityDm>("AspectObjectLockData", procParams);
        return attributes;
    }

}