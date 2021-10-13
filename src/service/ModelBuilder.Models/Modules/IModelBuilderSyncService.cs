using System.Threading.Tasks;

namespace Mb.Models.Modules
{
    public interface IModelBuilderSyncService : IModuleInterface
    {
        Task SendData<T>(T data) where T : class;
    }
}
