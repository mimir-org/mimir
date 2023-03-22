using System;
using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;
using Mb.Models.Abstract;
using Module = Mb.Models.Common.Module;

namespace Mb.Services.Contracts;

public interface IModuleService
{
    List<Assembly> Assemblies { get; }
    List<Module> Modules { get; set; }
    Task InitialModules();
    T Resolve<T>(Guid id) where T : IModuleInterface;
}