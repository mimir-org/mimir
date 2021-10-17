using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Services.Contracts
{
    public interface ICommonService
    {
        IEnumerable<Contractor> GetAllContractors();
        IEnumerable<CombinedAttributeFilter> GetAllCombinedAttributeFilters();
        Task CreateContractorsAsync(IEnumerable<Contractor> contractors);
    }
}
