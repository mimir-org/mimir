using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Data.Enums;
using Mb.Models.Settings;
using Mb.TypeEditor.Data.Contracts;
using Microsoft.Extensions.Options;
using Mimirorg.Common.Enums;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Data.Repositories
{
    public class LibRepository : ILibRepository
    {
        private readonly IEnumBaseRepository _enumBaseRepository;
        private readonly IHttpRepository _httpRepository;
        private readonly ICacheRepository _cacheRepository;
        private readonly ApplicationSetting _applicationSetting;

        public LibRepository(IEnumBaseRepository enumBaseRepository, IHttpRepository httpRepository,
            ICacheRepository cacheRepository, IOptions<ApplicationSetting> applicationSetting)
        {
            _enumBaseRepository = enumBaseRepository;
            _httpRepository = httpRepository;
            _cacheRepository = cacheRepository;
            _applicationSetting = applicationSetting?.Value;
        }

        public T GetObjectById<T>(string id) where T : EnumBase
        {
            return _enumBaseRepository.GetAll().OfType<T>().FirstOrDefault(x => x.Id == id);
        }

        public IEnumerable<T> GetObject<T>() where T : EnumBase
        {
            return _enumBaseRepository.GetAll().OfType<T>().ToList();
        }

        public void Untrack()
        {
            _enumBaseRepository.Context.ChangeTracker.Clear();
        }

        public async Task<List<AttributeQualifierLibCm>> GetAttributeQualifiers()
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("libraryattributequalifier");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.Qualifier.ToString(),
                async () => await _httpRepository.GetData<List<AttributeQualifierLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);
            return data;
        }
    }
}