using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Common;
using Mb.Models.Configurations;
using Mb.Models.Enums;
using Mb.Models.Extensions;
using Mb.Services.Contracts;
using Microsoft.Extensions.Options;
using Mimirorg.Common.Exceptions;
using SqlBulkTools;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

namespace Mb.Services.Services;

public class LockService : ILockService
{
    private readonly IBlockRepository _blockRepository;
    private readonly ICooperateService _cooperateService;
    private readonly ICacheRepository _cacheRepository;
    private readonly IMapper _mapper;
    private readonly DatabaseConfiguration _databaseConfiguration;

    public LockService(IBlockRepository blockRepository, ICooperateService cooperateService, IOptions<DatabaseConfiguration> databaseConfiguration, IMapper mapper, ICacheRepository cacheRepository)
    {
        _blockRepository = blockRepository;
        _cooperateService = cooperateService;
        _cacheRepository = cacheRepository;
        _mapper = mapper;
        _databaseConfiguration = databaseConfiguration?.Value;
    }

    /// <summary>
    /// Returns a list of all locked blocks id's
    /// </summary>
    /// <returns>List of locked block id></returns>
    public IEnumerable<Guid> GetLockedBlocks()
    {
        return _blockRepository.FindBy(x => x.IsLocked).Select(x => x.Id);
    }

    /// <summary>
    /// Lock/Unlock Attribute/Connection/Block
    /// </summary>
    /// <param name="lockAm"></param>
    /// <returns></returns>
    public async Task Lock(LockRequest lockAm)
    {
        if (lockAm?.Id == Guid.Empty)
            throw new MimirorgBadRequestException("LockAm Id can't be null.");

        var lockDm = _mapper.Map<LockDm>(lockAm);
        var lockDms = new List<LockDm> { lockDm };

        if (!lockDms.Any())
            return;

        //Save to database
        using (var trans = new TransactionScope(TransactionScopeOption.Required, new TimeSpan(0, 0, 10, 0)))
        {
            await using (var conn = new SqlConnection(_databaseConfiguration.ConnectionString))
            {
                _blockRepository.BulkUpdateLockStatus(new BulkOperations(), conn, lockDms.ToList());
            }
            trans.Complete();
        }

        //Refresh cache
        var key = lockAm.ProjectId;
        await _cacheRepository.DeleteCacheAsync(key.ToString());
        _cacheRepository.RefreshList.Enqueue((lockAm.ProjectId.ToString(), null));

        //Send websocket updates to clients
        var lockCms = _mapper.Map<List<LockResponse>>(lockDms);
        await _cooperateService.SendLockUpdates(lockCms, WorkerStatus.Update, lockCms[0].ProjectId);
    }
}