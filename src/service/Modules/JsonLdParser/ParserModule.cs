using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Models.Abstract;
using Mb.Models.Application;
using Mb.Models.Common;
using Mb.Models.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ModelBuilder.Rdf.Repositories;
using ModelBuilder.Rdf.Services;
using VDS.RDF;

namespace JsonLdParser;

public class ParserModule : IModelBuilderParser
{
    private ServiceProvider _provider;
    private IOntologyService _ontologyService;
    private IMapper _mapper;

    public void CreateModule(IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IOntologyRepository, OntologyRepository>();
        services.AddScoped<IOntologyService, OntologyService>();

        _provider = services.BuildServiceProvider();

        _ontologyService = _provider.GetService<IOntologyService>();
        _mapper = _provider.GetService<IMapper>();
    }

    public ICollection<Profile> GetProfiles()
    {
        return new List<Profile>();
    }

    public ModuleDescriptionDm GetModuleDescription()
    {
        return new ModuleDescriptionDm
        {
            Id = new Guid("4E143178-9DC7-413F-8F0B-B4D89F8AD943").ToString(),
            Name = "Mimir IMF JSON-LD"
        };
    }

    public Task<byte[]> SerializeProject(ProjectDm project)
    {
        _ontologyService.BuildProject(project);
        var bytes = _ontologyService.GetBytes<ImfJsonLdWriter>();
        return Task.FromResult(bytes);
    }

    public Task<ProjectDm> DeserializeProject(byte[] data)
    {
        var projectAm = DeserializeProjectAm(data);
        var project = _mapper.Map<ProjectDm>(projectAm);
        return Task.FromResult(project);
    }

    public Task<ProjectAm> DeserializeProjectAm(byte[] data)
    {
        var valueAsString = Encoding.UTF8.GetString(data, 0, data.Length);
        var graph = LoadGraph(valueAsString);
        var project = _ontologyService.BuildProject(graph);
        return Task.FromResult(project);
    }

    public static IGraph LoadGraph(string valueAsString)
    {
        var parser = new VDS.RDF.Parsing.JsonLdParser();
        var store = new TripleStore();
        using (TextReader reader = new StringReader(valueAsString))
        {
            parser.Load(store, reader);
        }
        if (store.Graphs.Count != 1)
        {
            throw new InvalidDataException("Input JSON contained more than one graph, this is an error");
        }
        return store.Graphs.First();

    }

    public FileFormat GetFileFormat()
    {
        return new FileFormat
        {
            ContentType = @"application/ld+json",
            FileExtension = "jsonld"
        };
    }
}