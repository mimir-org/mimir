using System.Collections.Generic;
using System.Threading.Tasks;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Services.Contracts;

public interface ICommonService
{
    Task<ICollection<MimirorgCompanyCm>> GetAllCompanies();
    Task<MimirorgCompanyCm> GetCurrentCompany();
    Task<MimirorgCompanyCm> GetCompanyByDomain(string domain);
}