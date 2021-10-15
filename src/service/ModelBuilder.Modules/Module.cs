namespace Mb.Modules
{
    public class Module
    {
        public string Name { get; set; }
        public IModuleInterface Instance { get; set; }
        public ModuleType ModuleType { get; set; }
    }
}
