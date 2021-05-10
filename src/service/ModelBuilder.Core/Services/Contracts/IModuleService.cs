using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Modules;

namespace Mb.Core.Services.Contracts
{
    public interface IModuleService
    {
        Dictionary<string, object> ParserModules { get; set; }
        Dictionary<string, object> PluginModules { get; set; }
        Task InitialModules();
        T Resolve<T>(string name) where T : IModuleInterface;
    }
}
