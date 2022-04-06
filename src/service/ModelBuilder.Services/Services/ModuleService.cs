using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Mb.Models.Abstract;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Models.Exceptions;
using Mb.Services.Contracts;

namespace Mb.Services.Services
{
    public class ModuleService : IModuleService
    {
        public List<Assembly> Assemblies { get; }
        public List<Models.Application.Module> Modules { get; set; }

        public ModuleService()
        {
            Assemblies = new List<Assembly>();
            Modules = new List<Models.Application.Module>();
            LoadAssemblies();
            Modules.AddRange(CreateModules<IModelBuilderPlugin>(ModuleType.Plugin));
            Modules.AddRange(CreateModules<IModelBuilderParser>(ModuleType.Parser));
            Modules.AddRange(CreateModules<IModelBuilderSyncService>(ModuleType.SyncService));
        }

        public Task InitialModules()
        {
            return Task.CompletedTask;
        }

        public T Resolve<T>(Guid id) where T : IModuleInterface
        {
            if (id == Guid.Empty)
                throw new ModelBuilderModuleException("Module id is required");

            var instance = Modules.FirstOrDefault(x => string.Equals(x.ModuleDescription.Id.ToString(), id.ToString(),
                StringComparison.CurrentCultureIgnoreCase))?.Instance;
            if (instance is T obj)
            {
                return obj;
            }

            throw new NotSupportedException("The type is not supported or empty");
        }

        private IEnumerable<Models.Application.Module> CreateModules<T>(ModuleType moduleType)
            where T : IModuleInterface
        {
            var data = new List<Models.Application.Module>();

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

                data.Add(new Models.Application.Module
                {
                    ModuleDescription = obj.GetModuleDescription() ?? new ModuleDescription
                    { Id = Guid.Empty, Name = "Missing description" },
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
                    var hasModuleInterface = assembly.GetTypes().Any(x =>
                        x.GetInterfaces().Contains(typeof(IModuleInterface)) &&
                        x.GetConstructor(Type.EmptyTypes) != null);
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

        public override string ToString()
        {
            var sb = new StringBuilder();
            sb.AppendLine();
            sb.AppendLine("#############################################################################");
            sb.AppendLine("############## Mimir services started. ######################################");
            sb.AppendLine("#############################################################################");

            if (Modules != null && Modules.Any())
            {
                foreach (var m in Modules.OrderBy(x => x.ModuleType))
                {
                    sb.AppendLine(m.ToString());
                }

                sb.AppendLine("#############################################################################");
            }

            return sb.ToString();
        }
    }
}