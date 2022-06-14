using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Settings;
using Microsoft.Extensions.Options;
using Mimirorg.TypeLibrary.Models.Application;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Data.Repositories
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly IHttpRepository _httpRepository;
        private readonly ICacheRepository _cacheRepository;
        private readonly ApplicationSetting _applicationSetting;

        public CompanyRepository(IHttpRepository httpRepository, ICacheRepository cacheRepository, IOptions<ApplicationSetting> applicationSetting)
        {
            _httpRepository = httpRepository;
            _cacheRepository = cacheRepository;
            _applicationSetting = applicationSetting?.Value;
        }

        public async Task<List<MimirorgCompanyCm>> GetCompanies()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("mimirorgcompany");
            var data = await _cacheRepository.GetOrCreateAsync("company",
                async () => await _httpRepository.GetData<List<MimirorgCompanyCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 300 : null);

            return data;
        }

        public async Task<MimirorgCompanyCm> GetCompany(MimirorgCompanyAuthAm auth)
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("mimirorgcompany");

            var data = await _cacheRepository.GetOrCreateAsync("company",
                async () => await _httpRepository.PostData<MimirorgCompanyCm, MimirorgCompanyAuthAm>(url, auth), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 300 : null);

            return data;
        }
    }
}