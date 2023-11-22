using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Models.Abstract;
using Mb.Models.Application;
using Mb.Models.Common;
using Mb.Models.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace DefaultParserModule;

public class DefaultModelBuilderParser : IModelBuilderParser
{
    private ServiceProvider _provider;
    private IMapper _mapper;
    private JsonSerializerSettings _serializerSettings;

    public void CreateModule(IServiceCollection services, IConfiguration configuration)
    {
        _provider = services.BuildServiceProvider();
        _mapper = _provider.GetService<IMapper>();
        _serializerSettings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
            TypeNameHandling = TypeNameHandling.All
        };

        _serializerSettings.Converters.Add(new StringEnumConverter());
    }

    public ICollection<Profile> GetProfiles()
    {
        return null;
    }

    public ModuleDescription GetModuleDescription()
    {
        return new ModuleDescription
        {
            Id = new Guid("5BA4A44C-8E06-49ED-8EE4-CD88FDB78C67"),
            Name = "Mimir JSON"
        };
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
        var projectAm = _mapper.Map<ProjectRequest>(project);

        var result = JsonConvert.SerializeObject(projectAm, _serializerSettings);
        return Task.FromResult(Encoding.UTF8.GetBytes(result));
    }

    public Task<Project> DeserializeProject(byte[] data)
    {
        var valueAsString = Encoding.UTF8.GetString(data, 0, data.Length);
        var project = JsonConvert.DeserializeObject<Project>(valueAsString, _serializerSettings);
        return Task.FromResult(project);
    }

    public Task<ProjectRequest> DeserializeProjectAm(byte[] data)
    {
        var valueAsString = Encoding.UTF8.GetString(data, 0, data.Length);
        var project = JsonConvert.DeserializeObject<ProjectRequest>(valueAsString, _serializerSettings);
        return Task.FromResult(project);
    }
}