using System.IO;
using Newtonsoft.Json.Linq;
using VDS.RDF;
using VDS.RDF.JsonLd;

namespace JsonLdParser;

public class ImfJsonLdWriter : IRdfWriter
{
    private JsonLdProcessorOptions Opts { get; }
    private JObject Frame { get; }
    public event RdfWriterWarning Warning;

    /// <summary>
    /// Set up for JsonLd writing using a specific frame according to JSON-LD 1.1 spec https://www.w3.org/TR/json-ld11-framing 
    /// </summary>
    public ImfJsonLdWriter()
    {
        Frame = JsonLdFrame.GetFrame();

        Opts = new JsonLdProcessorOptions
        {
            OmitDefault = true,
            ProcessingMode = VDS.RDF.JsonLd.Syntax.JsonLdProcessingMode.JsonLd11
        };
    }

    public void Save(IGraph g, string filename)
    {
        using TextWriter writer = new StreamWriter(filename);
        Save(g, writer);
    }

    public void Save(IGraph g, TextWriter output)
    {
        Save(g, output, false);
    }

    public void Save(IGraph g, TextWriter output, bool leaveOpen)
    {
        using (ITripleStore store = new TripleStore())
        {
            store.Add(g);
            var jsonArray = (new VDS.RDF.Writing.JsonLdWriter()).SerializeStore(store);
            var nested = JsonLdProcessor.Frame(jsonArray, Frame, Opts);
            output.Write(nested);
        }

        if (!leaveOpen)
            output.Close();
    }


}