using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Models.Abstract;
using Mb.Models.Application;
using Mb.Models.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ModelBuilder.Rdf.Repositories;
using ModelBuilder.Rdf.Services;
using VDS.RDF.Writing;

namespace RdfNTriplesParser
{
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

        public ModuleDescription GetModuleDescription()
        {
            return new ModuleDescription
            {
                Id = new Guid("59ED4298-EE6A-443D-A465-35053E9B4581"),
                Name = "Mimir RDF N-Triples"
            };
        }

        public Task<byte[]> SerializeProject(Project project)
        {
            _ontologyService.BuildProject(project);
            var bytes = _ontologyService.GetBytes<NTriplesWriter>();
            return Task.FromResult(bytes);
        }

        public Task<Project> DeserializeProject(byte[] data)
        {
            var projectAm = DeserializeProjectAm(data);
            var project = _mapper.Map<Project>(projectAm);
            return Task.FromResult(project);
        }

        public Task<ProjectAm> DeserializeProjectAm(byte[] data)
        {
            var valueAsString = Encoding.UTF8.GetString(data, 0, data.Length);
            var project = _ontologyService.BuildProject(valueAsString);
            return Task.FromResult(project);
        }

        public FileFormat GetFileFormat()
        {
            return new FileFormat
            {
                ContentType = @"application/n-triples",
                FileExtension = "nt"
            };
        }
    }
}