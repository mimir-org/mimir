using ModelBuilder.Rdf.Extensions;
using ModelBuilder.Setup;
using ModelBuilder.Setup.Fixtures;

namespace ModelBuilder.Unit.Tests.Extensions;

public class StringExtensionTests : UnitTest<ModelBuilderCommonFixtures>
{
    public StringExtensionTests(ModelBuilderCommonFixtures fixture) : base(fixture)
    {
    }

    [Theory]
    [InlineData(@"https://rdf.runir.com/raw/mimir/")]
    [InlineData(@"https://rdf.runir.com")]
    [InlineData(@"http://rdf.runir.com")]
    [InlineData(@"https://runir.com")]
    public void Find_Domain_From_Iri_Returns_Ok(string iri)
    {
        var domain = iri.FindDomain();
        Assert.Equal("runir.com", domain);
    }

    [Theory]
    [InlineData(@"https://rdf .runir. com /raw/mimir/")]
    [InlineData(@"rdf.runir.com/raw/mimir/")]
    [InlineData(@"https://runir")]
    public void Find_Domain_From_Iri_Throws_Exception_On_Bad_Iri(string iri)
    {
        Assert.Throws<ArgumentException>(iri.FindDomain);
    }

    [Theory]
    [InlineData(@"https://rdf.runir.com/raw/mimir/")]
    [InlineData(@"https://rdf.runir.com/mimir#discipline")]
    public void Strip_Iri_Returns_Ok(string iri)
    {
        var rootUri = iri.StripIri();
        Assert.Equal(@"https://rdf.runir.com", rootUri);
    }

    [Theory]
    [InlineData(@"https://rdf .runir. com /raw/mimir/")]
    [InlineData(@"rdf.runir.com/raw/mimir/")]
    public void Strip_Iri_Throws_Exception_On_Bad_Iri(string iri)
    {
        Assert.Throws<ArgumentException>(iri.StripIri);
    }
}