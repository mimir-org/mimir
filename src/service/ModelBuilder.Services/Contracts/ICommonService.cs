using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Data;

namespace Mb.Services.Contracts
{
    public interface ICommonService
    {
        IEnumerable<CombinedAttributeFilter> GetAllCombinedAttributeFilters();
        IEnumerable<CollaborationPartner> GetAllCollaborationPartners();
        Task<CollaborationPartner> GetCollaborationPartnerByDomain(string domain);
        Task CreateCollaborationPartnersAsync(IEnumerable<CollaborationPartnerAm> collaborationPartners);
        Task<CollaborationPartner> CreateCollaborationPartnerAsync(CollaborationPartnerAm collaborationPartner);
        Task<CollaborationPartner> UpdateCollaborationPartnerAsync(int id, CollaborationPartnerAm collaborationPartner);
    }
}