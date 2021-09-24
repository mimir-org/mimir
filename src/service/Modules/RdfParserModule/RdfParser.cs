using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Modules;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Mb.Models.Application.Validation;
using Mb.Models.Enums;
using Microsoft.VisualBasic;
using Newtonsoft.Json;
using System.Collections.ObjectModel;

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
            // RdfBuilder builder = new RdfBuilder(project);
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
            var valueAsString = Encoding.UTF8.GetString(data, 0, data.Length);

            var graph = RdfDeconstructor.LoadGraph(valueAsString);
            var project = RdfDeconstructor.ExampleProject(graph);

            return Task.FromResult(project);
        }

        public FileFormat GetFileFormat()
        {
            return FileFormat.NTriples;
        }
    }
}
