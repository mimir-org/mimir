//using System.Linq;
//using Mimirorg.Common.Extensions;
//using Xunit;

//namespace ModelBuilder.Tests.Models
//{
//    public class ProjectTests : IClassFixture<ProjectFixture>
//    {
//        private readonly ProjectFixture _projectFixture;

//        public ProjectTests(ProjectFixture projectFixture)
//        {
//            _projectFixture = projectFixture;
//        }

//        [Fact]
//        public void GetParentlessEdges_With_No_Parent_Less_Edges_Returns_Ok()
//        {
//            var edges = _projectFixture.ProjectA.GetParentlessEdges().ToList();
//            Assert.Empty(edges);
//        }

//        [Fact]
//        public void GetParentlessEdges_With_Two_Node_Parent_Less_Edges_Returns_Ok()
//        {
//            var clone = _projectFixture.ProjectA.DeepCopy();
//            clone.Edges.ElementAt(1).FromNodeId = $"Id_Bare_Tull_{1}";
//            clone.Edges.ElementAt(3).FromNodeId = $"Id_Bare_Tull_{3}";

//            var edges = clone.GetParentlessEdges().ToList();
//            Assert.Equal(2, edges.Count);
//        }

//        [Fact]
//        public void GetParentlessEdges_With_Edge_Missing_To_Node_Returns_Ok()
//        {
//            var clone = _projectFixture.ProjectA.DeepCopy();
//            clone.Edges.ElementAt(1).ToNodeId = $"Id_Bare_Tull_{1}";
//            clone.Edges.ElementAt(3).ToNodeId = $"Id_Bare_Tull_{3}";

//            var edges = clone.GetParentlessEdges().ToList();
//            Assert.Empty(edges);
//        }

//        [Fact]
//        public void GetNotConnectedEdges_With_Edge_Missing_To_Node_Returns_Ok()
//        {
//            var clone = _projectFixture.ProjectA.DeepCopy();
//            clone.Edges.ElementAt(1).ToNodeId = $"Id_Bare_Tull_{1}";
//            clone.Edges.ElementAt(3).ToNodeId = $"Id_Bare_Tull_{3}";

//            var edges = clone.GetNotConnectedEdges().ToList();
//            Assert.Equal(2, edges.Count);
//        }

//        [Fact]
//        public void GetNotConnectedEdges_With_Edge_Missing_From_Node_Returns_Ok()
//        {
//            var clone = _projectFixture.ProjectA.DeepCopy();
//            clone.Edges.ElementAt(1).FromNodeId = $"Id_Bare_Tull_{1}";
//            clone.Edges.ElementAt(3).FromNodeId = $"Id_Bare_Tull_{3}";

//            var edges = clone.GetNotConnectedEdges().ToList();
//            Assert.Equal(2, edges.Count);
//        }

//        [Fact]
//        public void GetNotConnectedEdges_With_Edge_Missing_From_Node_And_To_Node_Returns_Ok()
//        {
//            var clone = _projectFixture.ProjectA.DeepCopy();
//            clone.Edges.ElementAt(1).FromNodeId = $"Id_Bare_Tull_{1}";
//            clone.Edges.ElementAt(3).ToNodeId = $"Id_Bare_Tull_{3}";

//            var edges = clone.GetNotConnectedEdges().ToList();
//            Assert.Equal(2, edges.Count);
//        }

//        [Fact]
//        public void GetParentlessEdges_And_GetNotConnectedEdges_With_One_Parameter_Less_Edge_And_Two_NotConnected_Returns_Ok()
//        {
//            var clone = _projectFixture.ProjectA.DeepCopy();
//            clone.Edges.ElementAt(1).FromNodeId = $"Id_Bare_Tull_{1}";
//            clone.Edges.ElementAt(3).ToNodeId = $"Id_Bare_Tull_{3}";
//            clone.Edges.ElementAt(4).ToNodeId = $"Id_Bare_Tull_{4}";

//            _projectFixture.RemapService.RemapParentlessEdges(clone);
//            var edges = clone.GetNotConnectedEdges().ToList();
//            Assert.Equal(2, edges.Count);
//        }
//    }
//}