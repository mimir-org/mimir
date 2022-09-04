using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Settings;
using Microsoft.Extensions.Options;
using Mimirorg.TypeLibrary.Enums;
using Mimirorg.TypeLibrary.Models.Application;
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

        public async Task<List<AttributeQualifierLibCm>> GetAttributeQualifiers()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("libraryattribute/qualifier");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.AttributeQualifier.ToString(),
                async () => await _httpRepository.GetData<List<AttributeQualifierLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

            return data;
        }

        public async Task<List<AttributeSourceLibCm>> GetAttributeSources()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("libraryattribute/source");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.AttributeSource.ToString(),
                async () => await _httpRepository.GetData<List<AttributeSourceLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

            return data;
        }

        public async Task<List<AttributeFormatLibCm>> GetAttributeFormats()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("libraryattribute/format");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.AttributeFormat.ToString(),
                async () => await _httpRepository.GetData<List<AttributeFormatLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

            return data;
        }

        public async Task<List<AttributeConditionLibCm>> GetAttributeConditions()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("libraryattribute/condition");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.AttributeCondition.ToString(),
                async () => await _httpRepository.GetData<List<AttributeConditionLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

            return data;
        }

        public async Task<List<PurposeLibCm>> GetPurposes()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("librarypurpose");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.Purpose.ToString(),
                async () => await _httpRepository.GetData<List<PurposeLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

            return data;
        }

        public async Task<List<UnitLibCm>> GetUnits()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("libraryunit");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.Unit.ToString(),
                async () => await _httpRepository.GetData<List<UnitLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

            return data;
        }

        public async Task<List<AttributeLibCm>> GetAttributes()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("libraryattribute");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.Attribute.ToString(),
                async () => await _httpRepository.GetData<List<AttributeLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

            return data;
        }

        public async Task<List<SymbolLibCm>> GetSymbols()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("librarysymbol");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.Symbol.ToString(),
                async () => await _httpRepository.GetData<List<SymbolLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

            return data;
        }

        public async Task<List<SimpleLibCm>> GetSimpleTypes()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("librarysimple");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.SimpleType.ToString(),
                async () => await _httpRepository.GetData<List<SimpleLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

            return data;
        }

        public async Task<List<AttributePredefinedLibCm>> GetPredefinedAttributes()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("libraryattribute/predefined");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.AttributePredefined.ToString(),
                async () => await _httpRepository.GetData<List<AttributePredefinedLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

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

        public async Task<List<RdsLibCm>> GetRds()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("libraryrds");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.Rds.ToString(),
                async () => await _httpRepository.GetData<List<RdsLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

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

        public async Task<NodeLibCm> CreateNodeType(NodeLibAm node)
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("librarynode");
            var data = await _httpRepository.PostData<NodeLibCm, NodeLibAm>(url, node);
            return data;
        }

        public async Task<NodeLibCm> UpdateNodeType(string id, NodeLibAm node)
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl($"librarynode/{id}");
            var data = await _httpRepository.PutData<NodeLibCm, NodeLibAm>(url, node);
            return data;
        }

        public async Task<TransportLibCm> CreateTransportType(TransportLibAm transport)
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("librarytransport");
            var data = await _httpRepository.PostData<TransportLibCm, TransportLibAm>(url, transport);
            return data;
        }

        public async Task<TransportLibCm> UpdateTransportType(string id, TransportLibAm transport)
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl($"librarytransport/{id}");
            var data = await _httpRepository.PutData<TransportLibCm, TransportLibAm>(url, transport);
            return data;
        }

        public async Task<InterfaceLibCm> CreateInterfaceType(InterfaceLibAm inter)
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("libraryinterface");
            var data = await _httpRepository.PostData<InterfaceLibCm, InterfaceLibAm>(url, inter);
            return data;
        }

        public async Task<InterfaceLibCm> UpdateInterfaceType(string id, InterfaceLibAm inter)
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl($"libraryinterface/{id}");
            var data = await _httpRepository.PutData<InterfaceLibCm, InterfaceLibAm>(url, inter);
            return data;
        }

        public async Task<bool> DeleteNode(string id)
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl($"librarynode/{id}");
            var data = await _httpRepository.DeleteDataStruct<bool>(url);
            return data;
        }

        public async Task<bool> DeleteTransport(string id)
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl($"librarytransport/{id}");
            var data = await _httpRepository.DeleteDataStruct<bool>(url);
            return data;
        }

        public async Task<bool> DeleteInterface(string id)
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl($"libraryinterface/{id}");
            var data = await _httpRepository.DeleteDataStruct<bool>(url);
            return data;
        }
    }
}