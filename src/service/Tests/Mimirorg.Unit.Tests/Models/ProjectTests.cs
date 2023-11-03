using Mb.Models.Application;
using Mb.Models.Enums;
using Mimirorg.Common.Extensions;
using Mimirorg.TypeLibrary.Enums;
using ModelBuilder.Setup;
using ModelBuilder.Setup.Fixtures;

namespace ModelBuilder.Unit.Tests.Models;

public class ProjectTests : UnitTest<ModelBuilderCommonFixtures>
{
    public readonly Guid ProjectGuid = new Guid("5533c7a4-17c2-4860-baa2-cc7b34e2ff67");

    public ProjectTests(ModelBuilderCommonFixtures fixture) : base(fixture)
    {
    }

    private ProjectAm ValidProject()
    {
        return new ProjectAm
        {
            Id = ProjectGuid,
            SubProject = false,
            Name = "Dummy Project",
            Description = "Dummy Project",
            Blocks = new List<BlockAm>
            {
                new BlockAm
                {
                    Name = "Dummy block A",
                    Description = "Dummy block A",
                    Project = ProjectGuid,
                    Version = "1.0",
                    MainProject = ProjectGuid,
                    Aspect = Aspect.Function,
                    Attributes = null,
                    //Connectors = new List<ConnectorAm>
                    //{
                    //    new RelationAm
                    //    {
                    //        Id = "https://rdf.runir.net/IDFF21C487-F075-4073-AF50-B6B5E7620CDF",
                    //        ConnectorVisibility = ConnectorVisibility.None,
                    //        IsRequired = false,
                    //        Block = "https://rdf.runir.net/ID17de767c-3040-44a6-a8ad-f5bb300fc52e",
                    //        Name = "Connector A",
                    //        Direction = ConnectorDirection.Input,
                    //        RelationType = RelationType.PartOf
                    //    },
                    //    new RelationAm
                    //    {
                    //        Id = "https://rdf.runir.net/ID6560A3CC-0499-4A55-8590-1453060A1498",
                    //        ConnectorVisibility = ConnectorVisibility.None,
                    //        IsRequired = false,
                    //        Block = "https://rdf.runir.net/ID17de767c-3040-44a6-a8ad-f5bb300fc52e",
                    //        Name = "Connector B",
                    //        Direction = ConnectorDirection.Output,
                    //        RelationType = RelationType.PartOf
                    //    }
                    //},
                    BlockType = BlockType.Aspect,
                    Label = "Dummy block A",
                    LibraryType = new Guid ("71D39BB0C6EA6E996AEA7139BB1B3D91"),
                    PositionTree = new PositionAm
                    {
                        PosX = -99,
                        PosY = 213,
                    },
                    PositionBlock = new PositionAm
                    {
                        PosX = 64,
                        PosY = -6
                    },
                    Purpose = null,
                    Rds = "B0",
                    ReferenceType = null,
                    Symbol = "http://localhost:5001/symbol/FF75565357B8D6B347964F78509F1895.svg"
                },
                new BlockAm
                {

                    Name = "Dummy block B",
                    Description = "Dummy block B",
                    Project = ProjectGuid,
                    Version = "1.0",
                    MainProject = ProjectGuid,
                    Aspect = Aspect.Function,
                    Attributes = null,
                    //Connectors = new List<ConnectorAm>
                    //{
                    //    new RelationAm
                    //    {
                    //        Id = "https://rdf.runir.net/ID95479872-2249-4E46-8E9F-305589F946CC",
                    //        ConnectorVisibility = ConnectorVisibility.None,
                    //        IsRequired = false,
                    //        Block = "https://rdf.runir.net/ID183EA07F-9696-467F-8F12-ACE65BA89670",
                    //        Name = "Connector A",
                    //        Direction = ConnectorDirection.Input,
                    //        RelationType = RelationType.PartOf
                    //    },
                    //    new RelationAm
                    //    {
                    //        Id = "https://rdf.runir.net/IDB9972C41-C136-4B61-AE3F-7B5181E49B70",
                    //        ConnectorVisibility = ConnectorVisibility.None,
                    //        IsRequired = false,
                    //        Block = "https://rdf.runir.net/ID183EA07F-9696-467F-8F12-ACE65BA89670",
                    //        Name = "Connector B",
                    //        Direction = ConnectorDirection.Output,
                    //        RelationType = RelationType.PartOf
                    //    }
                    //},
                    BlockType = BlockType.Aspect,
                    Label = "Dummy block A",
                    LibraryType = new Guid("71D39BB0C6EA6E996AEA7139BB1B3D91"),
                    PositionTree = new PositionAm
                    {
                        PosX = -99,
                        PosY = 213,
                    },
                    PositionBlock = new PositionAm
                    {
                        PosX = 64,
                        PosY = -6
                    },
                    Purpose = null,
                    Rds = "B0",
                    ReferenceType = null,
                    Symbol = "http://localhost:5001/symbol/FF75565357B8D6B347964F78509F1895.svg"
                }
            },
            Connections = new List<ConnectionAm>
            {
                new ConnectionAm
                {
                    Id = new Guid("108097DF-0319-46F8-AAE0-46F894AF0252"),
                    Project = ProjectGuid,
                    MainProject = ProjectGuid,
                    FromConnector = "https://rdf.runir.net/ID6560A3CC-0499-4A55-8590-1453060A1498",
                    ToConnector = "https://rdf.runir.net/ID95479872-2249-4E46-8E9F-305589F946CC",
                }
            }
        };
    }

