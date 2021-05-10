using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Mb.Core.Services.Contracts;
using Mb.Models.Modules;

namespace Mb.Core.Services
{
    public class ModuleService : IModuleService
    {
        public Dictionary<string, object> ParserModules { get; set; }
        public Dictionary<string, object> PluginModules { get; set; }
        
        public ModuleService()
        {
            ParserModules = new Dictionary<string, object>();
            PluginModules = new Dictionary<string, object>();
        }

        public Task InitialModules()
        {
            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

            if (path == null)
                return Task.CompletedTask;

            var allAssemblies = Directory.GetFiles(path, "*.dll").Select(Assembly.LoadFile).ToList();
            var moduleAssemblies = allAssemblies.Where(x => x.FullName != null && x.FullName.ToLower().Contains("module")).ToArray();
            
            CreateParsers(moduleAssemblies);
            return Task.CompletedTask;
        }

        public void CreateParsers(Assembly[] assemblies)
        {
            foreach (var assembly in assemblies)
            {
                var parserInstance = assembly.GetTypes()
                    .Where(x => x.GetInterfaces().Contains(typeof(IModelBuilderParser)) &&
                                x.GetConstructor(Type.EmptyTypes) != null)
                    .Select(y => Activator.CreateInstance(y) as IModelBuilderParser)
                    .FirstOrDefault();
                
                if(parserInstance != null)
                    ParserModules.Add(parserInstance.GetName(), parserInstance);

                var pluginInstance = assembly.GetTypes()
                    .Where(x => x.GetInterfaces().Contains(typeof(IModelBuilderPlugin)) &&
                                x.GetConstructor(Type.EmptyTypes) != null)
                    .Select(y => Activator.CreateInstance(y) as IModelBuilderPlugin)
                    .FirstOrDefault();

                if (pluginInstance != null)
                    PluginModules.Add(pluginInstance.GetName(), pluginInstance);

            }
        }

        public T Resolve<T>(string name) where T : IModuleInterface
        {
            if (typeof(IModelBuilderParser).IsAssignableFrom(typeof(T)))
            {
                if (ParserModules.TryGetValue(name, out var objectValue))
                    if (objectValue is IModelBuilderParser t)
                        return (T)t;
            }

            if (typeof(IModelBuilderPlugin).IsAssignableFrom(typeof(T)))
            {
                if (PluginModules.TryGetValue(name, out var objectValue))
                    if (objectValue is IModelBuilderPlugin t)
                        return (T)t;
            }

            throw new NotSupportedException("The type is not supported or empty");
        }
    }
}
