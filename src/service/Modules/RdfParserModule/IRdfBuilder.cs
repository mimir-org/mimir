using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VDS.RDF;

namespace RdfParserModule
{
    public interface IRdfBuilder
    {
        IGraph BuildProject();

        string RdfToString(IGraph g);

        byte[] GetBytes(IGraph g);
        
    }
}
