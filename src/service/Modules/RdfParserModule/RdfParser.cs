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
            var graph = RdfBuilder.BuildProject(project);
            var bytes = RdfBuilder.GetBytes(graph);

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
