using System.Collections.Generic;
using System.Linq;
using Mb.Core.Repositories.Contracts;
using Mb.Core.Services.Contracts;
using Mb.Models.Data;

namespace Mb.Core.Services
{
    public class CommonService : ICommonService
    {
        private readonly IContractorRepository _contractorRepository;

        public CommonService(IContractorRepository contractorRepository)
        {
            _contractorRepository = contractorRepository;
        }

        public IEnumerable<Contractor> GetAllContractors()
        {
            return _contractorRepository.GetAll().OrderBy(x => x.Name).ToList();
        }
    }
}
