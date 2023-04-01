using System.Collections.Generic;
using System.Threading.Tasks;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Data.Contracts;

public interface ICompanyRepository
{
    Task<List<MimirorgCompanyCm>> GetCompanies();
    Task<MimirorgCompanyCm> GetCurrentCompany();
}