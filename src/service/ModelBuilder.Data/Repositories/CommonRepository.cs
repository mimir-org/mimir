using System;
using System.Linq;
using Mb.Data.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Exceptions;
using Mb.Models.Extensions;
using Microsoft.Extensions.Options;

namespace Mb.Data.Repositories
{
    public class CommonRepository : ICommonRepository
    {
        private readonly ModelBuilderConfiguration _modelBuilderConfiguration;
        private readonly ICollaborationPartnerRepository _collaborationPartnerRepository;
        
        public CommonRepository(IOptions<ModelBuilderConfiguration> modelBuilderConfiguration, ICollaborationPartnerRepository collaborationPartnerRepository)
        {
            _modelBuilderConfiguration = modelBuilderConfiguration?.Value;
            _collaborationPartnerRepository = collaborationPartnerRepository;
        }

        public string CreateUniqueId()
        {
            return $"{_modelBuilderConfiguration.Domain}_{Guid.NewGuid().ToString().ToLower()}";
        }

        public string GetDomain()
        {
            return _modelBuilderConfiguration.Domain;
        }

        public bool HasValidId(string id)
        {
            if (string.IsNullOrEmpty(id))
                return false;

            var isValid = Guid.TryParse(id, out _);
            if (isValid)
                return false;

            var checkId = id.Split('_', StringSplitOptions.RemoveEmptyEntries);

            return checkId.Length == 2 && Guid.TryParse(checkId[1], out _);
        }

        public string CreateOrUseId(string id)
        {
            return HasValidId(id) ? id : CreateUniqueId();
        }

        public string ResolveId(string id, string iri)
        {
            if (string.IsNullOrEmpty(id) && string.IsNullOrEmpty(iri)) 
                return null;
            
            if (HasValidId(id)) 
                return id;

            var iriParsed = new Uri(iri);
            var iriHost = iriParsed.Host;
            var collaborationPartners = _collaborationPartnerRepository.GetAll().ToList();
            var collaborationPartner = collaborationPartners.FirstOrDefault(c => c.Iris.Any(i => i.Equals(iriHost)));

            if (collaborationPartner == null)
            {
                throw new ModelBuilderInvalidOperationException($"Parent domain could not be found for the host: {iriHost}");
            }

            var idPart = string.IsNullOrEmpty(iriParsed.Fragment) ? 
                iriParsed.Segments.Last() : 
                iriParsed.Fragment[1..];

            return $"{collaborationPartner.Domain}_{idPart}";
        }
        
        public string ResolveIri(string id, string iri)
        {
            if (!string.IsNullOrEmpty(iri)) 
                return iri;
            
            return HasValidId(id) ? id.ResolveIri() : null;
        }

        public string ResolveAttributeIri(string id, string iri)
        {
            if (!string.IsNullOrEmpty(iri))
                return iri;

            return HasValidId(id) ? id.ResolveIri() : null;
        }
    }
}
