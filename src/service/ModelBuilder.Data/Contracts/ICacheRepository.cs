using System;
using System.Threading.Tasks;

namespace Mb.Data.Contracts
{
    public interface ICacheRepository
    {
        Task DeleteCacheAsync(string key);
        Task<T> TryGetAsync<T>(string key);
        Task<T> GetOrCreateAsync<T>(string key, Func<Task<T>> item);
        Task CreateAsync<T>(string key, Func<Task<T>> item);
    }
}
