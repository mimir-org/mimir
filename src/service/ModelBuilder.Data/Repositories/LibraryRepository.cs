using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Data.TypeEditor;
using Mb.Models.Settings;
using Microsoft.Extensions.Options;
using Mimirorg.Common.Enums;
using Mimirorg.TypeLibrary.Models.Client;
using ILibraryRepository = Mb.Data.Contracts.ILibraryRepository;

namespace Mb.Data.Repositories
{
    public class LibraryRepository : ILibraryRepository
    {
        private readonly IHttpRepository _httpRepository;
        private readonly ICacheRepository _cacheRepository;
        private readonly ApplicationSetting _applicationSetting;
        private readonly IMapper _mapper;

        public LibraryRepository(IHttpRepository httpRepository, ICacheRepository cacheRepository, IOptions<ApplicationSetting> applicationSetting, IMapper mapper)
        {
            _httpRepository = httpRepository;
            _cacheRepository = cacheRepository;
            _mapper = mapper;
            _applicationSetting = applicationSetting?.Value;
        }

        public async Task<List<AttributeQualifierLibCm>> GetAttributeQualifiers()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("libraryattributequalifier");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.AttributeQualifier.ToString(),
                async () => await _httpRepository.GetData<List<AttributeQualifierLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

            return data;
        }

        public async Task<List<AttributeSourceLibCm>> GetAttributeSources()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("libraryattributesource");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.AttributeSource.ToString(),
                async () => await _httpRepository.GetData<List<AttributeSourceLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

            return data;
        }

        public async Task<List<AttributeFormatLibCm>> GetAttributeFormats()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("libraryattributeformat");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.AttributeFormat.ToString(),
                async () => await _httpRepository.GetData<List<AttributeFormatLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

            return data;
        }

        public async Task<List<AttributeConditionLibCm>> GetAttributeConditions()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("libraryattributecondition");
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

        public async Task<List<AttributeAspectLibCm>> GetAspectAttributes()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("libraryattributeaspect");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.AttributeAspect.ToString(),
                async () => await _httpRepository.GetData<List<AttributeAspectLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

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

        public async Task<IEnumerable<LibraryNodeItem>> GetNodeTypes()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("libraryaspectnode");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.AspectNode.ToString(),
                async () => await _httpRepository.GetData<List<NodeLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

            return _mapper.Map<List<LibraryNodeItem>>(data);
        }

        public async Task<IEnumerable<LibraryInterfaceItem>> GetInterfaceTypes(string searchString = null)
        {
            var data = new List<LibraryInterfaceItem>();
            return await Task.FromResult(data);
        }

        public async Task<IEnumerable<LibraryTransportItem>> GetTransportTypes(string searchString = null)
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("librarytransport");
            var data = await _cacheRepository.GetOrCreateAsync("Transport",
                async () => await _httpRepository.GetData<List<TransportLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

            return _mapper.Map<List<LibraryTransportItem>>(data);
        }

        public Task<T> GetLibraryItem<T>(string id) where T : class, new()
        {
            throw new NotImplementedException();
        }

        public void ClearAllChangeTracker()
        {

        }

        public async Task<IEnumerable<Rds>> GetRds()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("libraryrds");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.Rds.ToString(),
                async () => await _httpRepository.GetData<List<RdsLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

            var rds = _mapper.Map<List<Rds>>(data);
            return rds;
        }
    }
}