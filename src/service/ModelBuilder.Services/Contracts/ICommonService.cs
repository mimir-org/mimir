using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Services.Contracts
{
    public interface ICommonService
    {
        IEnumerable<CollaborationPartner> GetAllCollaborationPartners();
        IEnumerable<CombinedAttributeFilter> GetAllCombinedAttributeFilters();
        Task CreateCollaborationPartnersAsync(IEnumerable<CollaborationPartnerAm> collaborationPartners);
        Task<CollaborationPartner> CreateCollaborationPartnerAsync(CollaborationPartnerAm collaborationPartner);
    }
}
