using Mb.Data.Repositories;
using Mb.Models.Application;
using Mb.Models.Common;
using Mb.Services.Contracts;
using Mb.Services.Services;
using Microsoft.Extensions.Options;
using ModelBuilder.Setup;
using ModelBuilder.Setup.Fixtures;
// ReSharper disable StringLiteralTypo

namespace ModelBuilder.Unit.Tests.Services;

public class RemapServiceTests : UnitTest<ModelBuilderCommonFixtures>
{
    private readonly IRemapService _remapService;

    public RemapServiceTests(ModelBuilderCommonFixtures fixture) : base(fixture)
    {
        var commonRepository = new CommonRepository(fixture.CompanyRepository.Object, Options.Create(fixture.ApplicationSetting), fixture.HttpContextAccessor.Object);
        _remapService = new RemapService(commonRepository);
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

    [Fact(Skip = "Must be rewritten after big refactoring of backend")]
    public void RemapBlocks_Block_Project_Mapping_Ok()
    {
        // Project replacement
        var projectReplacement = new ReplacementId
        {
            FromId = "runir.net_1234",
            ToId = "runir.net_5678",
            FromIri = "https://rdf.runir.net/ID1234",
            ToIri = "https://rdf.runir.net/ID5678"
        };

        // block data
        var blocks = new List<BlockAm>
        {
            new()
            {
                Id = "aaa",
                Project = "runir.net_1234",
                Name = "Dummy A",
                Description = "Description",
                MainProject = "runir.net_5678"
            },
            new()
            {
                Id = "bbb",
                Project = "runir.net_1234",
                Name = "Dummy B",
                Description = "Description",
                MainProject = "runir.net_5678"
            }
        };

        var remap = new Dictionary<string, string>();
        var mappedBlocks = _remapService.RemapBlocks(projectReplacement, blocks, null, remap, false).ToList();

        foreach (var testBlock in mappedBlocks)
        {

            Assert.NotNull(testBlock);
            Assert.Equal("https://rdf.runir.net/ID5678", testBlock.Project);
            Assert.Equal("https://rdf.runir.net/ID5678", testBlock.MainProject);

            var nodeIdSplit = testBlock.Id.Split('_', StringSplitOptions.RemoveEmptyEntries);
            Assert.Equal(2, nodeIdSplit.Length);
        }
    }
}