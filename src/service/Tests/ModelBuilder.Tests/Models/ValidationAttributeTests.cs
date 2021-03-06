using Mb.Models.Attributes;
using Mb.Models.Extensions;
using Xunit;

namespace ModelBuilder.Tests.Models
{
    public class ValidationAttributeTests
    {
        [Theory]
        [InlineData("https://rdf.equinor.com/ID1234", true)]
        [InlineData("https://rdf.equinor.com/", false)]
        [InlineData(null, true)]
        [InlineData("", true)]
        [InlineData("https://rdf.equinor.com/ID1234/123/123", true)]
        [InlineData("rdf.equinor.com/ID1234", false)]
        [InlineData("/ID1234/dummy/1234", false)]
        public void Iri_Attribute_Validates_Correctly(string value, bool result)
        {
            var attribute = new ValidIriAttribute();
            var isValid = attribute.IsValid(value);
            Assert.Equal(result, isValid);
        }

        [Theory]
        [InlineData("1234", "1234", true)]
        [InlineData("", "", false)]
        [InlineData(null, null, false)]
        [InlineData("", "1234", true)]
        [InlineData(null, "1234", true)]
        [InlineData("1234", "", true)]
        [InlineData("1234", null, true)]
        public void RequiredOne_Attribute_Validates_Correctly(string value, string dependent, bool result)
        {
            var model = new RequiredOneTestValidator { Id = value, Iri = dependent };
            var validation = model.ValidateObject();
            Assert.Equal(result, validation.IsValid);
        }
    }

    internal class RequiredOneTestValidator
    {
        [RequiredOne("Iri")]
        public string Id { get; set; }

        [RequiredOne("Id")]
        public string Iri { get; set; }
    }
}