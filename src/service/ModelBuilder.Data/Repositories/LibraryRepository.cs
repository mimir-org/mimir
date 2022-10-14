using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Settings;
using Microsoft.Extensions.Options;
using Mimirorg.TypeLibrary.Enums;
using Mimirorg.TypeLibrary.Models.Client;
using ILibraryRepository = Mb.Data.Contracts.ILibraryRepository;

namespace Mb.Data.Repositories
{
    public class LibraryRepository : ILibraryRepository
    {
        private readonly IHttpRepository _httpRepository;
        private readonly ICacheRepository _cacheRepository;
        private readonly ApplicationSetting _applicationSetting;

        public LibraryRepository(IHttpRepository httpRepository, ICacheRepository cacheRepository, IOptions<ApplicationSetting> applicationSetting)
        {
            _httpRepository = httpRepository;
            _cacheRepository = cacheRepository;
            _applicationSetting = applicationSetting?.Value;
        }

        public async Task<List<QuantityDatumCm>> GetQuantityDatums()
        {
            var quantityDatumSpecifiedScope = new List<QuantityDatumCm>();
            var quantityDatumSpecifiedProvenance = new List<QuantityDatumCm>();
            var quantityDatumRangeSpecifying = new List<QuantityDatumCm>();
            var quantityDatumRegularitySpecified = new List<QuantityDatumCm>();

            var tasks = new List<Task>
            {
                Task.Run(() => GetQuantityDatumAsync(QuantityDatumType.QuantityDatumSpecifiedScope, quantityDatumSpecifiedScope)),
                Task.Run(() => GetQuantityDatumAsync(QuantityDatumType.QuantityDatumSpecifiedProvenance, quantityDatumSpecifiedProvenance)),
                Task.Run(() => GetQuantityDatumAsync(QuantityDatumType.QuantityDatumRangeSpecifying, quantityDatumRangeSpecifying)),
                Task.Run(() => GetQuantityDatumAsync(QuantityDatumType.QuantityDatumRegularitySpecified, quantityDatumRegularitySpecified))
            };

            await Task.WhenAll(tasks);
            return quantityDatumSpecifiedScope.Union(quantityDatumSpecifiedProvenance).Union(quantityDatumRangeSpecifying).Union(quantityDatumRegularitySpecified).ToList();
        }

        public async Task<List<UnitLibCm>> GetUnits()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("libraryunit");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.Unit.ToString(),
                async () => await _httpRepository.GetData<List<UnitLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

            return data;
        }

        public async Task<List<NodeLibCm>> GetNodeTypes()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("librarynode");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.AspectNode.ToString(),
                async () => await _httpRepository.GetData<List<NodeLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

            return data;
        }

        public async Task<List<InterfaceLibCm>> GetInterfaceTypes()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("libraryinterface");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.Interface.ToString(),
                async () => await _httpRepository.GetData<List<InterfaceLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

            return data;
        }

        public async Task<List<TransportLibCm>> GetTransportTypes()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("librarytransport");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.Transport.ToString(),
                async () => await _httpRepository.GetData<List<TransportLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

            return data;
        }

        public async Task<List<TerminalLibCm>> GetTerminalTypes()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("libraryterminal");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.Terminal.ToString(),
                async () => await _httpRepository.GetData<List<TerminalLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);
            return data;
        }

        private async Task GetQuantityDatumAsync(QuantityDatumType type, List<QuantityDatumCm> list)
        {
            list ??= new List<QuantityDatumCm>();

            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl($"libraryattribute/datum/{(int) type}");
            list = await _cacheRepository.GetOrCreateAsync(type.ToString(),
                async () => await _httpRepository.GetData<List<QuantityDatumCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);
        }
    }
}