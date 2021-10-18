using System.Collections.Generic;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Mb.Models.Abstract
{
    public interface IModuleInterface
    {
        void CreateModule(IServiceCollection services, IConfiguration configuration);
        ICollection<Profile> GetProfiles();
        string GetName();
    }
}
