using System.Text;
using AutoMapper;
using Mb.Models.Abstract;
using Mb.Models.Application;
using Mb.Models.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ModelBuilder.Rdf.Repositories;
using ModelBuilder.Rdf.Services;

namespace RdfJsonLdParser
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
                Id = new Guid("7EAC806B-7B5F-42D1-BA31-38F2216DF9CA"),
                Name = "Mimir RDF Json-Ld"
            };
        }

        public Task<byte[]> SerializeProject(Project project)
        {
            _ontologyService.BuildProject(project);
            var bytes = _ontologyService.GetBytes<ImfJsonLdWriter>();
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
                ContentType = @"application/ld+json",
                FileExtension = "jsonld"
            };
        }
    }
}