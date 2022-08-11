using Mb.Models.Application;
using Mimirorg.TypeLibrary.Enums;
using ModelBuilder.Setup;
using ModelBuilder.Setup.Fixtures;

namespace ModelBuilder.Unit.Tests.Models
{
    public class ProjectTests : UnitTest<ModelBuilderCommonFixtures>
    {
        public const string ProjectGuid = "5533c7a4-17c2-4860-baa2-cc7b34e2ff67";

        public ProjectTests(ModelBuilderCommonFixtures fixture) : base(fixture)
        {
        }

        private ProjectAm ValidProject()
        {


            return new ProjectAm
            {
                Id = $"runir.net_{ProjectGuid}",
                Iri = $"https://rdf.runir.net/ID{ProjectGuid}",
                IsSubProject = false,
                Version = "1.0.0",
                Name = "Dummy Project",
                Description = "Dummy Project",
                ProjectOwner = "Anna Bond",
                UpdatedBy = "Anna Bond",
                Updated = new DateTime(2022, 6, 1, 10, 0, 0),
                Nodes = new List<NodeAm>
                {
                    new NodeAm
                    {
                        Id = "runir.net_17de767c-3040-44a6-a8ad-f5bb300fc52e",
                        Iri = "https://rdf.runir.net/ID17de767c-3040-44a6-a8ad-f5bb300fc52e",
                        Name = "Dummy Node A",
                        Description = "Dummy Node A",
                        ProjectId = $"runir.net_{ProjectGuid}",
                        ProjectIri = $"https://rdf.runir.net/ID{ProjectGuid}",
                        Version = "1.0",
                        MasterProjectId = $"runir.net_{ProjectGuid}",
                        MasterProjectIri = $"https://rdf.runir.net/ID{ProjectGuid}",
                        Updated = new DateTime(2022,6,1,10,0,0),
                        UpdatedBy = "Anna Bond",
                        Aspect = Aspect.Function,
                        Attributes = null,
                        Connectors = null,
                        Created = new DateTime(2022,6,1,10,0,0),
                        CreatedBy = "Anna Bond",
                        Height = 1100,
                        Width = 2430,
                        IsLocked = false,
                        IsLockedStatusBy = null,
                        IsLockedStatusDate = null,
                        IsRoot = false,
                        Label = "Dummy Node A",
                        LibraryTypeId = "71D39BB0C6EA6E996AEA7139BB1B3D91",
                        PositionBlockX = -64.2857m,
                        PositionBlockY = -6.4285m,
                        PositionX = -99.2857m,
                        PositionY = 213.5715m,
                        Purpose = null,
                        Rds = "B0",
                        SemanticReference = null,
                        Simples = null,
                        StatusId = null,
                        Symbol = "http://localhost:5001/symbol/FF75565357B8D6B347964F78509F1895.svg"
                    }
                }
            };
        }

        //[Fact]
        //public void GetParentlessEdges_With_No_Parent_Less_Edges_Returns_Ok()
        //{
        //    var edges = _projectFixture.ProjectA.GetParentlessEdges().ToList();
        //    Assert.Empty(edges);
        //}

        //[Fact]
        //public void GetParentlessEdges_With_Two_Node_Parent_Less_Edges_Returns_Ok()
        //{
        //    var clone = _projectFixture.ProjectA.DeepCopy();
        //    clone.Edges.ElementAt(1).FromNodeId = $"Id_Bare_Tull_{1}";
        //    clone.Edges.ElementAt(3).FromNodeId = $"Id_Bare_Tull_{3}";

        //    var edges = clone.GetParentlessEdges().ToList();
        //    Assert.Equal(2, edges.Count);
        //}

        //[Fact]
        //public void GetParentlessEdges_With_Edge_Missing_To_Node_Returns_Ok()
        //{
        //    var clone = _projectFixture.ProjectA.DeepCopy();
        //    clone.Edges.ElementAt(1).ToNodeId = $"Id_Bare_Tull_{1}";
        //    clone.Edges.ElementAt(3).ToNodeId = $"Id_Bare_Tull_{3}";

        //    var edges = clone.GetParentlessEdges().ToList();
        //    Assert.Empty(edges);
        //}

        //[Fact]
        //public void GetNotConnectedEdges_With_Edge_Missing_To_Node_Returns_Ok()
        //{
        //    var clone = _projectFixture.ProjectA.DeepCopy();
        //    clone.Edges.ElementAt(1).ToNodeId = $"Id_Bare_Tull_{1}";
        //    clone.Edges.ElementAt(3).ToNodeId = $"Id_Bare_Tull_{3}";

        //    var edges = clone.GetNotConnectedEdges().ToList();
        //    Assert.Equal(2, edges.Count);
        //}

        //[Fact]
        //public void GetNotConnectedEdges_With_Edge_Missing_From_Node_Returns_Ok()
        //{
        //    var clone = _projectFixture.ProjectA.DeepCopy();
        //    clone.Edges.ElementAt(1).FromNodeId = $"Id_Bare_Tull_{1}";
        //    clone.Edges.ElementAt(3).FromNodeId = $"Id_Bare_Tull_{3}";

        //    var edges = clone.GetNotConnectedEdges().ToList();
        //    Assert.Equal(2, edges.Count);
        //}

        //[Fact]
        //public void GetNotConnectedEdges_With_Edge_Missing_From_Node_And_To_Node_Returns_Ok()
        //{
        //    var clone = _projectFixture.ProjectA.DeepCopy();
        //    clone.Edges.ElementAt(1).FromNodeId = $"Id_Bare_Tull_{1}";
        //    clone.Edges.ElementAt(3).ToNodeId = $"Id_Bare_Tull_{3}";

        //    var edges = clone.GetNotConnectedEdges().ToList();
        //    Assert.Equal(2, edges.Count);
        //}

        //[Fact]
        //public void GetParentlessEdges_And_GetNotConnectedEdges_With_One_Parameter_Less_Edge_And_Two_NotConnected_Returns_Ok()
        //{
        //    var clone = _projectFixture.ProjectA.DeepCopy();
        //    clone.Edges.ElementAt(1).FromNodeId = $"Id_Bare_Tull_{1}";
        //    clone.Edges.ElementAt(3).ToNodeId = $"Id_Bare_Tull_{3}";
        //    clone.Edges.ElementAt(4).ToNodeId = $"Id_Bare_Tull_{4}";

        //    _projectFixture.RemapService.RemapParentlessEdges(clone);
        //    var edges = clone.GetNotConnectedEdges().ToList();
        //    Assert.Equal(2, edges.Count);
        //}

    }
}