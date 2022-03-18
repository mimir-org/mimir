using System;
using System.IO;
using System.Linq;
using JsonLdParser;
using VDS.RDF;
using VDS.RDF.Writing;
using Xunit;

namespace ModelBuilder.Tests.Modules;
public class TestJsonLdWriter
{
    [Fact]
    public void TestWrite()
    {
        using var reader = new StreamReader("Data/testproject.jsonld");
        string json_text = reader.ReadToEnd();
        IGraph g1 = ParserModule.LoadGraph(json_text);
        
        Assert.NotNull(g1);
        var writer = new ImfJsonLdWriter();
        var jsonLdString = VDS.RDF.Writing.StringWriter.Write(g1, writer);
        
        using (var streamWriter = new StreamWriter("Data/pumpout.jsonld"))
        {
            streamWriter.Write(jsonLdString);
        }
        using var reader2 = new StreamReader("Data/pumpout.jsonld");
        string json_text2 = reader.ReadToEnd();
        IGraph g2 = ParserModule.LoadGraph(json_text);

        var type = g2.CreateUriNode("rdf:type");
        var fsb = g2.CreateUriNode(new Uri("http://ns.imfid.org/imf#FunctionalSystemBlock"));
        var topNodes = g2.GetTriplesWithPredicateObject(type, fsb).Select(t => t.Subject).ToList();
        var wrongNode = g2.GetUriNode(new Uri("https://rdf.equinor.com/ID043f6dba-0d0e-48c6-a439-a42f228d80bb"));
        Assert.DoesNotContain(wrongNode, topNodes);

        var transport_class = g2.CreateUriNode(new Uri("http://ns.imfid.org/imf#Transport"));
        var transports = g2.GetTriplesWithPredicateObject(type, transport_class).Select(t => t.Subject).ToList();
        Assert.Single(transports);

    }




}
