using JsonLdParser;

namespace ModelBuilder.Unit.Tests.Modules;
public class TestJsonLdWriter
{
    [Fact]
    public void TestWrite()
    {
        using var reader = new StreamReader("Data/testproject.jsonld");
        var json_text = reader.ReadToEnd();
        var g1 = ParserModule.LoadGraph(json_text);

        Assert.NotNull(g1);
        var writer = new ImfJsonLdWriter();
        var jsonLdString = VDS.RDF.Writing.StringWriter.Write(g1, writer);

        using var streamWriter = new StreamWriter("Data/pumpout.jsonld");
        streamWriter.Write(jsonLdString);
        streamWriter.Flush();
        streamWriter.Dispose();

        using var reader2 = new StreamReader("Data/pumpout.jsonld");
        var json_text2 = reader.ReadToEnd();
        var g2 = ParserModule.LoadGraph(json_text);

        var type = g2.CreateUriNode("rdf:type");
        var fsb = g2.CreateUriNode(new Uri("http://ns.imfid.org/imf#FunctionalSystemBlock"));
        var topNodes = g2.GetTriplesWithPredicateObject(type, fsb).Select(t => t.Subject).ToList();
        var wrongNode = g2.GetUriNode(new Uri("https://rdf.equinor.com/ID043f6dba-0d0e-48c6-a439-a42f228d80bb"));
        Assert.DoesNotContain(wrongNode, topNodes);
    }
}