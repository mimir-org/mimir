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
using VDS.RDF.Writing;

namespace RdfParserModule
{
    public class RdfParser : IModelBuilderParser
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
            return new ModuleDescription
            {
                Id = new Guid("59ED4298-EE6A-443D-A465-35053E9B4581"),
                Name = "Mimir RDF"
            };
        }

        public Task<byte[]> SerializeProject(Project project)
        {
            var builder = new RdfBuilder();
            builder.BuildProject(project);

            var bytes = builder.GetBytes<NTriplesWriter>();

            return Task.FromResult(bytes);
        }

        public Task<Project> DeserializeProject(byte[] data)
        {
            throw new NotImplementedException();
        }

        public Task<ProjectAm> DeserializeProjectAm(byte[] data)
        {
            var valueAsString = Encoding.UTF8.GetString(data, 0, data.Length);

            var rdf = new RdfDeconstructor();
            rdf.LoadGraph(valueAsString);
            rdf.MakeProject();

            return Task.FromResult(rdf.Project);
        }

        public FileFormat GetFileFormat()
        {
            return new()
            {
                ContentType = @"application/n-triples",
                FileExtension = "nt"
            };
        }
    }
}
