using System.IO;
using System.Reflection;
using Newtonsoft.Json.Linq;
using VDS.RDF;
using VDS.RDF.JsonLd;

namespace JsonLdParserModule
{

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
            var filePath = $"{Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)}/Data/imfframe.jsonld";
            Frame = JObject.Parse(File.ReadAllText(filePath));

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



        public class IMFFrame
        {
            public Context @context { get; set; }
            public string[] @type { get; set; }
            public Property hasChild { get; set; }
            public Property hasParent { get; set; }
            public Property hasAspectModel { get; set; }
            public Property isAspectOf { get; set; }
            public Property fulfilledBy { get; set; }
            public Property installedAs { get; set; }
        }



        public class JsonLdInverseProperty
        {
            public JsonLdInverseProperty(string property)
            {
                @reverse = property;
            }
            public string @reverse { get; set; }
        }
        public class Context
        {
            public Context()
            {
                @vocab = "http://ns.imfid.org/imf#";
                lis = "http://standards.iso.org/iso/15926/part14/";
                eqn = "https://rdf.equinor.com/";
                mimir = "http://ns.imfid.org/mimir#";
                commonlib = "https://commonlibrary.equinor.com/";
                //hasAspectModel = JsonLdInverseProperty("isAspectOf");
                @version = "1.1";
            }
            public string @vocab { get; set; }
            public string lis { get; set; }
            public string imf { get; set; }
            public string mimir { get; set; }
            public string commonlib { get; set; }
            public string eqn { get; set; }
            public JsonLdInverseProperty hasAspectModel { get; set; }
            public string @version { get; set; }
        }


        public class Property
        {
            public Property()
            {
                @embed = "@never";
            }
            public string @embed { get; set; }
        }

    }
}