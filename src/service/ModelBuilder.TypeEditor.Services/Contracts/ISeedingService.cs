using System.Threading.Tasks;

namespace Mb.TypeEditor.Services.Contracts
{
    public interface ISeedingService
    {
        Task LoadDataFromFiles();
    }
}
