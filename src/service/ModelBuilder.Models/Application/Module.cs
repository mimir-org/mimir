using Mb.Models.Abstract;
using Mb.Models.Data;
using Mb.Models.Enums;

namespace Mb.Models.Application
{
    public class Module
    {
        public ModuleDescription ModuleDescription { get; set; }
        public IModuleInterface Instance { get; set; }
        public ModuleType ModuleType { get; set; }
    }
}