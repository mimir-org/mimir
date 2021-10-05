﻿using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Modules;
using System;
using System.Text;
using System.Threading.Tasks;
using VDS.RDF.Writing;

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
            return FileFormat.NTriples;
        }
    }
}
