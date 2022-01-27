using System.Collections.Generic;
using System.Linq;
using Mb.Models.Common;
using Mb.Models.Const;
using Newtonsoft.Json;
using Xunit;

namespace ModelBuilder.Services.Tests
{
    public class RemapServiceTests : IClassFixture<ProjectFixture>
    {
        private readonly ProjectFixture _projectFixture;

        public RemapServiceTests(ProjectFixture projectFixture)
        {
            _projectFixture = projectFixture;
        }

        [Fact]
        public void RemapNodes_Node_Project_Mapping_Ok()
        {
            var projectReplacement = new ReplacementId
            {
                FromId = _projectFixture.ProjectA.Id, 
                ToId = _projectFixture.ProjectA.Id, 
                FromIri = _projectFixture.ProjectA.Iri, 
                ToIri = _projectFixture.ProjectA.Iri
            };
            var remap = new Dictionary<string, string>();
            _ = _projectFixture.RemapService.RemapNodes(projectReplacement, _projectFixture.ProjectA.Nodes, _projectFixture.ProjectA.Edges, remap, false);
            
            foreach (var node in _projectFixture.ProjectA.Edges)
            {
                Assert.Equal(_projectFixture.ProjectA.Id, node.ProjectId);
                Assert.Equal(_projectFixture.ProjectA.Id, node.MasterProjectId);
                Assert.Equal(_projectFixture.ProjectA.Iri, node.MasterProjectIri);
            }
        }

        [Fact]
        public void RemapNodes_Node_Edge_Mapping_All_Edges_Have_One_Connected_Terminal_Input_Output()
        {
            var projectReplacement = new ReplacementId
            {
                FromId = _projectFixture.ProjectA.Id,
                ToId = _projectFixture.ProjectA.Id,
                FromIri = _projectFixture.ProjectA.Iri,
                ToIri = _projectFixture.ProjectA.Iri
            };
            var remap = new Dictionary<string, string>();
            _ = _projectFixture.RemapService.RemapNodes(projectReplacement, _projectFixture.ProjectA.Nodes, _projectFixture.ProjectA.Edges, remap, false);
            
            foreach (var edge in _projectFixture.ProjectA.Edges)
            {
                var numberToNode = _projectFixture.ProjectA.Nodes.Count(x => x.Id == edge.ToNodeId);
                var numberFromNode = _projectFixture.ProjectA.Nodes.Count(x => x.Id == edge.FromNodeId);

                Assert.True(numberToNode == 1);
                Assert.True(numberFromNode == 1);
            }
        }
    }
}
