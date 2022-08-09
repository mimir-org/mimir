using Mb.Data.Contracts;
using Mb.Data.Repositories;
using Mb.Models.Common;
using Microsoft.Extensions.Options;
using ModelBuilder.Setup;
using ModelBuilder.Setup.Fixtures;

namespace ModelBuilder.Unit.Tests.Repositories
{
    public class CommonRepositoryTests : UnitTest<ModelBuilderCommonFixtures>
    {
        private readonly ICommonRepository _commonRepository;

        public CommonRepositoryTests(ModelBuilderCommonFixtures fixture) : base(fixture)
        {
            _commonRepository = new CommonRepository(fixture.CompanyRepository.Object, Options.Create(fixture.ApplicationSetting));
        }

        [Theory]
        [InlineData(null, false)]
        [InlineData("EE73A40C-CB90-4183-8126-A1AFB01CA3A9", false)]
        [InlineData("EE73A40C-CB90-4183-8126-A1AFB01CA3A9_", false)]
        [InlineData("_EE73A40C-CB90-4183-8126-A1AFB01CA3A9", false)]
        [InlineData("xxx_yyy", true)]
        [InlineData("xxx_yyy_zzz", false)]
        public void HasValidId_Evaluate_Correct(string id, bool expected)
        {
            var isValid = _commonRepository.HasValidId(id);
            Assert.Equal(expected, isValid);
        }

        [Theory]
        [InlineData("runir.net_EE73A40C-CB90-4183-8126-A1AFB01CA3A9", "https://rdf.runir.net/IDEE73A40C-CB90-4183-8126-A1AFB01CA3A9", "runir.net_EE73A40C-CB90-4183-8126-A1AFB01CA3A9", "https://rdf.runir.net/IDEE73A40C-CB90-4183-8126-A1AFB01CA3A9")]
        [InlineData("", "https://rdf.runir.net/IDEE73A40C-CB90-4183-8126-A1AFB01CA3A9", "runir.net_EE73A40C-CB90-4183-8126-A1AFB01CA3A9", "https://rdf.runir.net/IDEE73A40C-CB90-4183-8126-A1AFB01CA3A9")]
        [InlineData("runir.net_EE73A40C-CB90-4183-8126-A1AFB01CA3A9", "", "runir.net_EE73A40C-CB90-4183-8126-A1AFB01CA3A9", "https://rdf.runir.net/IDEE73A40C-CB90-4183-8126-A1AFB01CA3A9")]
        public void CreateOrUseIdAndIri_Returns_Correct_Ids(string fromId, string fromIri, string expectedId, string expectedIri)
        {
            var replacement = new ReplacementId { FromId = fromId, FromIri = fromIri };
            var replacement2 = _commonRepository.CreateOrUseIdAndIri(replacement);
            Assert.Equal(expectedId, replacement2.ToId);
            Assert.Equal(expectedIri, replacement2.ToIri);
        }

        [Theory]
        [InlineData("runir.net_EE73A40C-CB90-4183-8126-A1AFB01CA3A9", "https://rdf.runir.net/ID123456", "runir.net_EE73A40C-CB90-4183-8126-A1AFB01CA3A9", "https://rdf.runir.net/IDEE73A40C-CB90-4183-8126-A1AFB01CA3A9")]
        [InlineData("runir.net_123", "https://rdf.runir.net/ID123456", "runir.net_123", "https://rdf.runir.net/ID123")]
        public void CreateOrUseIdAndIri_Id_Before_Uri(string fromId, string fromIri, string expectedId, string expectedIri)
        {
            var replacement = new ReplacementId { FromId = fromId, FromIri = fromIri };
            var replacement2 = _commonRepository.CreateOrUseIdAndIri(replacement);
            Assert.Equal(expectedId, replacement2.ToId);
            Assert.Equal(expectedIri, replacement2.ToIri);
        }

        [Theory]
        [InlineData(null, "https://rdf.hansa.no/IDasdefrg")]
        [InlineData("", "https://rdf.hansa.no/IDasdefrg")]
        [InlineData("xxx", "https://rdf.hansa.no/IDasdefrg")]
        public void CreateOrUseIdAndIri_Creates_Ok_From_External_Data(string fromId, string fromIri)
        {
            var replacement = new ReplacementId { FromId = fromId, FromIri = fromIri };
            var replacement2 = _commonRepository.CreateOrUseIdAndIri(replacement);

            // Check if id has format xxx_xxx
            var segments = replacement2.ToId.Split('_', StringSplitOptions.RemoveEmptyEntries);
            Assert.True(segments.Length == 2);
            Assert.Contains(segments[1], replacement2.ToIri);

            // Check if iri is well formatted
            var iriFormattedOk = _commonRepository.HasValidIri(replacement2.ToIri);
            Assert.True(iriFormattedOk);

            // Domain is correct
            Assert.Equal("hansa.no", segments[0]);
        }

        [Fact]
        public void CreateOrUseIdAndIri_Throws_NullReferenceException_When_Null_Object_Parameter()
        {
            Assert.Throws<NullReferenceException>(() => _commonRepository.CreateOrUseIdAndIri(null));
        }

        
    }
}
