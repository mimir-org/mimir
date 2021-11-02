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

            var domain = "rdf_";
            var projectId = domain + "D9330BC5-E1D1-446E-8AAA-BB0A5D92A533";
            
            var nodeAId = domain + "C8AC4EAD-8222-4A52-A24E-EFDF7A4ADF0A";
            var nodeBId = domain + "DBE92CA0-04E2-43C7-B38E-17B665C32569";

            var nodeAOutTerminalId = domain + "837EDD55-F3FD-4754-ADEE-1048B6C799D7";
            var nodeBInTerminalId = domain + "757F2108-9804-4028-BAFF-FD990AF8E5C5";

            var transportId = domain + "A94CAB4A-052A-4E43-9E54-FBE782300D54";
            var transportInId = domain + "5E139BE6-FAD0-488D-A84E-B078DA1581F4";
            var transportOutId = domain + "3848ECF6-1C03-42C2-8525-B80962237AAC";

            var edgeId = domain + "40AF590B-0F90-4C84-9ECB-2BB4535E49DA";

            var project = new ProjectAm
            {
                Id = projectId,
                Name = "Cool story",
                IsSubProject = true,
                Version = "0.0"
            };

            var nodeA = new NodeAm
            {
                Id = nodeAId,
                Name = "Node A",
                Label = "Node A",
                Version = project.Version,
                IsLocked = false,
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                MasterProjectId = project.Id,
                Aspect = Aspect.Function,
                IsRoot = false
            };
            var nodeB = new NodeAm
            {
                Id = nodeBId,
                Name = "Node B",
                Label = "Node B",
                Version = project.Version,
                IsLocked = false,
                StatusId = "4590637F39B6BA6F39C74293BE9138DF",
                MasterProjectId = project.Id,
                Aspect = Aspect.Function,
                IsRoot = false
            };
            var termCatId = "7AF97A80D52C7CE139AE278A712C6A37";
            var termTypeId = "3BAA052FEFE1B4639950C2506361297B";

            var nodeAOutTerminal = new TerminalAm
            {
                Id = nodeAOutTerminalId,
                Name = "Node A Out",
                Type = ConnectorType.Output,
                NodeId = nodeA.Id,
                TerminalCategoryId = termCatId,
                TerminalTypeId = termTypeId
            };

            var nodeBInTerminal = new TerminalAm
            {
                Id = nodeBInTerminalId,
                Name = "Node B In",
                Type = ConnectorType.Input,
                NodeId = nodeB.Id,
                TerminalCategoryId = termCatId,
                TerminalTypeId = termTypeId
            };

            var edge = new EdgeAm
            {
                Id = edgeId,
                MasterProjectId = project.Id,
                FromConnectorId = nodeAOutTerminal.Id,
                ToConnectorId = nodeBInTerminal.Id,
                FromNodeId = nodeA.Id,
                ToNodeId = nodeB.Id
            };


            var transport = new TransportAm
            {
                Id = transportId,
                Name = "Kul transport",
                InputTerminalId = transportInId,
                OutputTerminalId = transportOutId
            };

            edge.Transport = transport;


            nodeA.Connectors = new List<ConnectorAm> { nodeAOutTerminal };
            nodeB.Connectors = new List<ConnectorAm> { nodeBInTerminal };

            project.Nodes = new List<NodeAm> { nodeA, nodeB };
            project.Edges = new List<EdgeAm> { edge };
            return project;
        }
    }
}
