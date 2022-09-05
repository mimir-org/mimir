using Mb.Models.Application;
using Mb.Models.Enums;
using Mimirorg.Common.Extensions;
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
                        Connectors = new List<ConnectorAm>
                        {
                            new RelationAm
                            {
                                Id = "runir.net_FF21C487-F075-4073-AF50-B6B5E7620CDF",
                                Iri = "https://rdf.runir.net/IDFF21C487-F075-4073-AF50-B6B5E7620CDF",
                                Attributes = null,
                                ConnectorVisibility = ConnectorVisibility.None,
                                IsRequired = false,
                                NodeId = "runir.net_17de767c-3040-44a6-a8ad-f5bb300fc52e",
                                NodeIri = "https://rdf.runir.net/ID17de767c-3040-44a6-a8ad-f5bb300fc52e",
                                Name = "Connector A",
                                Type = ConnectorDirection.Input,
                                RelationType = RelationType.PartOf
                            },
                            new RelationAm
                            {
                                Id = "runir.net_6560A3CC-0499-4A55-8590-1453060A1498",
                                Iri = "https://rdf.runir.net/ID6560A3CC-0499-4A55-8590-1453060A1498",
                                Attributes = null,
                                ConnectorVisibility = ConnectorVisibility.None,
                                IsRequired = false,
                                NodeId = "runir.net_17de767c-3040-44a6-a8ad-f5bb300fc52e",
                                NodeIri = "https://rdf.runir.net/ID17de767c-3040-44a6-a8ad-f5bb300fc52e",
                                Name = "Connector B",
                                Type = ConnectorDirection.Output,
                                RelationType = RelationType.PartOf
                            }
                        },
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
                        TypeReferences = null,
                        Simples = null,
                        Symbol = "http://localhost:5001/symbol/FF75565357B8D6B347964F78509F1895.svg"
                    },
                    new NodeAm
                    {
                        Id = "runir.net_183EA07F-9696-467F-8F12-ACE65BA89670",
                        Iri = "https://rdf.runir.net/ID183EA07F-9696-467F-8F12-ACE65BA89670",
                        Name = "Dummy Node B",
                        Description = "Dummy Node B",
                        ProjectId = $"runir.net_{ProjectGuid}",
                        ProjectIri = $"https://rdf.runir.net/ID{ProjectGuid}",
                        Version = "1.0",
                        MasterProjectId = $"runir.net_{ProjectGuid}",
                        MasterProjectIri = $"https://rdf.runir.net/ID{ProjectGuid}",
                        Updated = new DateTime(2022,6,1,10,0,0),
                        UpdatedBy = "Anna Bond",
                        Aspect = Aspect.Function,
                        Attributes = null,
                        Connectors = new List<ConnectorAm>
                        {
                            new RelationAm
                            {
                                Id = "runir.net_95479872-2249-4E46-8E9F-305589F946CC",
                                Iri = "https://rdf.runir.net/ID95479872-2249-4E46-8E9F-305589F946CC",
                                Attributes = null,
                                ConnectorVisibility = ConnectorVisibility.None,
                                IsRequired = false,
                                NodeId = "runir.net_183EA07F-9696-467F-8F12-ACE65BA89670",
                                NodeIri = "https://rdf.runir.net/ID183EA07F-9696-467F-8F12-ACE65BA89670",
                                Name = "Connector A",
                                Type = ConnectorDirection.Input,
                                RelationType = RelationType.PartOf
                            },
                            new RelationAm
                            {
                                Id = "runir.net_B9972C41-C136-4B61-AE3F-7B5181E49B70",
                                Iri = "https://rdf.runir.net/IDB9972C41-C136-4B61-AE3F-7B5181E49B70",
                                Attributes = null,
                                ConnectorVisibility = ConnectorVisibility.None,
                                IsRequired = false,
                                NodeId = "runir.net_183EA07F-9696-467F-8F12-ACE65BA89670",
                                NodeIri = "https://rdf.runir.net/ID183EA07F-9696-467F-8F12-ACE65BA89670",
                                Name = "Connector B",
                                Type = ConnectorDirection.Output,
                                RelationType = RelationType.PartOf
                            }
                        },
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
                        TypeReferences = null,
                        Simples = null,
                        Symbol = "http://localhost:5001/symbol/FF75565357B8D6B347964F78509F1895.svg"
                    }
                },
                Edges = new List<EdgeAm>
                {
                    new EdgeAm
                    {
                        Id = "runir.net_108097DF-0319-46F8-AAE0-46F894AF0252",
                        Iri = "https://rdf.runir.net/108097DF-0319-46F8-AAE0-46F894AF0252",
                        ProjectId = $"runir.net_{ProjectGuid}",
                        ProjectIri = $"https://rdf.runir.net/ID{ProjectGuid}",
                        MasterProjectId = $"runir.net_{ProjectGuid}",
                        MasterProjectIri = $"https://rdf.runir.net/ID{ProjectGuid}",
                        FromConnectorId = "runir.net_6560A3CC-0499-4A55-8590-1453060A1498",
                        FromConnectorIri = "https://rdf.runir.net/ID6560A3CC-0499-4A55-8590-1453060A1498",
                        ToConnectorId = "runir.net_95479872-2249-4E46-8E9F-305589F946CC",
                        ToConnectorIri = "https://rdf.runir.net/ID95479872-2249-4E46-8E9F-305589F946CC",
                        FromNodeId = "runir.net_17de767c-3040-44a6-a8ad-f5bb300fc52e",
                        FromNodeIri = "https://rdf.runir.net/ID17de767c-3040-44a6-a8ad-f5bb300fc52e",
                        ToNodeId = "runir.net_183EA07F-9696-467F-8F12-ACE65BA89670",
                        ToNodeIri = "https://rdf.runir.net/ID183EA07F-9696-467F-8F12-ACE65BA89670",
                        IsLocked = false,
                        IsLockedStatusBy = null,
                        IsLockedStatusDate = null,
                        Interface = null,
                        Transport = null
                    }
                }
            };
        }

        [Fact]
        public void Project_With_Duplicate_Nodes_Validate_Error()
        {
            var clone = ValidProject().DeepCopy();
            clone.Nodes.Add(new NodeAm
            {
                Id = "runir.net_17de767c-3040-44a6-a8ad-f5bb300fc52e",
                Iri = "https://rdf.runir.net/ID17de767c-3040-44a6-a8ad-f5bb300fc52e"
            });

            var validation = clone.ValidateObject();
            Assert.False(validation.IsValid);
        }

        [Theory]
        [InlineData("runir.net_123", @"https://rdf.runir.net/ID123", "XXX", "1.0", "Anna Bond", true)]
        [InlineData(null, @"https://rdf.runir.net/ID123", "XXX", "1.0", "Anna Bond", true)]
        [InlineData("runir.net_123", null, "XXX", "1.0", "Anna Bond", true)]
        [InlineData(null, null, "XXX", "1.0", "Anna Bond", false)]
        [InlineData("runir.net_123", @"https://rdf.runir.net/ID123", null, "1.0", "Anna Bond", false)]
        [InlineData("runir.net_123", @"https://rdf.runir.net/ID123", "XXX", null, "Anna Bond", false)]
        [InlineData("runir.net_123", @"https://rdf.runir.net/ID123", "XXX", "1.0", null, false)]
        public void Project_Validate_Ok(string id, string iri, string name, string version, string projectOwner, bool expectedResult)
        {
            var p = new ProjectAm
            {
                Id = id,
                Iri = iri,
                Name = name,
                Version = version,
                ProjectOwner = projectOwner,
                Nodes = null,
                Edges = null
            };

            var validation = p.ValidateObject();
            Assert.Equal(expectedResult, validation.IsValid);
        }

        [Fact]
        public void GetParentlessEdges_With_No_Parentless_Edges_Returns_Ok()
        {
            var edges = ValidProject().GetParentlessEdges().ToList();
            Assert.Empty(edges);
        }

        [Fact]
        public void GetParentlessEdges_With_One_Parentless_Edges_Returns_Ok()
        {
            var clone = ValidProject().DeepCopy();
            clone.Edges.ElementAt(0).FromNodeId = $"Id_Bare_Tull_{1}";
            var edges = clone.GetParentlessEdges().ToList();
            Assert.Single(edges);
        }

        [Fact]
        public void GetNotConnectedEdges_With_One_Edge_Missing_ToNode_Returns_Ok()
        {
            var clone = ValidProject().DeepCopy();
            clone.Edges.ElementAt(0).ToNodeId = $"Id_Bare_Tull_{1}";
            var edges = clone.GetNotConnectedEdges().ToList();
            Assert.Single(edges);
        }

        [Fact]
        public void GetNotConnectedEdges_With_One_Edge_Missing_FromNode_Returns_Ok()
        {
            var clone = ValidProject().DeepCopy();
            clone.Edges.ElementAt(0).FromNodeId = $"Id_Bare_Tull_{1}";
            var edges = clone.GetNotConnectedEdges().ToList();
            Assert.Single(edges);
        }

        [Fact]
        public void GetNotConnectedEdges_With_One_Edge_Missing_FromNode_And_ToNode_Returns_Ok()
        {
            var clone = ValidProject().DeepCopy();
            clone.Edges.ElementAt(0).FromNodeId = $"Id_Bare_Tull_{1}";
            clone.Edges.ElementAt(0).ToNodeId = $"Id_Bare_Tull_{2}";
            var edges = clone.GetNotConnectedEdges().ToList();
            Assert.Single(edges);
        }
    }
}