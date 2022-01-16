using Mb.Models.Application;
using Mb.Models.Data;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Models.Abstract;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RdfParserModule.Services;
using VDS.RDF.Writing;

namespace RdfParserModule
{
    public class RdfParser : IModelBuilderParser
    {
        private ServiceProvider _provider;
        private IMapper _mapper;
        private IOntologyService _ontologyService;

        public void CreateModule(IServiceCollection services, IConfiguration configuration)
        {
            _provider = services.BuildServiceProvider();
            _mapper = _provider.GetService<IMapper>();
            _ontologyService = _provider.GetService<IOntologyService>();
        }

        public ICollection<Profile> GetProfiles()
        {
            return new List<Profile> { new RdfProfile() };
        }

        public ModuleDescription GetModuleDescription()
        {
            return new ModuleDescription
            {
                Id = new Guid("59ED4298-EE6A-443D-A465-35053E9B4581"),
                Name = "Mimir RDF"
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
            throw new NotImplementedException();
        }

        public Task<ProjectAm> DeserializeProjectAm(byte[] data)
        {
            var valueAsString = Encoding.UTF8.GetString(data, 0, data.Length);

            var rdf = new RdfDeconstructor(_mapper);
            rdf.MakeProject(valueAsString);

            return Task.FromResult(rdf.Project);
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