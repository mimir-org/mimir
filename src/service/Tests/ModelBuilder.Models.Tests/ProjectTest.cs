using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Const;
using Mb.Models.Data;
using Mb.Models.Extensions;
using Microsoft.Extensions.DependencyInjection;
using ModelBuilder.Fixtures;
using Xunit;

namespace ModelBuilder.Models.Tests
{
    public class ProjectTest : WebTestFixture<TestStartup>
    {
        [Theory]
        [InlineData(null, "equinor.com")]
        public void Iri_Domain_Generates_Correct_Id(string id, string domain)
        {
            var iri = $"{GlobalSettings.IriMimirPrefix}0b805fa8-1daa-4871-ac51-832607d52bbe";
            var mapper = ServiceProvider.GetService<IMapper>();
            Assert.NotNull(mapper);

            var projectAm = new ProjectAm
            {
                Id = id,
                Iri = iri,
                Domain = domain
            };

            var project = mapper.Map<Project>(projectAm);
            Assert.Equal(project.Domain, domain);
            Assert.Equal(project.Iri, iri);
            Assert.Equal(project.Id, $"{domain}_0b805fa8-1daa-4871-ac51-832607d52bbe");
        }

        [Theory]
        [InlineData("equinor.com_0b805fa8-1daa-4871-ac51-832607d52bbe", null, null)]
        public void Id_Generates_Correct_Domain_Iri(string id, string iri, string domain)
        {
            var mapper = ServiceProvider.GetService<IMapper>();
            Assert.NotNull(mapper);

            var projectAm = new ProjectAm
            {
                Id = id,
                Iri = iri,
                Domain = domain
            };

            var project = mapper.Map<Project>(projectAm);
            Assert.Equal("equinor.com", project.Domain);
            Assert.Equal("https://rdf.equinor.com/sor/mimir/ID0b805fa8-1daa-4871-ac51-832607d52bbe", project.Iri);
            Assert.Equal(project.Id, id);
        }

        [Theory]
        [InlineData("invalidDomain_0b805fa8-1daa-4871-ac51-832607d52bbe", "invalidIri", "invalidDomain")]
        public void All_Props_Should_Be_Written(string id, string iri, string domain)
        {
            var mapper = ServiceProvider.GetService<IMapper>();
            Assert.NotNull(mapper);

            var projectAm = new ProjectAm
            {
                Id = id,
                Iri = iri,
                Domain = domain
            };

            var project = mapper.Map<Project>(projectAm);
            Assert.Equal(domain, project.Domain);
            Assert.True(project.Id.HasValidIri(project.Iri));
            Assert.Equal(id, project.Id);
        }

        [Theory]
        [InlineData("invalidDomain_0b805fa8-1daa-4871-id51-832607d52bbe")]
        public void Has_Valid_Iri_Correct_With_Id_As_Guid(string id)
        {
            var iri = $"{GlobalSettings.IriMimirPrefix}0b805fa8-1daa-4871-id51-832607d52bbe";
            Assert.True(id.HasValidIri(iri));
        }

        [Theory]
        [InlineData("invalidDomain_0b805fa8-1daa-4871-id51-832607d52bbe", "invalidDomain")]
        public void Resolve_Id_Resolve_Correct(string id, string domain)
        {
            var iri = $"{GlobalSettings.IriMimirPrefix}0b805fa8-1daa-4871-id51-832607d52bbe";
            var generatedId = iri.ResolveIdFromIriAndDomain(domain);
            Assert.Equal(id, generatedId);
        }
    }
}
