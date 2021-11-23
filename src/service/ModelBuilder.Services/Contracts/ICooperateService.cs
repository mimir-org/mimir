using System.Threading.Tasks;
using Mb.Models.Workers;

namespace Mb.Services.Contracts
{
    public interface ICooperateService
    {
        Task SendUpdates(ProjectWorker worker);
    }
}
