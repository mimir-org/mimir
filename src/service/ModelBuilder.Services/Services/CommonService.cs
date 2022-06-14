using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Services.Contracts;
using Mb.Models.Client;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Services.Services
{
    public class CommonService : ICommonService
    {
        private readonly ICompanyRepository _companyRepository;
        private readonly IAttributeRepository _attributeRepository;
        private readonly ILibraryRepository _libraryRepository;
        private readonly IMapper _mapper;

        public CommonService(ICompanyRepository companyRepository, IAttributeRepository attributeRepository, IMapper mapper, ILibraryRepository libraryRepository)
        {
            _companyRepository = companyRepository;
            _attributeRepository = attributeRepository;
            _mapper = mapper;
            _libraryRepository = libraryRepository;
        }

        /// <summary>
        /// Get all combined attributes
        /// </summary>
        /// <returns></returns>
        public IEnumerable<CombinedAttributeFilter> GetAllCombinedAttributeFilters()
        {
            var allFilteredAttributes = _attributeRepository.GetAll()
                 .Select(x => new
                 {
                     x.Entity,
                     x.Qualifier,
                     x.Source,
                     x.Condition
                 }).Distinct()
                 .ToList();

            var attributeTypes = _libraryRepository.GetAttributes().Result;
            var allFilteredAttributeTypes = attributeTypes
                .Select(x => new
                {
                    Entity = x.Name,
                    Qualifier = x.AttributeQualifier,
                    Source = x.AttributeSource,
                    Condition = x.AttributeCondition
                })
                .Distinct()
                .ToList();

            var all = allFilteredAttributes.Union(allFilteredAttributeTypes).Distinct();
            var groups = all.GroupBy(x => x.Entity).Select(x => x.ToList()).ToList();

            foreach (var group in groups)
            {
                if (!group.Any())
                    continue;

                var combinedAttributes = group.Select(x => new CombinedAttribute
                {
                    Condition = x.Condition,
                    Qualifier = x.Qualifier,
                    Source = x.Source
                }).ToList();

                yield return new CombinedAttributeFilter
                {
                    Name = group[0].Entity,
                    CombinedAttributes = combinedAttributes
                };
            }
        }

        /// <summary>
        /// Get all collaboration partners
        /// </summary>
        /// <returns></returns>
        public async Task<ICollection<MimirorgCompanyCm>> GetAllCompanies()
        {
            var companies = await _companyRepository.GetCompanies();
            return companies.OrderBy(x => x.Name).ToList();
        }

        /// <summary>
        /// Get collaboration partner by domain
        /// </summary>
        /// <param name="domain"></param>
        /// <returns></returns>
        public async Task<MimirorgCompanyCm> GetCompanyByDomain(string domain)
        {
            if (string.IsNullOrEmpty(domain))
                return null;

            var companies = await _companyRepository.GetCompanies();
            return companies.FirstOrDefault(x => x.Domain != null && string.Equals(x.Domain, domain, StringComparison.CurrentCultureIgnoreCase));
        }
    }
}