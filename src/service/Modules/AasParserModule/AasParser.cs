using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Models.Abstract;
using Mb.Models.Application;
using Mb.Models.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AasParserModule
{
    public class AasParser : IModelBuilderParser
    {
        public void CreateModule(IServiceCollection services, IConfiguration configuration)
        {
            
        }

        public ICollection<Profile> GetProfiles()
        {
            return null;
        }

        public ModuleDescription GetModuleDescription()
        {
            throw new NotImplementedException();
        }

        public FileFormat GetFileFormat()
        {
            return new()
            {
                ContentType = @"application/json",
                FileExtension = "json"
            };
        }

        public Task<byte[]> SerializeProject(Project project)
        {
            throw new NotImplementedException();
        }

        public Task<Project> DeserializeProject(byte[] data)
        {
            throw new NotImplementedException();
        }

        public Task<ProjectAm> DeserializeProjectAm(byte[] data)
        {
            throw new NotImplementedException();
        }
    }
}
