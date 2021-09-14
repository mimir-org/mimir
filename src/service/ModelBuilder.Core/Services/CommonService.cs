using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Mb.Core.Exceptions;
using Mb.Core.Extensions;
using Mb.Core.Repositories.Contracts;
using Mb.Core.Services.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;

namespace Mb.Core.Services
{
    public class CommonService : ICommonService
    {
        private readonly IContractorRepository _contractorRepository;
        private readonly IBlobDataRepository _blobDataRepository;
        private readonly IMapper _mapper;

        public CommonService(IContractorRepository contractorRepository, IBlobDataRepository blobDataRepository, IMapper mapper)
        {
            _contractorRepository = contractorRepository;
            _blobDataRepository = blobDataRepository;
            _mapper = mapper;
        }

        public IEnumerable<Contractor> GetAllContractors()
        {
            return _contractorRepository.GetAll().OrderBy(x => x.Name).ToList();
        }

        public async Task<BlobDataAm> CreateBlobData(BlobDataAm blobData)
        {
            if (!string.IsNullOrEmpty(blobData.Id))
                return await UpdateBlobData(blobData);

            var dm = _mapper.Map<BlobData>(blobData);
            dm.Id = dm.Key.CreateMd5();
            await _blobDataRepository.CreateAsync(dm);
            await _blobDataRepository.SaveAsync();
            return _mapper.Map<BlobDataAm>(dm);
        }

        public async Task<BlobDataAm> UpdateBlobData(BlobDataAm blobData)
        {
            var dm = await _blobDataRepository.GetAsync(blobData.Id);
            if (dm == null)
                throw new ModelBuilderNotFoundException($"There is no blob data with id: {blobData.Id}");

            _mapper.Map(blobData, dm);
            _blobDataRepository.Update(dm);
            await _blobDataRepository.SaveAsync();
            return _mapper.Map<BlobDataAm>(dm);
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
    }
}
