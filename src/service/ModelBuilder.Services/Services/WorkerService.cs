using System.Threading;
using System.Threading.Tasks;
using Mb.Services.Contracts;

namespace Mb.Services.Services
{
    public class WorkerService : IWorkerService
    {
        public Task StartAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}