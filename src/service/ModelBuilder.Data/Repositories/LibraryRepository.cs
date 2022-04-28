using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Data.Enums;
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

        public LibraryRepository(IHttpRepository httpRepository, ICacheRepository cacheRepository, IOptions<ApplicationSetting> applicationSetting)
        {
            _httpRepository = httpRepository;
            _cacheRepository = cacheRepository;
            _applicationSetting = applicationSetting?.Value;
        }

        public T GetObjectById<T>(string id) where T : EnumBase
        {
            throw new NotImplementedException();
            //return _enumBaseRepository.GetAll().OfType<T>().FirstOrDefault(x => x.Id == id);
        }

        public IEnumerable<T> GetObject<T>() where T : EnumBase
        {
            throw new NotImplementedException();
            //return _enumBaseRepository.GetAll().OfType<T>().ToList();
        }

        public void Untrack()
        {
            throw new NotImplementedException();
            //_enumBaseRepository.Context.ChangeTracker.Clear();
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

        public Task<IEnumerable<LibraryNodeItem>> GetNodeTypes(string searchString = null)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<LibraryInterfaceItem>> GetInterfaceTypes(string searchString = null)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<LibraryTransportItem>> GetTransportTypes(string searchString = null)
        {
            throw new NotImplementedException();
        }

        public Task<T> GetLibraryItem<T>(string id) where T : class, new()
        {
            throw new NotImplementedException();
        }

        public void ClearAllChangeTracker()
        {
            throw new NotImplementedException();
        }
    }
}