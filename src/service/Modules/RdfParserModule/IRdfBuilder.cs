using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mb.Models.Attributes;
using Mb.Models.Data;
using VDS.RDF;

namespace RdfParserModule
{
    public interface IRdfBuilder
    {
        void BuildProject(Project project);
        byte[] GetBytes<T>() where T : IRdfWriter, new();
    }
}
