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
    public class AspectObjectRepository : GenericRepository<ModelBuilderDbContext, AspectObject>, IAspectObjectRepository
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

        public IEnumerable<(AspectObject aspectObject, WorkerStatus status)> UpdateInsert(ICollection<AspectObject> original, Project project,
            string invokedByDomain)
        {
            if (project?.AspectObjects == null || !project.AspectObjects.Any())
                yield break;

            var newAspectObjects = original != null
                ? project.AspectObjects.Where(x => original.All(y => y.Id != x.Id)).ToList()
                : new List<AspectObject>();

            foreach (var aspectObject in project.AspectObjects)
            {
                if (newAspectObjects.Any(x => x.Id == aspectObject.Id))
                {
                    if (aspectObject.Attributes != null)
                    {
                        foreach (var attribute in aspectObject.Attributes)
                        {
                            attribute.UnitString = attribute.Units != null
                                ? JsonConvert.SerializeObject(attribute.Units)
                                : null;
                            _attributeRepository.Attach(attribute, EntityState.Added);
                        }
                    }

                    aspectObject.Version = _commonRepository.GetDomain() != aspectObject.Domain
                        ? string.IsNullOrEmpty(aspectObject.Version) ? "1.0" : aspectObject.Version
                        : "1.0";

                    _connectorRepository.AttachWithAttributes(aspectObject.Connectors, EntityState.Added);

                    yield return (aspectObject, WorkerStatus.Create);
                    Attach(aspectObject, EntityState.Added);
                }
                else
                {
                    // Parties is not allowed changed our aspectObject
                    if (_commonRepository.GetDomain() == aspectObject.Domain &&
                        _commonRepository.GetDomain() != invokedByDomain)
                    {
                        Detach(aspectObject);
                        continue;
                    }

                    if (aspectObject.Attributes != null)
                    {
                        foreach (var attribute in aspectObject.Attributes)
                        {
                            attribute.UnitString = attribute.Units != null
                                ? JsonConvert.SerializeObject(attribute.Units)
                                : null;
                            _attributeRepository.Attach(attribute, EntityState.Modified);
                        }
                    }

                    _connectorRepository.AttachWithAttributes(aspectObject.Connectors, EntityState.Modified);
                    yield return (aspectObject, WorkerStatus.Update);
                    Attach(aspectObject, EntityState.Modified);
                }
            }
        }

        public IEnumerable<(AspectObject aspectObject, WorkerStatus status)> DeleteAspectObjects(ICollection<AspectObject> delete, string projectId,
            string invokedByDomain)
        {
            var returnValues = new List<(AspectObject connection, WorkerStatus status)>();

            if (delete == null || projectId == null || !delete.Any())
                return returnValues;

            foreach (var aspectObject in delete)
            {
                // Parties is not allowed delete our aspectObject
                if (_commonRepository.GetDomain() == aspectObject.Domain && _commonRepository.GetDomain() != invokedByDomain)
                {
                    Detach(aspectObject);
                    continue;
                }

                _attributeRepository.Attach(aspectObject.Attributes, EntityState.Deleted);
                _connectorRepository.AttachWithAttributes(aspectObject.Connectors, EntityState.Deleted);
                Attach(aspectObject, EntityState.Deleted);

                returnValues.Add((aspectObject, WorkerStatus.Delete));
            }

            return returnValues;
        }

        /// <summary>
        /// Bulk aspectObject update
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn"></param>
        /// <param name="aspectObjects">The aspectObjects to be upserted</param>
        public void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<AspectObject> aspectObjects)
        {
            if (aspectObjects == null || !aspectObjects.Any())
                return;

            bulk.Setup<AspectObject>()
                .ForCollection(aspectObjects)
                .WithTable("AspectObject")
                .AddColumn(x => x.Id)
                .AddColumn(x => x.Rds)
                .AddColumn(x => x.Description)
                .AddColumn(x => x.TypeReference)
                .AddColumn(x => x.Name)
                .AddColumn(x => x.Label)
                .AddColumn(x => x.Position)
                .AddColumn(x => x.IsLocked)
                .AddColumn(x => x.IsLockedStatusBy)
                .AddColumn(x => x.IsLockedStatusDate)
                .AddColumn(x => x.Level)
                .AddColumn(x => x.Order)
                .AddColumn(x => x.UpdatedBy)
                .AddColumn(x => x.Updated)
                .AddColumn(x => x.Created)
                .AddColumn(x => x.CreatedBy)
                .AddColumn(x => x.LibraryTypeId)
                .AddColumn(x => x.Version)
                .AddColumn(x => x.Aspect)
                .AddColumn(x => x.AspectObjectType)
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
        /// Bulk delete aspectObjects
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="aspectObjects">The aspectObjects to be deleted</param>
        public void BulkDelete(BulkOperations bulk, SqlConnection conn, List<AspectObject> aspectObjects)
        {
            if (aspectObjects == null || !aspectObjects.Any())
                return;

            bulk.Setup<AspectObject>()
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

            if (lockDms.Any(x => x.Type is not EntityType.AspectObject))
                throw new MimirorgBadRequestException("EntityType is not of type AspectObject");

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
        public async Task<List<ObjectIdentity>> GetAspectObjectConnectedData(string aspectObjectId)
        {
            if (string.IsNullOrWhiteSpace(aspectObjectId))
                return null;

            var procParams = new Dictionary<string, object>
            {
                {"@AspectObjectId", aspectObjectId}
            };

            var attributes = await _modelBuilderProcRepository.ExecuteStoredProc<ObjectIdentity>("AspectObjectLockData", procParams);
            return attributes;
        }

    }
}