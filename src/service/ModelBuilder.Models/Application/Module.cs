using Mb.Models.Abstract;
using Mb.Models.Enums;

namespace Mb.Models.Application
{
    public class Module
    {
        public string Name { get; set; }
        public IModuleInterface Instance { get; set; }
        public ModuleType ModuleType { get; set; }
    }
}
