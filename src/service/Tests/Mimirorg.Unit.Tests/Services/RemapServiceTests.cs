using Mb.Data.Contracts;
using Mb.Data.Repositories;
using Mb.Models.Application;
using Mb.Models.Common;
using Mb.Services.Contracts;
using Mb.Services.Services;
using Microsoft.Extensions.Options;
using ModelBuilder.Setup;
using ModelBuilder.Setup.Fixtures;

namespace ModelBuilder.Unit.Tests.Services
{
    public class RemapServiceTests : UnitTest<ModelBuilderCommonFixtures>
    {
        private readonly IRemapService _remapService;
        private readonly ICommonRepository _commonRepository;

        public RemapServiceTests(ModelBuilderCommonFixtures fixture) : base(fixture)
        {
            _commonRepository = new CommonRepository(fixture.CompanyRepository.Object, Options.Create(fixture.ApplicationSetting));
            _remapService = new RemapService(_commonRepository, fixture.Mapper.Object);
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
            var nodes = new List<NodeAm>();

            nodes.Add(new NodeAm
            {
                Id = "aaa",
                ProjectId = "runir.net_1234",
                Iri = "",
                Name = "Dummy A",
                Description = "Description",
                MasterProjectId = "runir.net_1234",
                MasterProjectIri = "runir.net_5678"
            });

            var remap = new Dictionary<string, string>();
            var mappedNodes = _remapService.RemapNodes(projectReplacement, nodes, null, remap, false).ToList();

            var mappedNodeFromId = mappedNodes.FirstOrDefault(x => x.ProjectId == "runir.net_5678");
            var mappedNodeFromIri = mappedNodes.FirstOrDefault(x => x.ProjectIri == "https://rdf.runir.net/ID5678");
            // TODO: should node change master project id if id is not changed?
            //var mappedNodeFromIdMaster = mappedNodes.FirstOrDefault(x => x.MasterProjectId == "runir.net_1234");
            //var mappedNodeFromIriMaster = mappedNodes.FirstOrDefault(x => x.MasterProjectIri == "https://rdf.runir.net/ID1234");
            Assert.NotNull(mappedNodeFromId);
            Assert.NotNull(mappedNodeFromIri);
            //Assert.NotNull(mappedNodeFromIdMaster);
            //Assert.NotNull(mappedNodeFromIriMaster);
        }

        //[Fact]
        //public void RemapNodes_Node_Edge_Mapping_All_Edges_Have_One_Connected_Terminal_Input_Output()
        //{
        //    var projectReplacement = new ReplacementId
        //    {
        //        FromId = _projectFixture.ProjectA.Id,
        //        ToId = _projectFixture.ProjectA.Id,
        //        FromIri = _projectFixture.ProjectA.Iri,
        //        ToIri = _projectFixture.ProjectA.Iri
        //    };
        //    var remap = new Dictionary<string, string>();
        //    _ = _projectFixture.RemapService.RemapNodes(projectReplacement, _projectFixture.ProjectA.Nodes, _projectFixture.ProjectA.Edges, remap, false);

        //    foreach (var edge in _projectFixture.ProjectA.Edges)
        //    {
        //        var numberToNode = _projectFixture.ProjectA.Nodes.Count(x => x.Id == edge.ToNodeId);
        //        var numberFromNode = _projectFixture.ProjectA.Nodes.Count(x => x.Id == edge.FromNodeId);

        //        Assert.True(numberToNode == 1);
        //        Assert.True(numberFromNode == 1);
        //    }
        //}

        //[Fact]
        //public async Task ProjectData_Equals_Project_Has_Empty_Delete_Data()
        //{
        //    var projectEditData = await _projectFixture.RemapService.CreateEditData(_originalProject, _originalProject);
        //    Assert.Empty(projectEditData.EdgeDelete);
        //    Assert.Empty(projectEditData.NodeDelete);
        //    Assert.Empty(projectEditData.AttributeDelete);
        //    Assert.Empty(projectEditData.TransportDelete);
        //    Assert.Empty(projectEditData.InterfaceDelete);
        //    Assert.Empty(projectEditData.TerminalDelete);
        //    Assert.Empty(projectEditData.RelationDelete);
        //}

        //[Fact]
        //public async Task ProjectData_Equals_Project_Has_Empty_New_Data()
        //{
        //    var projectEditData = await _projectFixture.RemapService.CreateEditData(_originalProject, _originalProject);
        //    Assert.Empty(projectEditData.EdgeCreate);
        //    Assert.Empty(projectEditData.NodeCreate);
        //    Assert.Empty(projectEditData.AttributeCreate);
        //    Assert.Empty(projectEditData.TransportCreate);
        //    Assert.Empty(projectEditData.InterfaceCreate);
        //    Assert.Empty(projectEditData.TerminalCreate);
        //    Assert.Empty(projectEditData.RelationCreate);
        //}

