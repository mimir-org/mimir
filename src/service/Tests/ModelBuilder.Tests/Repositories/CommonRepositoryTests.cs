using System;
using System.Linq;
using Mb.Models.Common;
using Xunit;

namespace ModelBuilder.Tests.Repositories
{
    public class CommonRepositoryTests : IClassFixture<ProjectFixture>
    {
        private readonly ProjectFixture _projectFixture;

        public CommonRepositoryTests(ProjectFixture projectFixture)
        {
            _projectFixture = projectFixture;
        }

        [Fact]
        public void CreateId_Returns_Correct_Id_Format()
        {
            var id = _projectFixture.CommonRepository.CreateId();
            var current = _projectFixture.CollaborationPartnerRepository.GetAll().FirstOrDefault(x => x.Current);
            Assert.NotNull(current);

            // Check if id has format xxx_xxx
            var segments = id.Split('_', StringSplitOptions.RemoveEmptyEntries);
            Assert.True(segments.Length == 2);

            // Check if guid is ok
            var isValid = Guid.TryParse(segments[1], out _);
            Assert.True(isValid);

            // Check first element is correct domain
            Assert.Equal(current.Domain, segments[0]);
        }

        [Fact]
        public void GetDomain_Returns_Correct_Domain()
        {
            var current = _projectFixture.CollaborationPartnerRepository.GetAll().FirstOrDefault(x => x.Current);
            Assert.NotNull(current);
            Assert.Equal("equinor.com", current.Domain);
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
            var isValid = _projectFixture.CommonRepository.HasValidId(id);
            Assert.Equal(expected, isValid);
        }

        [Theory]
        [InlineData("equinor.com_EE73A40C-CB90-4183-8126-A1AFB01CA3A9", "https://rdf.equinor.com/IDEE73A40C-CB90-4183-8126-A1AFB01CA3A9", "equinor.com_EE73A40C-CB90-4183-8126-A1AFB01CA3A9", "https://rdf.equinor.com/IDEE73A40C-CB90-4183-8126-A1AFB01CA3A9")]
        [InlineData("", "https://rdf.equinor.com/IDEE73A40C-CB90-4183-8126-A1AFB01CA3A9", "equinor.com_EE73A40C-CB90-4183-8126-A1AFB01CA3A9", "https://rdf.equinor.com/IDEE73A40C-CB90-4183-8126-A1AFB01CA3A9")]
        [InlineData("equinor.com_EE73A40C-CB90-4183-8126-A1AFB01CA3A9", "", "equinor.com_EE73A40C-CB90-4183-8126-A1AFB01CA3A9", "https://rdf.equinor.com/IDEE73A40C-CB90-4183-8126-A1AFB01CA3A9")]
        [InlineData("aibel.com_EE73A40C-CB90-4183-8126-A1AFB01CA3A9", "", "aibel.com_EE73A40C-CB90-4183-8126-A1AFB01CA3A9", "https://rdf.aibel.com/IDEE73A40C-CB90-4183-8126-A1AFB01CA3A9")]
        public void CreateOrUseIdAndIri_Returns_Correct_Ids(string fromId, string fromIri, string expectedId, string expectedIri)
        {
            var replacement = new ReplacementId { FromId = fromId, FromIri = fromIri };
            var replacement2 = _projectFixture.CommonRepository.CreateOrUseIdAndIri(replacement);
            Assert.Equal(expectedId, replacement2.ToId);
            Assert.Equal(expectedIri, replacement2.ToIri);
        }

        [Theory]
        [InlineData("equinor.com_EE73A40C-CB90-4183-8126-A1AFB01CA3A9", "https://rdf.equinor.com/ID123456", "equinor.com_EE73A40C-CB90-4183-8126-A1AFB01CA3A9", "https://rdf.equinor.com/IDEE73A40C-CB90-4183-8126-A1AFB01CA3A9")]
        [InlineData("equinor.com_123", "https://rdf.equinor.com/ID123456", "equinor.com_123", "https://rdf.equinor.com/ID123")]
        public void CreateOrUseIdAndIri_Id_Before_Uri(string fromId, string fromIri, string expectedId, string expectedIri)
        {
            var replacement = new ReplacementId { FromId = fromId, FromIri = fromIri };
            var replacement2 = _projectFixture.CommonRepository.CreateOrUseIdAndIri(replacement);
            Assert.Equal(expectedId, replacement2.ToId);
            Assert.Equal(expectedIri, replacement2.ToIri);
        }

        [Theory]
        [InlineData(null, null)]
        [InlineData("", "")]
        [InlineData("xxx", "yyy")]
        public void CreateOrUseIdAndIri_Creates_Ok_From_Bad_Data(string fromId, string fromIri)
        {
            var replacement = new ReplacementId { FromId = fromId, FromIri = fromIri };
            var replacement2 = _projectFixture.CommonRepository.CreateOrUseIdAndIri(replacement);

            // Check if id has format xxx_xxx
            var segments = replacement2.ToId.Split('_', StringSplitOptions.RemoveEmptyEntries);
            Assert.True(segments.Length == 2);
            Assert.Contains(segments[1], replacement2.ToIri);

            // Check if iri is well formatted
            var iriFormattedOk = _projectFixture.CommonRepository.HasValidIri(replacement2.ToIri);
            Assert.True(iriFormattedOk);
            Assert.Contains("/ID", replacement2.ToIri);

            // Check if guid is ok
            var isValid = Guid.TryParse(segments[1], out _);
            Assert.True(isValid);

            // Check first element is correct domain
            var current = _projectFixture.CollaborationPartnerRepository.GetAll().FirstOrDefault(x => x.Current);
            Assert.NotNull(current);
            Assert.Equal(current.Domain, segments[0]);
        }

        [Theory]
        [InlineData(null, "https://hansa.no/asdefrg")]
        [InlineData("", "https://hansa.no/asdefrg")]
        [InlineData("xxx", "https://hansa.no/asdefrg")]
        public void CreateOrUseIdAndIri_Creates_Ok_From_External_Data(string fromId, string fromIri)
        {
            var replacement = new ReplacementId { FromId = fromId, FromIri = fromIri };
            var replacement2 = _projectFixture.CommonRepository.CreateOrUseIdAndIri(replacement);

            // Check if id has format xxx_xxx
            var segments = replacement2.ToId.Split('_', StringSplitOptions.RemoveEmptyEntries);
            Assert.True(segments.Length == 2);
            Assert.Contains(segments[1], replacement2.ToIri);

            // Check if iri is well formatted
            var iriFormattedOk = _projectFixture.CommonRepository.HasValidIri(replacement2.ToIri);
            Assert.True(iriFormattedOk);

            // Domain is correct
            Assert.Equal("hansa.no", segments[0]);
        }

        [Fact]
        public void CreateOrUseIdAndIri_Throws_NullReferenceException_When_Null_Object_Parameter()
        {
            Assert.Throws<NullReferenceException>(() => _projectFixture.CommonRepository.CreateOrUseIdAndIri(null));
        }
    }
}