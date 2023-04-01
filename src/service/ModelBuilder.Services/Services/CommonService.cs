using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Services.Contracts;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Services.Services;

public class CommonService : ICommonService
{
    private readonly ICompanyRepository _companyRepository;

    public CommonService(ICompanyRepository companyRepository)
    {
        _companyRepository = companyRepository;
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
    /// Get current company
    /// </summary>
    /// <returns>The registered company</returns>
    public async Task<MimirorgCompanyCm> GetCurrentCompany()
    {
        var company = await _companyRepository.GetCurrentCompany();
        return company;
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