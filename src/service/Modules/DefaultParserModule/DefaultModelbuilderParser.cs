﻿using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Modules;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace DefaultParserModule
{
    public class DefaultModelBuilderParser : IModelBuilderParser
    {
        private ServiceProvider _provider;
        private IMapper _mapper;

        public void CreateModule(IServiceCollection services, IConfiguration configuration)
        {
            _provider = services.BuildServiceProvider();
            _mapper = _provider.GetService<IMapper>();
        }

        public ICollection<Profile> GetProfiles()
        {
            return null;
        }

        public string GetName()
        {
            return "Default";
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
            var serializerSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };

            var projectAm = _mapper.Map<ProjectAm>(project);
            serializerSettings.Converters.Add(new StringEnumConverter());
            var result = JsonConvert.SerializeObject(projectAm, serializerSettings);
            return Task.FromResult(Encoding.UTF8.GetBytes(result));
        }

        public Task<Project> DeserializeProject(byte[] data)
        {
            var valueAsString = Encoding.UTF8.GetString(data, 0, data.Length);
            var project = JsonConvert.DeserializeObject<Project>(valueAsString);
            return Task.FromResult(project);
        }

        public Task<ProjectAm> DeserializeProjectAm(byte[] data)
        {
            var valueAsString = Encoding.UTF8.GetString(data, 0, data.Length);
            var project = JsonConvert.DeserializeObject<ProjectAm>(valueAsString);
            return Task.FromResult(project);
        }
    }
}