    [Fact]
    public void Project_With_Duplicate_Blocks_Validate_Error()
    {
        var clone = ValidProject().DeepCopy();
        clone.Blocks.Add(new BlockAm
        {
            Id = new Guid("ID17de767c-3040-44a6-a8ad-f5bb300fc52e")
        });

        var validation = clone.ValidateObject();
        Assert.False(validation.IsValid);
    }

    //[Theory]
    //[InlineData("runir.net_123", @"https://rdf.runir.net/ID123", "XXX", "1.0", "Anna Bond", true)]
    //[InlineData(null, @"https://rdf.runir.net/ID123", "XXX", "1.0", "Anna Bond", true)]
    //[InlineData("runir.net_123", null, "XXX", "1.0", "Anna Bond", true)]
    //[InlineData(null, null, "XXX", "1.0", "Anna Bond", false)]
    //[InlineData("runir.net_123", @"https://rdf.runir.net/ID123", null, "1.0", "Anna Bond", false)]
    //[InlineData("runir.net_123", @"https://rdf.runir.net/ID123", "XXX", null, "Anna Bond", false)]
    //[InlineData("runir.net_123", @"https://rdf.runir.net/ID123", "XXX", "1.0", null, false)]
    //public void Project_Validate_Ok(string iri, string name, string version, string projectOwner, bool? expectedResult)
    //{
    //    var p = new ProjectAm
    //    {
    //        Id = iri,
    //        Name = name,
    //        Version = version,
    //        CreatedBy = projectOwner,
    //        Blocks = null,
    //        Connections = null
    //    };

    //    var validation = p.ValidateObject();
    //    Assert.Equal(expectedResult, validation.IsValid);
    //}

    [Fact]
    public void GetParentlessConnections_With_No_Parentless_Connections_Returns_Ok()
    {
        var connections = ValidProject().GetParentlessConnectors().ToList();
        Assert.Empty(connections);
    }

    [Fact(Skip = "Must be rewritten after big refactoring of backend")]
    public void GetParentlessConnections_With_One_Parentless_Connections_Returns_Ok()
    {
        var clone = ValidProject().DeepCopy();
        //TODO Rewrite
        //clone.Connections.ElementAt(0).FromBlockId = $"Id_Bare_Tull_{1}";
        var connections = clone.GetParentlessConnectors().ToList();
        Assert.Single(connections);
    }

    [Fact(Skip = "Must be rewritten after big refactoring of backend")]
    public void GetNotConnectedConnections_With_One_Connection_Missing_ToBlock_Returns_Ok()
    {
        var clone = ValidProject().DeepCopy();
        //TODO Rewrite
        //clone.Connections.ElementAt(0).ToBlockId = $"Id_Bare_Tull_{1}";
        var connections = clone.GetNotConnectedConnectors().ToList();
        Assert.Single(connections);
    }

    [Fact(Skip = "Must be rewritten after big refactoring of backend")]
    public void GetNotConnectedConnections_With_One_Connection_Missing_FromBlock_Returns_Ok()
    {
        var clone = ValidProject().DeepCopy();
        //TODO Rewrite
        //clone.Connections.ElementAt(0).FromBlockId = $"Id_Bare_Tull_{1}";
        var connections = clone.GetNotConnectedConnectors().ToList();
        Assert.Single(connections);
    }

    [Fact(Skip = "Must be rewritten after big refactoring of backend")]
    public void GetNotConnectedConnections_With_One_Connection_Missing_FromBlock_And_ToBlock_Returns_Ok()
    {
        var clone = ValidProject().DeepCopy();
        //TODO Rewrite
        //clone.Connections.ElementAt(0).FromBlockId = $"Id_Bare_Tull_{1}";
        //clone.Connections.ElementAt(0).ToBlockId = $"Id_Bare_Tull_{2}";
        var connections = clone.GetNotConnectedConnectors().ToList();
        Assert.Single(connections);
    }
}