using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Modules;
using System;
using System.Threading.Tasks;

namespace RdfParserModule
{
    public class RdfParser : IModelBuilderParser
    {
        public Task<Project> DeserializeProject(byte[] data)
        {
            throw new NotImplementedException();
        }

        public Task<ProjectAm> DeserializeProjectAm(byte[] data)
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "RDF Parser";
        }

        public Task<byte[]> SerializeProject(Project project)
        {
            throw new NotImplementedException();
        }
    }
}
