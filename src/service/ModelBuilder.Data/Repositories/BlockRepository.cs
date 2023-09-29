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

public class BlockRepository : GenericRepository<ModelBuilderDbContext, BlockDm>, IBlockRepository
{
    private readonly IConnectorRepository _connectorRepository;
    private readonly IAttributeRepository _attributeRepository;
    private readonly ICommonRepository _commonRepository;
    private readonly IModelBuilderProcRepository _modelBuilderProcRepository;

    public BlockRepository(ModelBuilderDbContext dbContext, IConnectorRepository connectorRepository, IAttributeRepository attributeRepository, ICommonRepository commonRepository, IModelBuilderProcRepository modelBuilderProcRepository) : base(dbContext)
    {
        _connectorRepository = connectorRepository;
        _attributeRepository = attributeRepository;
        _commonRepository = commonRepository;
        _modelBuilderProcRepository = modelBuilderProcRepository;
    }

    public IEnumerable<(BlockDm block, WorkerStatus status)> UpdateInsert(ICollection<BlockDm> original, ProjectDm project,
        string invokedByDomain)
    {
        if (project?.Blocks == null || !project.Blocks.Any())
            yield break;

        var newBlocks = original != null
            ? project.Blocks.Where(x => original.All(y => y.Id != x.Id)).ToList()
            : new List<BlockDm>();

        foreach (var block in project.Blocks)
        {
            if (newBlocks.Any(x => x.Id == block.Id))
            {
                if (block.Attributes != null)
                {
                    foreach (var attribute in block.Attributes)
                    {
                        attribute.Units = attribute.Units;
                        _attributeRepository.Attach(attribute, EntityState.Added);
                    }
                }

                _connectorRepository.AttachWithAttributes(block.Connectors, EntityState.Added);

                yield return (block, WorkerStatus.Create);
                Attach(block, EntityState.Added);
            }
            else
            {
                if (block.Attributes != null)
                {
                    foreach (var attribute in block.Attributes)
                    {
                        _attributeRepository.Attach(attribute, EntityState.Modified);
                    }
                }

                _connectorRepository.AttachWithAttributes(block.Connectors, EntityState.Modified);
                yield return (block, WorkerStatus.Update);
                Attach(block, EntityState.Modified);
            }
        }
    }

    public IEnumerable<(BlockDm block, WorkerStatus status)> DeleteBlocks(ICollection<BlockDm> delete, string projectId,
        string invokedByDomain)
    {
        var returnValues = new List<(BlockDm connection, WorkerStatus status)>();

        if (delete == null || projectId == null || !delete.Any())
            return returnValues;

        foreach (var block in delete)
        {
            _attributeRepository.Attach(block.Attributes, EntityState.Deleted);
            _connectorRepository.AttachWithAttributes(block.Connectors, EntityState.Deleted);
            Attach(block, EntityState.Deleted);

            returnValues.Add((block, WorkerStatus.Delete));
        }

        return returnValues;
    }

    /// <summary>
    /// Get complete block
    /// </summary>
    /// <param name="id">Block id</param>
    /// <returns>Complete block</returns>
    public Task<BlockDm> GetAsyncComplete(string id)
    {
        if (string.IsNullOrWhiteSpace(id))
            throw new MimirorgNullReferenceException("The Id can't be null.");

        var block = FindBy(x => x.Id == id).FirstOrDefault();

        if (block == null)
            throw new MimirorgNotFoundException($"The block with id {id} can't be found.");

        block.Connectors.AddRange(_connectorRepository.GetAll().Where(x => x.Block == id).ToList());
        block.Attributes.AddRange(_attributeRepository.GetAll().Where(x => x.Block == block.Id).ToList());

        return Task.FromResult(block);
    }

    /// <summary>
    /// Bulk block update
    /// </summary>
    /// <param name="bulk">Bulk operations</param>
    /// <param name="conn"></param>
    /// <param name="blocks">The blocks to be upserted</param>
    public void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<BlockDm> blocks)
    {
        if (blocks == null || !blocks.Any())
            return;

        bulk.Setup<BlockDm>()
            .ForCollection(blocks)
            .WithTable("Block")
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
            .AddColumn(x => x.BLockType)
            .AddColumn(x => x.MainProject)
            .AddColumn(x => x.Symbol)
            .AddColumn(x => x.Purpose)
            .AddColumn(x => x.Project)
            .BulkInsertOrUpdate()
            .MatchTargetOn(x => x.Id)
            .Commit(conn);
    }

    /// <summary>
    /// Bulk delete blocks
    /// </summary>
    /// <param name="bulk">Bulk operations</param>
    /// <param name="conn">Sql Connection</param>
    /// <param name="blocks">The blocks to be deleted</param>
    public void BulkDelete(BulkOperations bulk, SqlConnection conn, List<BlockDm> blocks)
    {
        if (blocks == null || !blocks.Any())
            return;

        bulk.Setup<BlockDm>()
            .ForCollection(blocks)
            .WithTable("Block")
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
            .WithTable("Block")
            .AddColumn(x => x.Id)
            .AddColumn(x => x.IsLocked)
            .AddColumn(x => x.IsLockedStatusBy)
            .AddColumn(x => x.IsLockedStatusDate)
            .BulkUpdate()
            .MatchTargetOn(x => x.Id)
            .Commit(conn);
    }
}