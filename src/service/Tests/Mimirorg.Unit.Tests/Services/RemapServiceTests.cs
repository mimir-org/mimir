using Mb.Data.Repositories;
using Mb.Models.Application;
using Mb.Models.Common;
using Mb.Services.Contracts;
using Mb.Services.Services;
using Microsoft.Extensions.Options;
using ModelBuilder.Setup;
using ModelBuilder.Setup.Fixtures;
// ReSharper disable StringLiteralTypo

namespace ModelBuilder.Unit.Tests.Services
{
    public class RemapServiceTests : UnitTest<ModelBuilderCommonFixtures>
    {
        private readonly IRemapService _remapService;

        public RemapServiceTests(ModelBuilderCommonFixtures fixture) : base(fixture)
        {
            var commonRepository = new CommonRepository(fixture.CompanyRepository.Object, Options.Create(fixture.ApplicationSetting));
            _remapService = new RemapService(commonRepository, fixture.Mapper.Object);
        }

        [Theory]
        [InlineData("runir.net_123", "https://rdf.runir.net/ID123", "runir.net_123", "https://rdf.runir.net/ID123", "runir.net_123", "https://rdf.runir.net/ID123", "runir.net_123", "https://rdf.runir.net/ID123")]
        [InlineData("runir.net_123", "https://rdf.runir.net/ID123", "runir.net_123", "https://rdf.runir.net/ID123", "runir.net_123", null, "runir.net_123", "https://rdf.runir.net/ID123")]
        [InlineData("runir.net_123", "https://rdf.runir.net/ID123", "runir.net_123", "https://rdf.runir.net/ID123", null, "https://rdf.runir.net/ID123", "runir.net_123", "https://rdf.runir.net/ID123")]
        [InlineData("runir.net_123", "https://rdf.runir.net/ID123", "runir.net_123", "https://rdf.runir.net/ID123", null, null, "runir.net_123", "https://rdf.runir.net/ID123")]
        [InlineData("runir.net_123", "https://rdf.runir.net/ID123", "runir.net_123", "https://rdf.runir.net/ID123", "hansa.no_xxx", "https://rdf.hansa.no/IDxxx", "hansa.no_xxx", "https://rdf.hansa.no/IDxxx")]
        [InlineData("runir.net_123", "https://rdf.runir.net/ID123", "runir.net_123", "https://rdf.runir.net/ID123", null, "https://rdf.hansa.no/IDxxx", "hansa.no_xxx", "https://rdf.hansa.no/IDxxx")]
        [InlineData("runir.net_123", "https://rdf.runir.net/ID123", "runir.net_123", "https://rdf.runir.net/ID123", "hansa.no_xxx", null, "hansa.no_xxx", "https://rdf.hansa.no/IDxxx")]
        [InlineData("runir.net_567", "https://rdf.runir.net/ID567", "runir.net_123", "https://rdf.runir.net/ID123", "runir.net_567", "https://rdf.runir.net/ID567", "runir.net_123", "https://rdf.runir.net/ID123")]
        [InlineData("runir.net_567", "https://rdf.runir.net/ID567", "runir.net_123", "https://rdf.runir.net/ID123", null, "https://rdf.runir.net/ID567", "runir.net_123", "https://rdf.runir.net/ID123")]
        [InlineData("runir.net_567", "https://rdf.runir.net/ID567", "runir.net_123", "https://rdf.runir.net/ID123", "runir.net_567", null, "runir.net_123", "https://rdf.runir.net/ID123")]
        [InlineData(null, "https://rdf.runir.net/ID567", "runir.net_123", "https://rdf.runir.net/ID123", "runir.net_567", null, "runir.net_123", "https://rdf.runir.net/ID123")]
        [InlineData("runir.net_567", null, "runir.net_123", "https://rdf.runir.net/ID123", "runir.net_567", null, "runir.net_123", "https://rdf.runir.net/ID123")]
        public void ResolveMasterProject_Returns_Correct(string oldProjectId, string oldProjectIri, string projectId, string projectIri, string masterProjectId, string masterProjectIri, string expectedId, string expectedIri)
        {
            var master = _remapService.ResolveMasterProject(oldProjectId, oldProjectIri, projectId, projectIri, masterProjectId, masterProjectIri);
            Assert.Equal(expectedId, master.Id);
            Assert.Equal(expectedIri, master.Iri);
        }

        [Fact]
        public void RemapNodes_Node_Project_Mapping_Ok()
        {
            // Project replacement
            var projectReplacement = new ReplacementId
            {
                FromId = "runir.net_1234",
                ToId = "runir.net_5678",
                FromIri = "https://rdf.runir.net/ID1234",
                ToIri = "https://rdf.runir.net/ID5678"
            };

            // Node data
            var nodes = new List<NodeAm>
            {
                new()
                {
                    Id = "aaa",
                    ProjectId = "runir.net_1234",
                    Iri = "",
                    Name = "Dummy A",
                    Description = "Description",
                    MasterProjectId = "runir.net_1234",
                    MasterProjectIri = "runir.net_5678"
                },
                new()
                {
                    Id = "bbb",
                    ProjectId = "runir.net_1234",
                    Iri = "",
                    Name = "Dummy B",
                    Description = "Description",
                    MasterProjectId = "runir.net_1234",
                    MasterProjectIri = "runir.net_5678"
                }
            };

            var remap = new Dictionary<string, string>();
            var mappedNodes = _remapService.RemapNodes(projectReplacement, nodes, null, remap, false).ToList();

            foreach (var testNode in mappedNodes)
            {

                Assert.NotNull(testNode);
                Assert.Equal("https://rdf.runir.net/ID5678", testNode.ProjectIri);
                Assert.Equal("runir.net_5678", testNode.ProjectId);
                Assert.Equal("https://rdf.runir.net/ID5678", testNode.MasterProjectIri);
                Assert.Equal("runir.net_5678", testNode.MasterProjectId);

                var nodeIdSplit = testNode.Id.Split('_', StringSplitOptions.RemoveEmptyEntries);
                Assert.Equal(2, nodeIdSplit.Length);
            }
        }
    }
}