using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;
using Mb.Models.Modules;
using Module = Mb.Models.Modules.Module;

namespace Mb.Core.Services.Contracts
{
    public interface IModuleService
    {
        List<Assembly> Assemblies { get; }
        List<Module> Modules { get; set; }
        Task InitialModules();
        T Resolve<T>(string name) where T : IModuleInterface;
    }
}
