using Mb.Data.Contracts;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Mb.Services.Contracts;

namespace Mb.Services.HostedServices
{
    public class TimedCleanupService : IHostedService, IDisposable
    {
        private bool _isRunning;
        private bool _disposedValue;
        private Timer _timer = null!;
        private readonly ILogger<TimedCleanupService> _logger;
        private readonly IServiceScopeFactory _scopeFactory;

        public TimedCleanupService(ILogger<TimedCleanupService> logger, IServiceScopeFactory scopeFactory)
        {
            _logger = logger;
            _scopeFactory = scopeFactory;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromSeconds(2));
            _logger.LogInformation("Timed cleanup service started.");
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);
            _logger.LogInformation("Timed cleanup service stopped.");
            return Task.CompletedTask;
        }

        private void DoWork(object state)
        {
            try
            {
                if (_isRunning)
                    return;

                _isRunning = true;
                using var scope = _scopeFactory.CreateScope();
                var repo = scope.ServiceProvider.GetRequiredService<IProjectRepository>();
                var cleanUpData = repo.GetAll().Where(x => x.Name.ToLower().StartsWith("temp_")).Select(x => x.Id)
                    .ToList();

                if (!cleanUpData.Any())
                    return;

                var service = scope.ServiceProvider.GetRequiredService<IProjectService>();
                var tasks = cleanUpData.Select(id => service.Delete(id)).ToArray();
                Task.WaitAll(tasks);

            }
            catch (Exception e)
            {
                _logger.LogError($"Timed cleanup service running. {e.Message}");
            }

            finally
            {
                _isRunning = false;
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
            _isRunning = false;
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
}