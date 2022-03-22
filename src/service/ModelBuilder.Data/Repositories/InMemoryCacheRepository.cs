using System;
using System.Collections.Concurrent;
using System.Threading;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Microsoft.Extensions.Caching.Memory;

namespace Mb.Data.Repositories
{
    public class InMemoryCacheRepository : ICacheRepository
    {
        private const int Seconds = 86400;
        private readonly IMemoryCache _memoryCache;
        private readonly ConcurrentDictionary<string, SemaphoreSlim> _locks;


        public InMemoryCacheRepository(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
            _locks = new ConcurrentDictionary<string, SemaphoreSlim>();
        }

        public Task DeleteCacheAsync(string key)
        {
            _memoryCache.Remove(key);
            return Task.CompletedTask;
        }

        public Task<T> TryGetAsync<T>(string key)
        {
            return _memoryCache.TryGetValue(key, out T cacheEntry) ?
                Task.FromResult(cacheEntry) :
                null;
        }

        public async Task<T> GetOrCreateAsync<T>(string key, Func<Task<T>> item)
        {
            if (_memoryCache.TryGetValue(key, out T cacheEntry))
                return cacheEntry;

            var cacheLock = _locks.GetOrAdd(key, k => new SemaphoreSlim(1, 1));

            await cacheLock.WaitAsync();
            try
            {
                if (!_memoryCache.TryGetValue(key, out cacheEntry))
                {
                    cacheEntry = await item();
                    _memoryCache.Set(key, cacheEntry, DateTimeOffset.Now.AddSeconds(Seconds));
                }
            }
            finally
            {
                cacheLock.Release();
            }

            return cacheEntry;
        }

        public async Task CreateAsync<T>(string key, Func<Task<T>> item)
        {
            await DeleteCacheAsync(key);

            var cacheLock = _locks.GetOrAdd(key, k => new SemaphoreSlim(1, 1));

            await cacheLock.WaitAsync();
            try
            {
                var cacheEntry = await item();
                _memoryCache.Set(key, cacheEntry, DateTimeOffset.Now.AddSeconds(Seconds));
            }
            finally
            {
                cacheLock.Release();
            }
        }
    }
}