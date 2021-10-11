using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Mb.Core.Repositories.Contracts;
using Mb.Core.Services.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Models.Exceptions;
using Mb.Models.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Mb.Core.Services
{
    public class CommonService : ICommonService
    {
        private readonly IContractorRepository _contractorRepository;
        private readonly IBlobDataRepository _blobDataRepository;
        private readonly IMapper _mapper;
        private readonly IAttributeRepository _attributeRepository;

        public CommonService(IContractorRepository contractorRepository, IBlobDataRepository blobDataRepository, IMapper mapper, IAttributeRepository attributeRepository)
        {
            _contractorRepository = contractorRepository;
            _blobDataRepository = blobDataRepository;
            _mapper = mapper;
            _attributeRepository = attributeRepository;
        }

        public IEnumerable<Contractor> GetAllContractors()
        {
            return _contractorRepository.GetAll().OrderBy(x => x.Name).ToList();
        }

        /// <summary>
        /// Create blob data
        /// </summary>
        /// <param name="blobData"></param>
        /// <param name="saveData"></param>
        /// <returns></returns>
        public async Task<BlobData> CreateBlobData(BlobDataAm blobData, bool saveData = true)
        {
            if (!string.IsNullOrEmpty(blobData.Id))
                return await UpdateBlobData(blobData);

            var dm = _mapper.Map<BlobData>(blobData);
            dm.Id = dm.Key.CreateMd5();

            var blobExist = await _blobDataRepository.GetAsync(dm.Id);

            if (blobExist != null)
            {
                blobData.Id = dm.Id;
                _mapper.Map(blobData, blobExist);
                _blobDataRepository.Attach(blobExist, EntityState.Modified);
                
                if(saveData)
                    await _blobDataRepository.SaveAsync();

                return blobExist;
            }

            await _blobDataRepository.CreateAsync(dm);

            if(saveData)
                await _blobDataRepository.SaveAsync();

            return dm;
        }

        /// <summary>
        /// Create blob data from list
        /// </summary>
        /// <param name="blobDataList"></param>
        /// <returns></returns>
        public async Task<IEnumerable<BlobData>> CreateBlobData(IEnumerable<BlobDataAm> blobDataList)
        {
            var blobs = new List<BlobData>();

            foreach (var blobData in blobDataList)
            {
                blobs.Add(await CreateBlobData(blobData, false));
            }

            await _blobDataRepository.SaveAsync();
            return blobs;
        }

        public async Task<BlobData> UpdateBlobData(BlobDataAm blobData)
        {
            var dm = await _blobDataRepository.GetAsync(blobData.Id);
            if (dm == null)
                throw new ModelBuilderNotFoundException($"There is no blob data with id: {blobData.Id}");

            _blobDataRepository.Update(dm);
            await _blobDataRepository.SaveAsync();
            return dm;
        }

        public IEnumerable<BlobDataAm> GetBlobData()
        {
            var dms = _blobDataRepository.GetAll()
                .OrderBy(x => x.Name)
                .ProjectTo<BlobDataAm>(_mapper.ConfigurationProvider)
                .ToList();

            dms.Insert(0, new BlobDataAm
            {
                Discipline = Discipline.None,
                Data = null,
                Id = null,
                Name = "No symbol"
            });

            return dms;
        }

        /// <summary>
        /// Get all combined attributes
        /// </summary>
        /// <returns></returns>
        public IEnumerable<CombinedAttributeFilter> GetAllCombinedAttributeFilters()
        {
            var allFilteredAttributes = _attributeRepository.GetAll()
                .Include(x => x.Qualifier)
                .Include(x => x.Source)
                .Include(x => x.Condition)
                .Select(x => new {x.Key, x.Qualifier, x.Source, x.Condition}).Distinct()
                .ToList();

            var groups = allFilteredAttributes.GroupBy(x => x.Key).Select(x => x.ToList());
            foreach (var group in groups)
            {
                if(!group.Any())
                    continue;

                var combinedAttributes = group.Select(x => new CombinedAttribute
                {
                    Condition = x.Condition.Name,
                    ConditionId = x.Condition.Id,
                    Qualifier = x.Qualifier.Name,
                    QualifierId = x.Qualifier.Id,
                    Source = x.Source.Name,
                    SourceId = x.Source.Id
                }).ToList();

                yield return new CombinedAttributeFilter
                {
                    Name = group[0].Key,
                    CombinedAttributes = combinedAttributes
                };
            }
        }
    }
}
