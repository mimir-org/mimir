using System.Threading.Tasks;

namespace Mb.Models.Abstract;

public interface IModelBuilderSyncService : IModuleInterface
{
    Task SendData<T>(T data) where T : class;
    Task ReceiveData();
}