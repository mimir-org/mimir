using Mb.Models.Application;
using Mb.Models.Data;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Models.Abstract;
using Mb.Models.Enums;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using VDS.RDF.JsonLd.Processors;
using VDS.RDF.Writing;

namespace RdfParserModule
{
    public class RdfParser : IModelBuilderParser
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
            return new List<Profile> { new RdfProfile() };
        }

        public string GetName()
        {
            return "rdfparser";
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

            var rdf = new RdfDeconstructor(_mapper);
            rdf.MakeProject(valueAsString);

            return Task.FromResult(rdf.Project);

            //return Task.FromResult(Hardcoded());
        }

        public FileFormat GetFileFormat()
        {
            return new()
            {
                ContentType = @"application/n-triples",
                FileExtension = "nt"
            };
        }

        private ProjectAm Hardcoded()
        {
            
            var p = new ProjectAm
            {
                Id = "rdf_E0E76657-8991-47AF-9CEF-EC80BAB68444",
                Name = "Små 3",
                IsSubProject = true,
                Version = "0.0",
                Nodes = new List<NodeAm>(),
                Edges = new List<EdgeAm>()
            };

            var n = new NodeAm
            {
                Id = "rdf_D8E2978A-A492-43A1-9D31-7E06747407C1",
                Name = "A",
                Version = "0.0",
                Label = "Node A",
                IsLocked = false,
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                MasterProjectId = p.Id,
                Aspect = Aspect.Function,
                IsRoot = false,
                Connectors = new List<ConnectorAm>()
            };

            var c = new ConnectorAm
            {
                Id = "rdf_9BE681C5-50B2-4224-8251-4A08D8ED60E5",
                Name = "Connector a",
                Type = ConnectorType.Input,
                Visible = true,
                NodeId = n.Id
            };

            n.Connectors.Add(c);
            p.Nodes.Add(n);

            return p;
        }
    }
}
