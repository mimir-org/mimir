﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Mb.Core.Services.Contracts;
using Mb.Models.Enums;
using Mb.Models.Exceptions;
using Mb.Models.Modules;
using Module = Mb.Models.Modules.Module;

namespace Mb.Core.Services
{
    public class ModuleService : IModuleService
    {
        public List<Assembly> Assemblies { get; }
        public List<Module> Modules { get; set; }

        public ModuleService()
        {
            Assemblies = new List<Assembly>();
            Modules = new List<Module>();
            LoadAssemblies();
            Modules.AddRange(CreateModules<IModelBuilderPlugin>(ModuleType.Plugin));
            Modules.AddRange(CreateModules<IModelBuilderParser>(ModuleType.Parser));
            Modules.AddRange(CreateModules<IModelBuilderSyncService>(ModuleType.SyncService));
        }

        public Task InitialModules()
        {
            return Task.CompletedTask;
        }

        public T Resolve<T>(string name) where T : IModuleInterface
        {
            if (string.IsNullOrEmpty(name))
                throw new ModelBuilderModuleException("Module name is required");

            var instance = Modules.FirstOrDefault(x => string.Equals(x.Name, name, StringComparison.CurrentCultureIgnoreCase))?.Instance;
            if (instance is T obj)
            {
                return (T)obj;
            }

            throw new NotSupportedException("The type is not supported or empty");
        }

        private List<Module> CreateModules<T>(ModuleType moduleType) where T : IModuleInterface
        {
            var data = new List<Module>();

            if (Assemblies == null || !Assemblies.Any())
                return data;

            foreach (var instance in Assemblies
                .Select(assembly => assembly.GetTypes()
                .Where(x => x.GetInterfaces().Contains(typeof(T)) &&
                            x.GetConstructor(Type.EmptyTypes) != null)
                .Select(Activator.CreateInstance)
                .FirstOrDefault()))
            {
                if (instance is not T obj) 
                    continue;
                
                data.Add(new Module
                {
                    Name = obj.GetName() ?? Guid.NewGuid().ToString(),
                    Instance = obj,
                    ModuleType = moduleType
                });
            }

            return data;
        }

        private void LoadAssemblies()
        {
            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

            if (path == null)
                return;

            var assemblies = Directory.GetFiles(path, "*.dll").Select(Assembly.LoadFile).ToList();
            foreach (var assembly in assemblies)
            {
                try
                {
                    var hasModuleInterface = assembly.GetTypes().Any(x => x.GetInterfaces().Contains(typeof(IModuleInterface)) && x.GetConstructor(Type.EmptyTypes) != null);
                    if (!hasModuleInterface) 
                        continue;

                    var ass = Assembly.LoadFrom(assembly.Location);
                    Assemblies.Add(ass);
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
    }
}
