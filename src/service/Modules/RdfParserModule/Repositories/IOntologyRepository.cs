using System.Collections.Generic;
using Mb.Models.Attributes;
using VDS.RDF;

namespace RdfParserModule.Repositories
{
    [Scope]
    public interface IOntologyRepository
    {
        IGraph Graph { get; }
        Dictionary<string, string> Namespaces { get; }
        string BuildIri(string prefix, string suffix, string midFix = "");
    }
}