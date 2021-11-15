using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Data;
using Microsoft.Extensions.DependencyInjection;
using ModelBuilder.Fixtures;
using Xunit;

namespace ModelBuilder.Models.Tests
{
    public class ProjectTest : WebTestFixture<TestStartup>
    {
        [Theory]
        [InlineData(null, @"https://rdf.equinor.com/sor/mimir#/ID#0b805fa8-1daa-4871-ac51-832607d52bbe", "equinor.com")]
        public void Iri_Domain_Generates_Correct_Id(string id, string iri, string domain)
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
            Assert.Equal("https://rdf.equinor.com/sor/mimir#/ID#0b805fa8-1daa-4871-ac51-832607d52bbe", project.Iri);
            Assert.Equal(project.Id, id);
        }

        [Theory]
        [InlineData("equinor.com_0b805fa8-1daa-4871-ac51-832607d52bbe", "Not correct", "Not correct")]
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
            Assert.Equal(iri, project.Iri);
            Assert.Equal(id, project.Id);
        }
    }
}
