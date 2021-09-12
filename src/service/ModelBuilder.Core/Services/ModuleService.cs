using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Mb.Core.Exceptions;
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
            CreateModules(allAssemblies);
            return Task.CompletedTask;
        }

        public void CreateModules(List<Assembly> assemblies)
        {
            foreach (var assembly in assemblies)
            {
                try
                {
                    var parserInstance = assembly.GetTypes()
                        .Where(x => x.GetInterfaces().Contains(typeof(IModelBuilderParser)) &&
                                    x.GetConstructor(Type.EmptyTypes) != null)
                        .Select(y => Activator.CreateInstance(y) as IModelBuilderParser)
                        .FirstOrDefault();

                    if (parserInstance != null)
                    {
                        var name = parserInstance.GetName();
                        if (string.IsNullOrEmpty(name))
                            throw new ModelBuilderModuleException("Module name must have a value.");
                        ParserModules.Add(name.ToLower(), parserInstance);
                    }

                    var pluginInstance = assembly.GetTypes()
                        .Where(x => x.GetInterfaces().Contains(typeof(IModelBuilderPlugin)) &&
                                    x.GetConstructor(Type.EmptyTypes) != null)
                        .Select(y => Activator.CreateInstance(y) as IModelBuilderPlugin)
                        .FirstOrDefault();

                    if (pluginInstance != null)
                    {
                        var name = pluginInstance.GetName();
                        if(string.IsNullOrEmpty(name))
                            throw new ModelBuilderModuleException("Module name must have a value.");

                        PluginModules.Add(name.ToLower(), pluginInstance);
                    }
                }
                catch (ReflectionTypeLoadException)
                {
                }
                catch (Exception e)
                {
                    throw new ModelBuilderModuleException($"Can't create modules. Error: {e.Message}");
                }
            }
        }

        public T Resolve<T>(string name) where T : IModuleInterface
        {
            if (string.IsNullOrEmpty(name))
                throw new ModelBuilderModuleException("Module name is required"); 

            if (typeof(IModelBuilderParser).IsAssignableFrom(typeof(T)))
            {
                if (ParserModules.TryGetValue(name.ToLower(), out var objectValue))
                    if (objectValue is IModelBuilderParser t)
                        return (T)t;
            }

            if (typeof(IModelBuilderPlugin).IsAssignableFrom(typeof(T)))
            {
                if (PluginModules.TryGetValue(name.ToLower(), out var objectValue))
                    if (objectValue is IModelBuilderPlugin t)
                        return (T)t;
            }

            throw new NotSupportedException("The type is not supported or empty");
        }
    }
}
