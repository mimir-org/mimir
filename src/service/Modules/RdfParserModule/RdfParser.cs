using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Modules;
using System;
using System.Threading.Tasks;


namespace RdfParserModule
{
    public class RdfParser : IModelBuilderParser
    {
        public string GetName()
        {
            return "rdfparser";
        }

        public Task<byte[]> SerializeProject(Project project)
        {
            RdfBuilder builder = new RdfBuilder(project);
            var graph = builder.BuildProject();
            var bytes = builder.GetBytes(graph);

            return Task.FromResult(bytes);
        }

        public Task<Project> DeserializeProject(byte[] data)
        {
            throw new NotImplementedException();
        }

        public Task<ProjectAm> DeserializeProjectAm(byte[] data)
        {
            throw new NotImplementedException();
        }

        public FileFormat GetFileFormat()
        {
            return FileFormat.Xml;
        }
    }
}
