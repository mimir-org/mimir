using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mimirorg.Common.Exceptions;
using Mb.Models.Extensions;
using Mb.Services.Contracts;
using Microsoft.Extensions.Options;
using SqlBulkTools;
using Mb.Models.Common;
using Mb.Models.Application;
using Mb.Models.Client;

namespace Mb.Services.Services
{
    public class LockService : ILockService
    {
        private readonly IAttributeRepository _attributeRepository;
        private readonly IAspectObjectRepository _aspectObjectRepository;
        private readonly IConnectionRepository _connectionRepository;
        private readonly ICooperateService _cooperateService;
        private readonly ICacheRepository _cacheRepository;
        private readonly IMapper _mapper;
        private readonly DatabaseConfiguration _databaseConfiguration;

        public LockService(IAspectObjectRepository aspectObjectRepository, IConnectionRepository connectionRepository, IAttributeRepository attributeRepository, ICooperateService cooperateService, IOptions<DatabaseConfiguration> databaseConfiguration, IMapper mapper, ICacheRepository cacheRepository)
        {
            _aspectObjectRepository = aspectObjectRepository;
            _connectionRepository = connectionRepository;
            _attributeRepository = attributeRepository;
            _cooperateService = cooperateService;
            _cacheRepository = cacheRepository;
            _mapper = mapper;
            _databaseConfiguration = databaseConfiguration?.Value;
        }

        /// <summary>
        /// Returns a list of all locked attributes id's
        /// </summary>
        /// <returns>List of locked attribute id></returns>
        public IEnumerable<string> GetLockedAttributes()
        {
            return _attributeRepository.FindBy(x => x.IsLocked).Select(x => x.Id);
        }

        /// <summary>
        /// Returns a list of all locked aspectObjects id's
        /// </summary>
        /// <returns>List of locked aspectObject id></returns>
        public IEnumerable<string> GetLockedAspectObjects()
        {
            return _aspectObjectRepository.FindBy(x => x.IsLocked).Select(x => x.Id);
        }

        /// <summary>
        /// Lock/Unlock Attribute/Connection/AspectObject
        /// </summary>
        /// <param name="lockAm"></param>
        /// <returns></returns>
        public async Task Lock(LockAm lockAm)
        {
            if (string.IsNullOrWhiteSpace(lockAm?.Id))
                throw new MimirorgBadRequestException("LockAm Id can't be null.");

            var lockDms = new List<LockDm>();
            var objectIdentity = new List<ObjectIdentityDm>();

            switch (lockAm.Type)
            {
                case EntityType.Attribute:
                    lockDms.AddRange(_mapper.Map<List<LockDm>>(new List<LockAm> { lockAm }));
                    break;
                case EntityType.Connection:
                    objectIdentity = await _connectionRepository.GetConnectionConnectedData(lockAm.Id);
                    break;
                case EntityType.AspectObject:
                    objectIdentity = await _aspectObjectRepository.GetAspectObjectConnectedData(lockAm.Id);
                    break;
                default:
                    throw new MimirorgBadRequestException("EntityType not found.");
            }

            var lockAms = objectIdentity.Select(item => new LockAm { Id = item.Id, ProjectId = lockAm.ProjectId, IsLocked = lockAm.IsLocked, Type = item.Type }).ToList();
            lockDms.AddRange(_mapper.Map<List<LockDm>>(lockAms));

            if (!lockDms.Any())
                return;

            //Save to database
            using (var trans = new TransactionScope(TransactionScopeOption.Required, new TimeSpan(0, 0, 10, 0)))
            {
                await using (var conn = new SqlConnection(_databaseConfiguration.ConnectionString))
                {
                    _connectionRepository.BulkUpdateLockStatus(new BulkOperations(), conn, lockDms.Where(x => x.Type is EntityType.Connection).ToList());
                    _attributeRepository.BulkUpdateLockStatus(new BulkOperations(), conn, lockDms.Where(x => x.Type is EntityType.Attribute).ToList());
                    _aspectObjectRepository.BulkUpdateLockStatus(new BulkOperations(), conn, lockDms.Where(x => x.Type is EntityType.AspectObject).ToList());
                }
                trans.Complete();
            }

            //Refresh cache
            var key = lockAm.ProjectId.ResolveKey();
            await _cacheRepository.DeleteCacheAsync(key);
            _cacheRepository.RefreshList.Enqueue((lockAm.ProjectId, null));

            //Send websocket updates to clients
            var lockCms = _mapper.Map<List<LockCm>>(lockDms);
            await _cooperateService.SendLockUpdates(lockCms, WorkerStatus.Update, lockCms[0]?.ProjectId);
        }
    }
}