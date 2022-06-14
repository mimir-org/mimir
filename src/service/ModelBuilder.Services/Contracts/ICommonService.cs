using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Client;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Services.Contracts
{
    public interface ICommonService
    {
        IEnumerable<CombinedAttributeFilter> GetAllCombinedAttributeFilters();
        Task<ICollection<MimirorgCompanyCm>> GetAllCompanies();
        Task<MimirorgCompanyCm> GetCompanyByDomain(string domain);
    }
}