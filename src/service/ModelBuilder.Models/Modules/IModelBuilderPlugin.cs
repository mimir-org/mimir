using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Mb.Models.Modules
{
    public interface IModelBuilderPlugin : IModuleInterface
    {
        void CreateModule(IServiceCollection services, IConfiguration configuration, ServiceProvider provider);
    }
}
