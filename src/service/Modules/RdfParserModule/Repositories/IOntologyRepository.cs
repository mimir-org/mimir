using System;
using Mb.Models.Attributes;
using VDS.RDF;

namespace RdfParserModule.Repositories
{
    [Scope]
    public interface IOntologyRepository
    {
        IGraph Graph { get; }
        TripleStore Store { get; }
        Uri BuildUri(string value);
        void LoadData(string data);
    }
}