using Mb.Models.Attributes;
using Mb.Models.Data;
using VDS.RDF;

namespace RdfParserModule
{
    [Transient]
    public interface IRdfBuilder
    {
        void BuildProject(Project project);
        byte[] GetBytes<T>() where T : IRdfWriter, new();
    }
}
