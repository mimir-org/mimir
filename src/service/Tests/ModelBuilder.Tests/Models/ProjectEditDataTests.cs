using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Data;
using Xunit;

namespace ModelBuilder.Tests.Models
{
    public class ProjectEditDataTests : IClassFixture<ProjectFixture>
    {
        private readonly ProjectFixture _projectFixture;
        private readonly Project _originalProject;

        public ProjectEditDataTests(ProjectFixture projectFixture)
        {
            _projectFixture = projectFixture;
            _originalProject = new Project
            {
                Id = "xxx",
                Nodes = new List<Node>
                {
                    new Node { Id = "N1" },
                    new Node { Id = "N2", Attributes = new List<Attribute> { new Attribute { Id = "A1"} }, Connectors = new List<Connector> {new Terminal { Id = "TermA", NodeId = "N1"}, new Relation { Id = "RelA", NodeId = "N1"}}}
                },
                Edges = new List<Edge>
                {
                    new Edge { Id = "E1", Transport = new Transport { Id = "T1", Attributes = new List<Attribute> { new Attribute { Id = "A2"}}}},
                    new Edge { Id = "E2", Interface = new Interface { Id = "I1", Attributes = new List<Attribute> { new Attribute { Id = "A3"}}}}
                }
            };
        }

        [Fact]
        public async Task ProjectData_Equals_Project_Has_Empty_Delete_Data()
        {
            var projectEditData = await _projectFixture.RemapService.CreateEditData(_originalProject, _originalProject);
            Assert.Empty(projectEditData.EdgeDelete);
            Assert.Empty(projectEditData.NodeDelete);
            Assert.Empty(projectEditData.AttributeDelete);
            Assert.Empty(projectEditData.TransportDelete);
            Assert.Empty(projectEditData.InterfaceDelete);
            Assert.Empty(projectEditData.TerminalDelete);
            Assert.Empty(projectEditData.RelationDelete);
        }

        [Fact]
        public async Task ProjectData_Equals_Project_Has_Empty_New_Data()
        {
            var projectEditData = await _projectFixture.RemapService.CreateEditData(_originalProject, _originalProject);
            Assert.Empty(projectEditData.EdgeCreate);
            Assert.Empty(projectEditData.NodeCreate);
            Assert.Empty(projectEditData.AttributeCreate);
            Assert.Empty(projectEditData.TransportCreate);
            Assert.Empty(projectEditData.InterfaceCreate);
            Assert.Empty(projectEditData.TerminalCreate);
            Assert.Empty(projectEditData.RelationCreate);
        }

        [Fact]
        public async Task ProjectData_Equals_Project_Has_Empty_Update_Data()
        {
            var projectEditData = await _projectFixture.RemapService.CreateEditData(_originalProject, _originalProject);
            Assert.Empty(projectEditData.EdgeUpdate);
            Assert.Empty(projectEditData.NodeUpdate);
            Assert.Empty(projectEditData.AttributeUpdate);
            Assert.Empty(projectEditData.TransportUpdate);
            Assert.Empty(projectEditData.InterfaceUpdate);
            Assert.Empty(projectEditData.TerminalUpdate);
            Assert.Empty(projectEditData.RelationUpdate);
        }

        [Fact]
        public async Task ProjectData_Changed_Data_Is_Registered_As_Updated()
        {
            var updated = new Project
            {
                Id = "xxx",
                Nodes = new List<Node>
                {
                    new Node { Id = "N1", Label = "Bare tull" },
                    new Node { Id = "N2", Attributes = new List<Attribute> { new Attribute { Id = "A1"} }, Connectors = new List<Connector> {new Terminal { Id = "TermA", NodeId = "N1", Color = "Black" }, new Relation { Id = "RelA", NodeId = "N1", IsRequired = true }}}
                },
                Edges = new List<Edge>
                {
                    new Edge { Id = "E1", Iri = "Bare tull", Transport = new Transport { Id = "T1", CreatedBy = "Reidar Liabø", Attributes = new List<Attribute> { new Attribute { Id = "A2", Value = "100" }}}},
                    new Edge { Id = "E2", Interface = new Interface { Id = "I1", CreatedBy = "Reidar Liabø", Attributes = new List<Attribute> { new Attribute { Id = "A3"}}}}
                }
            };

            var projectEditData = await _projectFixture.RemapService.CreateEditData(_originalProject, updated);
            Assert.Single(projectEditData.EdgeUpdate);
            Assert.Single(projectEditData.NodeUpdate);
            Assert.Single(projectEditData.AttributeUpdate);
            Assert.Single(projectEditData.TransportUpdate);
            Assert.Single(projectEditData.InterfaceUpdate);
            Assert.Single(projectEditData.RelationUpdate);
            Assert.Single(projectEditData.TerminalUpdate);
        }

        [Fact]
        public async Task ProjectData_Deleted_Attribute_And_Interface_Is_Registered()
        {
            var updatedProject = new Project
            {
                Id = "xxx",
                Nodes = new List<Node>
                {
                    new Node { Id = "N1" },
                    new Node { Id = "N2" }
                },
                Edges = new List<Edge>
                {
                    new Edge { Id = "E1", Transport = new Transport { Id = "T1", Attributes = new List<Attribute> { new Attribute { Id = "A2"} } } },
                    new Edge { Id = "E2" }
                }
            };

            var projectEditData = await _projectFixture.RemapService.CreateEditData(_originalProject, updatedProject);
            Assert.Equal(2, projectEditData.AttributeDelete.Count);
            Assert.Single(projectEditData.InterfaceDelete);
        }

        [Fact]
        public async Task ProjectData_Deleted_Node_Attribute_Is_Registered()
        {
            var updated = new Project
            {
                Id = "xxx",
                Nodes = new List<Node>
                {
                    new Node { Id = "N1" }
                },
                Edges = new List<Edge>
                {
                    new Edge { Id = "E1" },
                    new Edge { Id = "E2" }
                }
            };

            var projectEditData = await _projectFixture.RemapService.CreateEditData(_originalProject, updated);
            Assert.Single(projectEditData.NodeDelete);
            Assert.Equal(3, projectEditData.AttributeDelete.Count);
        }

        [Fact]
        public async Task ProjectData_Deleted_Node_Attribute_Edge_Is_Registered()
        {
            var updated = new Project
            {
                Id = "xxx",
                Nodes = new List<Node>
                {
                    new Node { Id = "N1" }
                },
                Edges = new List<Edge>
                {
                    new Edge { Id = "E1" }
                }
            };

            var projectEditData = await _projectFixture.RemapService.CreateEditData(_originalProject, updated);
            Assert.Single(projectEditData.NodeDelete);
            Assert.Equal(3, projectEditData.AttributeDelete.Count);
            Assert.Single(projectEditData.EdgeDelete);
            Assert.Single(projectEditData.InterfaceDelete);
        }
    }
}