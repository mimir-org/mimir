using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Microsoft.Extensions.Caching.Memory;

namespace Mb.Data.Repositories;

public class InMemoryCacheRepository : ICacheRepository
{
    /// <summary>
    /// Refresh queue
    /// </summary>
    public Queue<(string, string)> RefreshList { get; set; }

    private const int Seconds = 86400;
    private readonly IMemoryCache _memoryCache;
    private readonly ConcurrentDictionary<string, SemaphoreSlim> _locks;

    /// <summary>
    /// Default constructor
    /// </summary>
    /// <param name="memoryCache"></param>
    public InMemoryCacheRepository(IMemoryCache memoryCache)
    {
        _memoryCache = memoryCache;
        _locks = new ConcurrentDictionary<string, SemaphoreSlim>();
        RefreshList = new Queue<(string, string)>();
    }

    /// <summary>
    /// Delete from cache based on key
    /// </summary>
    /// <param name="key">The cache key to delete</param>
    /// <returns>Completed Task</returns>
    public Task DeleteCacheAsync(string key)
    {
        _memoryCache.Remove(key);
        return Task.CompletedTask;
    }

    /// <summary>
    /// Get or create cache
    /// </summary>
    /// <typeparam name="T">Generic return value of function param</typeparam>
    /// <param name="key">Cache key</param>
    /// <param name="item">Function param that create the cache</param>
    /// <param name="seconds">Override lifetime cache</param>
    /// <returns>T value</returns>
    public async Task<T> GetOrCreateAsync<T>(string key, Func<Task<T>> item, int? seconds)
    {
        if (_memoryCache.TryGetValue(key, out T cacheEntry))
            return cacheEntry;

        int sec;

        switch (seconds)
        {
            case null:
                sec = Seconds;
                break;
            case <= 0:
                cacheEntry = await item();
                return cacheEntry;
            default:
                sec = seconds.Value;
                break;
        }

        var cacheLock = _locks.GetOrAdd(key.ToString(), _ => new SemaphoreSlim(1, 1));
        await cacheLock.WaitAsync();

        try
        {
            if (!_memoryCache.TryGetValue(key, out cacheEntry))
            {
                cacheEntry = await item();
                _memoryCache.Set(key, cacheEntry, DateTimeOffset.Now.AddSeconds(sec));
            }
        }
        finally
        {
            cacheLock.Release();
        }

        return cacheEntry;
    }
}