        //[Fact]
        //public async Task ProjectData_Equals_Project_Has_Empty_Update_Data()
        //{
        //    var projectEditData = await _projectFixture.RemapService.CreateEditData(_originalProject, _originalProject);
        //    Assert.Empty(projectEditData.EdgeUpdate);
        //    Assert.Empty(projectEditData.NodeUpdate);
        //    Assert.Empty(projectEditData.AttributeUpdate);
        //    Assert.Empty(projectEditData.TransportUpdate);
        //    Assert.Empty(projectEditData.InterfaceUpdate);
        //    Assert.Empty(projectEditData.TerminalUpdate);
        //    Assert.Empty(projectEditData.RelationUpdate);
        //}

        //[Fact]
        //public async Task ProjectData_Changed_Data_Is_Registered_As_Updated()
        //{
        //    var updated = new Project
        //    {
        //        Id = "xxx",
        //        Nodes = new List<Node>
        //        {
        //            new Node { Id = "N1", Label = "Bare tull" },
        //            new Node { Id = "N2", Attributes = new List<Attribute> { new Attribute { Id = "A1"} }, Connectors = new List<Connector> {new Terminal { Id = "TermA", NodeId = "N1", Color = "Black" }, new Relation { Id = "RelA", NodeId = "N1", IsRequired = true }}}
        //        },
        //        Edges = new List<Edge>
        //        {
        //            new Edge { Id = "E1", Iri = "Bare tull", Transport = new Transport { Id = "T1", CreatedBy = "Reidar Liabø", Attributes = new List<Attribute> { new Attribute { Id = "A2", Value = "100" }}}},
        //            new Edge { Id = "E2", Interface = new Interface { Id = "I1", CreatedBy = "Reidar Liabø", Attributes = new List<Attribute> { new Attribute { Id = "A3"}}}}
        //        }
        //    };

        //    var projectEditData = await _projectFixture.RemapService.CreateEditData(_originalProject, updated);
        //    Assert.Single(projectEditData.EdgeUpdate);
        //    Assert.Single(projectEditData.NodeUpdate);
        //    Assert.Single(projectEditData.AttributeUpdate);
        //    Assert.Single(projectEditData.TransportUpdate);
        //    Assert.Single(projectEditData.InterfaceUpdate);
        //    Assert.Single(projectEditData.RelationUpdate);
        //    Assert.Single(projectEditData.TerminalUpdate);
        //}

        //[Fact]
        //public async Task ProjectData_Deleted_Attribute_And_Interface_Is_Registered()
        //{
        //    var updatedProject = new Project
        //    {
        //        Id = "xxx",
        //        Nodes = new List<Node>
        //        {
        //            new Node { Id = "N1" },
        //            new Node { Id = "N2" }
        //        },
        //        Edges = new List<Edge>
        //        {
        //            new Edge { Id = "E1", Transport = new Transport { Id = "T1", Attributes = new List<Attribute> { new Attribute { Id = "A2"} } } },
        //            new Edge { Id = "E2" }
        //        }
        //    };

        //    var projectEditData = await _projectFixture.RemapService.CreateEditData(_originalProject, updatedProject);
        //    Assert.Equal(2, projectEditData.AttributeDelete.Count);
        //    Assert.Single(projectEditData.InterfaceDelete);
        //}

        //[Fact]
        //public async Task ProjectData_Deleted_Node_Attribute_Is_Registered()
        //{
        //    var updated = new Project
        //    {
        //        Id = "xxx",
        //        Nodes = new List<Node>
        //        {
        //            new Node { Id = "N1" }
        //        },
        //        Edges = new List<Edge>
        //        {
        //            new Edge { Id = "E1" },
        //            new Edge { Id = "E2" }
        //        }
        //    };

        //    var projectEditData = await _projectFixture.RemapService.CreateEditData(_originalProject, updated);
        //    Assert.Single(projectEditData.NodeDelete);
        //    Assert.Equal(3, projectEditData.AttributeDelete.Count);
        //}

        //[Fact]
        //public async Task ProjectData_Deleted_Node_Attribute_Edge_Is_Registered()
        //{
        //    var updated = new Project
        //    {
        //        Id = "xxx",
        //        Nodes = new List<Node>
        //        {
        //            new Node { Id = "N1" }
        //        },
        //        Edges = new List<Edge>
        //        {
        //            new Edge { Id = "E1" }
        //        }
        //    };

        //    var projectEditData = await _projectFixture.RemapService.CreateEditData(_originalProject, updated);
        //    Assert.Single(projectEditData.NodeDelete);
        //    Assert.Equal(3, projectEditData.AttributeDelete.Count);
        //    Assert.Single(projectEditData.EdgeDelete);
        //    Assert.Single(projectEditData.InterfaceDelete);
        //}
    }
}