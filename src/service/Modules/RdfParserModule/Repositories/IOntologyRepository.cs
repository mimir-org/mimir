using System.Collections.Generic;
using System.Drawing;
using Mb.Models.Attributes;
using VDS.RDF;

namespace RdfParserModule.Repositories
{
    [Transient]
    public interface IOntologyRepository
    {
        IGraph Graph { get; }
        Dictionary<string, string> Namespaces { get; }
        string BuildIri(string prefix, string suffix, string midfix = "");
    }
}
