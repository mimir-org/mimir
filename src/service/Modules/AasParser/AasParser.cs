using System;
using System.Threading.Tasks;
using Mb.Models.Data;
using Mb.Models.Modules;

namespace AasParserModule
{
    public class AasParser : IModelBuilderParser
    {
        public string GetName()
        {
            return "AasParser";
        }

        public Task<byte[]> SerializeProject(Project project)
        {
            throw new NotImplementedException();
        }

        public Task<Project> DeserializeProject(byte[] data)
        {
            throw new NotImplementedException();
        }
    }
}
