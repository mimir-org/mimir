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
        var reader = new StreamReader("Data/miniproject.jsonld");
        var parser = new VDS.RDF.Parsing.JsonLdParser();
        var store = new TripleStore();

        parser.Load(store, reader);

        if (store.Graphs.Count != 1)
            throw new Exception("Input JSON contained more than one graph, this is an error");

        var g1 = store.Graphs.First();
        Assert.NotNull(g1);
        var writer = new ImfJsonLdWriter();
        var jsonLdString = VDS.RDF.Writing.StringWriter.Write(g1, writer);
        
        using (var streamWriter = new StreamWriter("Data/pumpout.jsonld"))
        {
            streamWriter.Write(jsonLdString);
        }

    }

    [Fact]
    public void TestRead()
    {
        var reader = new StreamReader("Data/miniproject.jsonld");
        var parser = new VDS.RDF.Parsing.JsonLdParser();
        var store = new TripleStore();
        
        parser.Load(store, reader);

        if (store.Graphs.Count != 1)
            throw new Exception("Input JSON contained more than one graph, this is an error");
        
        var g1 = store.Graphs.First();
        Assert.NotNull(g1);
        var nWriter = new NTriplesWriter();
        nWriter.Save(g1, "Data/pumpout.nt");
    }


    [Fact]
    public void TestGetFsBs()
    {
        var reader = new StreamReader("Data/miniproject.jsonld");
        var parser = new VDS.RDF.Parsing.JsonLdParser();
        var store = new TripleStore();

        parser.Load(store, reader);

        Assert.Equal(1, store.Graphs.Count);
        var mel = store.Graphs.First();
        Assert.NotNull(mel);

        var type = mel.CreateUriNode("rdf:type");
        var fsb = mel.CreateUriNode(new Uri("http://example.com/imf¤FunctionalSystemBlock"));
        var topNodes = mel.GetTriplesWithPredicateObject(type, fsb).Select(t => t.Subject).ToList();
        var wrongNode = mel.GetUriNode(new Uri("https://rdf.equinor.com/ID043f6dba-0d0e-48c6-a439-a42f228d80bb"));
        Assert.DoesNotContain(wrongNode, topNodes);
    }
}
