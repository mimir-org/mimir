using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Application.Mimir;
using Mb.Models.Data;
using Mb.Services.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Mb.Services.Services
{
    public class CommonService : ICommonService
    {
        private readonly IContractorRepository _contractorRepository;
        private readonly IAttributeRepository _attributeRepository;

        public CommonService(IContractorRepository contractorRepository, IAttributeRepository attributeRepository)
        {
            _contractorRepository = contractorRepository;
            _attributeRepository = attributeRepository;
        }

        public IEnumerable<Contractor> GetAllContractors()
        {
            return _contractorRepository.GetAll().OrderBy(x => x.Name).ToList();
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

        /// <summary>
        /// Create contractors
        /// </summary>
        /// <param name="contractors"></param>
        /// <returns></returns>
        public async Task CreateContractorsAsync(IEnumerable<Contractor> contractors)
        {
            var existingTypes = _contractorRepository.GetAll().ToList();
            var notExistingTypes = contractors.Where(x => existingTypes.All(y => y.Id != x.Id)).ToList();
            if (!notExistingTypes.Any())
                return;

            foreach (var item in notExistingTypes)
            {
                await _contractorRepository.CreateAsync(item);
            }

            await _contractorRepository.SaveAsync();
        }
    }
}
