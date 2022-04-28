using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Exceptions;
using Mb.Services.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Mb.Services.Services
{
    public class CommonService : ICommonService
    {
        private readonly ICollaborationPartnerRepository _collaborationPartnerRepository;
        private readonly IAttributeRepository _attributeRepository;
        private readonly ILibraryRepository _libraryRepository;
        private readonly IMapper _mapper;

        public CommonService(ICollaborationPartnerRepository collaborationPartnerRepository, IAttributeRepository attributeRepository, IMapper mapper, ILibraryRepository libraryRepository)
        {
            _collaborationPartnerRepository = collaborationPartnerRepository;
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
            throw new NotImplementedException();
            //var allFilteredAttributes = _attributeRepository.GetAll()
            //     .Select(x => new
            //     {
            //         x.Entity,
            //         x.Qualifier,
            //         x.Source,
            //         x.Condition
            //     }).Distinct()
            //     .ToList();

            //var allFilteredAttributeTypes = _libraryRepository.GetAll()
            //    .Select(x => new
            //    {
            //        x.Entity,
            //        Qualifier = x.Qualifier.Name,
            //        Source = x.Source.Name,
            //        Condition = x.Condition.Name
            //    }).Distinct()
            //    .ToList();

            //var all = allFilteredAttributes.Union(allFilteredAttributeTypes).Distinct();
            //var groups = all.GroupBy(x => x.Entity).Select(x => x.ToList()).ToList();

            //foreach (var group in groups)
            //{
            //    if (!group.Any())
            //        continue;

            //    var combinedAttributes = group.Select(x => new CombinedAttribute
            //    {
            //        Condition = x.Condition,
            //        Qualifier = x.Qualifier,
            //        Source = x.Source
            //    }).ToList();

            //    yield return new CombinedAttributeFilter
            //    {
            //        Name = group[0].Entity,
            //        CombinedAttributes = combinedAttributes
            //    };
            //}
        }

        /// <summary>
        /// Get all collaboration partners
        /// </summary>
        /// <returns></returns>
        public IEnumerable<CollaborationPartner> GetAllCollaborationPartners()
        {
            return _collaborationPartnerRepository.GetAll().OrderBy(x => x.Name).ToList();
        }

        /// <summary>
        /// Get collaboration partner by domain
        /// </summary>
        /// <param name="domain"></param>
        /// <returns></returns>
        /// <exception cref="System.NotImplementedException"></exception>
        public async Task<CollaborationPartner> GetCollaborationPartnerByDomain(string domain)
        {
            if (string.IsNullOrEmpty(domain))
                return null;

            var cp = await _collaborationPartnerRepository.FindBy(x => x.Domain != null && x.Domain.ToLower() == domain.ToLower()).FirstOrDefaultAsync();
            return cp;
        }

        /// <summary>
        /// Create collaboration partners
        /// </summary>
        /// <param name="collaborationPartners"></param>
        /// <returns></returns>
        public async Task CreateCollaborationPartnersAsync(IEnumerable<CollaborationPartnerAm> collaborationPartners)
        {
            var existingTypes = _collaborationPartnerRepository.GetAll().ToList();
            var notExistingTypes = collaborationPartners.Where(x => existingTypes.All(y => y.Name != x.Name && y.Domain != x.Domain)).ToList();

            if (!notExistingTypes.Any())
                throw new ModelBuilderDuplicateException("There is already registered a collaboration partners with names or domains");

            foreach (var item in notExistingTypes)
            {
                var cp = _mapper.Map<CollaborationPartner>(item);
                await _collaborationPartnerRepository.CreateAsync(cp);
            }

            await _collaborationPartnerRepository.SaveAsync();
        }

        /// <summary>
        /// Create a collaboration partner
        /// </summary>
        /// <param name="collaborationPartner"></param>
        /// <returns></returns>
        /// <exception cref="ModelBuilderDuplicateException"></exception>
        public async Task<CollaborationPartner> CreateCollaborationPartnerAsync(CollaborationPartnerAm collaborationPartner)
        {
            var existingType = await _collaborationPartnerRepository.FindBy(x => x.Name == collaborationPartner.Name || x.Domain == collaborationPartner.Domain).FirstOrDefaultAsync();
            if (existingType != null)
                throw new ModelBuilderDuplicateException("There is already registered a collaboration partner with name or domain");

            var cp = _mapper.Map<CollaborationPartner>(collaborationPartner);
            await _collaborationPartnerRepository.CreateAsync(cp);
            await _collaborationPartnerRepository.SaveAsync();
            return cp;
        }

        /// <summary>
        /// Update a collaboration partner
        /// </summary>
        /// <param name="id"></param>
        /// <param name="collaborationPartner"></param>
        /// <returns></returns>
        /// <exception cref="System.NotImplementedException"></exception>
        public Task<CollaborationPartner> UpdateCollaborationPartnerAsync(int id, CollaborationPartnerAm collaborationPartner)
        {
            throw new System.NotImplementedException();
        }
    }
}