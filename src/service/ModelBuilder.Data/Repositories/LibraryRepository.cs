using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Settings;
using Microsoft.Extensions.Options;
using Mimirorg.TypeLibrary.Enums;
using Mimirorg.TypeLibrary.Models.Client;
using ILibraryRepository = Mb.Data.Contracts.ILibraryRepository;

namespace Mb.Data.Repositories;

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

    public async Task<List<QuantityDatumLibCm>> GetQuantityDatums()
    {
        var task1 = GetQuantityDatumAsync(QuantityDatumType.QuantityDatumSpecifiedScope);
        var task2 = GetQuantityDatumAsync(QuantityDatumType.QuantityDatumSpecifiedProvenance);
        var task3 = GetQuantityDatumAsync(QuantityDatumType.QuantityDatumRangeSpecifying);
        var task4 = GetQuantityDatumAsync(QuantityDatumType.QuantityDatumRegularitySpecified);

        await Task.WhenAll(task1, task2, task3, task4);

        var quantityDatumSpecifiedScope = await task1;
        var quantityDatumSpecifiedProvenance = await task2;
        var quantityDatumRangeSpecifying = await task3;
        var quantityDatumRegularitySpecified = await task4;

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
    //TODO: Done
    public async Task<List<BlockLibCm>> GetBlockTypes()
    {

        try
        {
            // ReSharper disable once StringLiteralTypo
            var url = _applicationSetting.ApiUrl("libraryBlock");
            var data = await _cacheRepository.GetOrCreateAsync(CacheKey.Block.ToString(),
                async () => await _httpRepository.GetData<List<BlockLibCm>>(url),
                string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);

            return data;
        }
        catch (Exception e)
        {
            throw new Exception();
        }
    }

    public async Task<List<TerminalLibCm>> GetTerminalTypes()
    {
        // ReSharper disable once StringLiteralTypo
        var url = _applicationSetting.ApiUrl("libraryterminal");
        var data = await _cacheRepository.GetOrCreateAsync(CacheKey.Terminal.ToString(),
            async () => await _httpRepository.GetData<List<TerminalLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);
        return data;
    }

    public async Task<List<AttributeLibCm>> GetAttributeTypes()
    {
        // ReSharper disable once StringLiteralTypo
        var url = _applicationSetting.ApiUrl("libraryattribute");
        var data = await _cacheRepository.GetOrCreateAsync(CacheKey.Attribute.ToString(),
            async () => await _httpRepository.GetData<List<AttributeLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);
        return data;
    }

    private async Task<List<QuantityDatumLibCm>> GetQuantityDatumAsync(QuantityDatumType type)
    {
        // ReSharper disable once StringLiteralTypo
        var url = _applicationSetting.ApiUrl($"libraryattribute/datum/{(int) type}");
        var data = await _cacheRepository.GetOrCreateAsync(CacheKey.QuantityDatum.ToString(),
            async () => await _httpRepository.GetData<List<QuantityDatumLibCm>>(url), string.IsNullOrWhiteSpace(_applicationSetting.TypeLibrarySecret) ? 30 : null);
        return data;
    }
}