using System.Threading.Tasks;

namespace Mb.Core.Services.Contracts
{
    public interface ISeedingService
    {
        Task LoadDataFromFiles();
    }
}
