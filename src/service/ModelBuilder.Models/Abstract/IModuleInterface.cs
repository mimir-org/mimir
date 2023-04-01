using System.Collections.Generic;
using AutoMapper;
using Mb.Models.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Mb.Models.Abstract;

public interface IModuleInterface
{
    void CreateModule(IServiceCollection services, IConfiguration configuration);
    ICollection<Profile> GetProfiles();
    ModuleDescriptionDm GetModuleDescription();
}