using System;
using System.Threading;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Mb.Services.HostedServices;

public class TimedCacheService : IHostedService, IDisposable
{
    private bool _disposedValue;
    private Timer _timer = null!;
    private readonly ILogger<TimedCacheService> _logger;
    private readonly ICacheRepository _cacheRepository;
    private readonly IServiceScopeFactory _scopeFactory;

    /// <summary>
    /// Default constructor
    /// </summary>
    /// <param name="logger"></param>
    /// <param name="cacheRepository"></param>
    /// <param name="scopeFactory"></param>
    public TimedCacheService(ILogger<TimedCacheService> logger, ICacheRepository cacheRepository, IServiceScopeFactory scopeFactory)
    {
        _logger = logger;
        _cacheRepository = cacheRepository;
        _scopeFactory = scopeFactory;
    }

    /// <summary>
    /// Start the timed cache service
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public Task StartAsync(CancellationToken cancellationToken)
    {
        _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromSeconds(5));
        _logger.LogInformation("Timed cache service started.");
        return Task.CompletedTask;
    }

    /// <summary>
    /// Stop the timed cache service
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public Task StopAsync(CancellationToken cancellationToken)
    {
        _timer?.Change(Timeout.Infinite, 0);
        _logger.LogInformation("Timed cache service stopped.");
        return Task.CompletedTask;
    }

    /// <summary>
    /// Refresh cache worker
    /// </summary>
    /// <param name="state"></param>
    private void DoWork(object state)
    {
        if (!_cacheRepository.RefreshList.TryDequeue(out var nextItem))
            return;

        using var scope = _scopeFactory.CreateScope();
        var repo = scope.ServiceProvider.GetRequiredService<IProjectRepository>();
        try
        {
            Guid.TryParse(nextItem.Item1, out var result);
            _ = repo.GetAsyncComplete(result);
            _logger.LogInformation($"Timed cache service running: {nextItem.Item1}");
        }
        catch (Exception e)
        {
            _logger.LogError($"TimedCacheService running. {e.Message}");
        }
    }

    #region Disposable

    /// <summary>
    /// Dispose timed cache service
    /// </summary>
    /// <param name="disposing"></param>
    protected virtual void Dispose(bool disposing)
    {
        if (_disposedValue)
            return;

        if (disposing)
        {
            _timer?.Dispose();
        }

        _disposedValue = true;
    }

    /// <summary>
    /// Dispose timed cache service
    /// </summary>
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    #endregion
}