using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Data.Enums;
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

        public async Task<IEnumerable<LibraryNodeItem>> GetNodeTypes(string searchString = null)
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("libraryaspectnode");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.AspectNode.ToString(),
                async () => await _httpRepository.GetData<List<NodeLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

            var nodes = _mapper.Map<List<LibraryNodeItem>>(data);
            return string.IsNullOrWhiteSpace(searchString)
                ? nodes
                : nodes.Where(x => x.Name.ToLower().Contains(searchString.ToLower()));
        }

        public async Task<IEnumerable<LibraryInterfaceItem>> GetInterfaceTypes(string searchString = null)
        {
            var data = new List<LibraryInterfaceItem>();
            return await Task.FromResult(data);
        }

        public async Task<IEnumerable<LibraryTransportItem>> GetTransportTypes(string searchString = null)
        {
            var data = new List<LibraryTransportItem>();
            return await Task.FromResult(data);
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