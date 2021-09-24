using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Mb.Models.Modules
{
    public interface IModelBuilderSyncService : IModuleInterface
    {
        void CreateModule(IServiceCollection services, IConfiguration configuration, ServiceProvider provider);
        Task SendData<T>(T data) where T : class;
    }
}
