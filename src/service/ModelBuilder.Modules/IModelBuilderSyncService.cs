using System.Threading.Tasks;

namespace Mb.Modules
{
    public interface IModelBuilderSyncService : IModuleInterface
    {
        Task SendData<T>(T data) where T : class;
        Task ReceiveData();
    }
}
