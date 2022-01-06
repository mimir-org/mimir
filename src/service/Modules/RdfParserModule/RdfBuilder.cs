using System.Linq;
using System.Text;
using Mb.Data.Contracts;
using Mb.Models.Data;
using RdfParserModule.Extensions;
using RdfParserModule.Services;
using VDS.RDF;
using StringWriter = VDS.RDF.Writing.StringWriter;


namespace RdfParserModule
{
    public class RdfBuilder : IRdfBuilder
    {
        private readonly ILibRepository _libRepository;
        private readonly IOntologyService _ontologyService;

        public RdfBuilder(IOntologyService ontologyService, ILibRepository libRepository)
        {
            _ontologyService = ontologyService;
            _libRepository = libRepository;
        }

        public void BuildProject(Project project)
        {
            project.AssertGraph(_ontologyService);
            BuildNodes(project);
            BuildEdges(project);
        }

        private void BuildNodes(Project project)
        {
            if (project.Nodes == null || !project.Nodes.Any()) 
                return;
            
            foreach (var node in project.Nodes)
            {
                node.AssertNode(project, _ontologyService, _libRepository);

                if (node.Attributes != null && node.Attributes.Any())
                {
                    foreach (var attribute in node.Attributes)
                    {
                        attribute.AssertAttribute(node.Iri, _ontologyService);
                        attribute.AssertAttributeValue(_ontologyService, _libRepository);
                    }
                }

                if (node.Connectors != null && node.Connectors.Any())
                {
                    foreach (var connector in node.Connectors)
                    {
                        connector.AssertConnector(_ontologyService, _libRepository);
                    }
                }
            }
        }

        private void BuildEdges(Project project)
        {
            if (project.Edges == null || !project.Edges.Any()) 
                return;
            
            foreach (var edge in project.Edges)
            {
                edge.AssertEdge(_ontologyService);
                
                if (edge.Transport?.Attributes != null && edge.Transport.Attributes.Any())
                {
                    foreach (var attribute in edge.Transport.Attributes)
                    {
                        attribute.AssertAttribute(edge.Transport.Iri, _ontologyService);
                        attribute.AssertAttributeValue(_ontologyService, _libRepository);
                    }
                }

                if (edge.Interface?.Attributes != null && edge.Interface.Attributes.Any())
                {
                    foreach (var attribute in edge.Interface.Attributes)
                    {
                        attribute.AssertAttribute(edge.Interface.Iri, _ontologyService);
                        attribute.AssertAttributeValue(_ontologyService, _libRepository);
                    }
                }
            }
        }

        public string RdfToString<T>() where T : IRdfWriter, new()
        {
            var writer = new T();
            return StringWriter.Write(_ontologyService.GetGraph(), writer);
        }

        public byte[] GetBytes<T>() where T : IRdfWriter, new()
        {
            var graphString = RdfToString<T>();
            var bytes = Encoding.UTF8.GetBytes(graphString);
            return bytes;
        }
    }
}

