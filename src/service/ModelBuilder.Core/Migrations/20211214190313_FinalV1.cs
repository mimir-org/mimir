using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class FinalV1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BlobData",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Data = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Discipline = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlobData", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CollaborationPartner",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Domain = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Current = table.Column<bool>(type: "bit", nullable: false),
                    Iris = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CollaborationPartner", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Enum",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Aspect = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ParentId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    InternalType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SemanticReference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Discipline = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enum", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Enum_Enum_ParentId",
                        column: x => x.ParentId,
                        principalTable: "Enum",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PredefinedAttribute",
                columns: table => new
                {
                    Key = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Values = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsMultiSelect = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PredefinedAttribute", x => x.Key);
                });

            migrationBuilder.CreateTable(
                name: "Project",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Iri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsSubProject = table.Column<bool>(type: "bit", nullable: false),
                    Version = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectOwner = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Project", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SimpleType",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SemanticReference = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SimpleType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Version",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ver = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TypeId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Data = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Version", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Rds",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RdsCategoryId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    SemanticReference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Aspect = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rds_Enum_RdsCategoryId",
                        column: x => x.RdsCategoryId,
                        principalTable: "Enum",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TerminalType",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TerminalCategoryId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    SemanticReference = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TerminalType", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TerminalType_Enum_TerminalCategoryId",
                        column: x => x.TerminalCategoryId,
                        principalTable: "Enum",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Node",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Iri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rds = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SemanticReference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Label = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PositionX = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    PositionY = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    IsLocked = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    IsLockedStatusBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsLockedStatusDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PositionBlockX = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    PositionBlockY = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    Level = table.Column<int>(type: "int", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false),
                    StatusId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LibraryTypeId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Version = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Aspect = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsRoot = table.Column<bool>(type: "bit", nullable: false),
                    MasterProjectId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MasterProjectIri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Symbol = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PurposeString = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Length = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    Width = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    Height = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    Cost = table.Column<decimal>(type: "decimal(10,4)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Node", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Node_Enum_StatusId",
                        column: x => x.StatusId,
                        principalTable: "Enum",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Node_Project_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LibraryType",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Version = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StatusId = table.Column<string>(type: "nvarchar(450)", nullable: false, defaultValue: "4590637F39B6BA6F39C74293BE9138DF"),
                    TypeId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SemanticReference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Aspect = table.Column<int>(type: "int", nullable: false),
                    RdsId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    PurposeId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Updated = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc)),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false, defaultValue: "Unknown"),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InterfaceType_TerminalTypeId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    LocationType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SymbolId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PredefinedAttributeData = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TransportType_TerminalTypeId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LibraryType", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LibraryType_Enum_PurposeId",
                        column: x => x.PurposeId,
                        principalTable: "Enum",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LibraryType_Enum_StatusId",
                        column: x => x.StatusId,
                        principalTable: "Enum",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LibraryType_Rds_RdsId",
                        column: x => x.RdsId,
                        principalTable: "Rds",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LibraryType_TerminalType_InterfaceType_TerminalTypeId",
                        column: x => x.InterfaceType_TerminalTypeId,
                        principalTable: "TerminalType",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LibraryType_TerminalType_TransportType_TerminalTypeId",
                        column: x => x.TransportType_TerminalTypeId,
                        principalTable: "TerminalType",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Connector",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Iri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SemanticReference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Visible = table.Column<string>(type: "nvarchar(1)", nullable: false),
                    NodeId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    NodeIri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsRequired = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RelationType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Terminal_CategoryId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    TerminalTypeId = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Connector", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Connector_Enum_Terminal_CategoryId",
                        column: x => x.Terminal_CategoryId,
                        principalTable: "Enum",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Connector_Node_NodeId",
                        column: x => x.NodeId,
                        principalTable: "Node",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Simple",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SemanticReference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NodeId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Simple", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Simple_Node_NodeId",
                        column: x => x.NodeId,
                        principalTable: "Node",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "AttributeType",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Entity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Aspect = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    QualifierId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    SourceId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ConditionId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    FormatId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Tags = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SelectValuesString = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SelectType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Discipline = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InterfaceTypeId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttributeType", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AttributeType_Enum_ConditionId",
                        column: x => x.ConditionId,
                        principalTable: "Enum",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AttributeType_Enum_FormatId",
                        column: x => x.FormatId,
                        principalTable: "Enum",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AttributeType_Enum_QualifierId",
                        column: x => x.QualifierId,
                        principalTable: "Enum",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AttributeType_Enum_SourceId",
                        column: x => x.SourceId,
                        principalTable: "Enum",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AttributeType_LibraryType_InterfaceTypeId",
                        column: x => x.InterfaceTypeId,
                        principalTable: "LibraryType",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "NodeType_TerminalType",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Number = table.Column<int>(type: "int", nullable: false, defaultValue: 1),
                    ConnectorType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NodeTypeId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    TerminalTypeId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NodeType_TerminalType", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NodeType_TerminalType_LibraryType_NodeTypeId",
                        column: x => x.NodeTypeId,
                        principalTable: "LibraryType",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_NodeType_TerminalType_TerminalType_TerminalTypeId",
                        column: x => x.TerminalTypeId,
                        principalTable: "TerminalType",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SimpleType_NodeType",
                columns: table => new
                {
                    NodeTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SimpleTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SimpleType_NodeType", x => new { x.NodeTypeId, x.SimpleTypeId });
                    table.ForeignKey(
                        name: "FK_SimpleType_NodeType_LibraryType_NodeTypeId",
                        column: x => x.NodeTypeId,
                        principalTable: "LibraryType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SimpleType_NodeType_SimpleType_SimpleTypeId",
                        column: x => x.SimpleTypeId,
                        principalTable: "SimpleType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Interface",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Iri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Version = table.Column<string>(type: "nvarchar(max)", nullable: false, defaultValue: "1.0"),
                    Rds = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Label = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StatusId = table.Column<string>(type: "nvarchar(450)", nullable: false, defaultValue: "4590637F39B6BA6F39C74293BE9138DF"),
                    SemanticReference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InputTerminalId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    OutputTerminalId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Updated = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LibraryTypeId = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Interface", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Interface_Connector_InputTerminalId",
                        column: x => x.InputTerminalId,
                        principalTable: "Connector",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Interface_Connector_OutputTerminalId",
                        column: x => x.OutputTerminalId,
                        principalTable: "Connector",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Interface_Enum_StatusId",
                        column: x => x.StatusId,
                        principalTable: "Enum",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Transport",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Iri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Version = table.Column<string>(type: "nvarchar(max)", nullable: false, defaultValue: "1.0"),
                    Rds = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Label = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StatusId = table.Column<string>(type: "nvarchar(450)", nullable: false, defaultValue: "4590637F39B6BA6F39C74293BE9138DF"),
                    SemanticReference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InputTerminalId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    OutputTerminalId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Updated = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LibraryTypeId = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transport", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Transport_Connector_InputTerminalId",
                        column: x => x.InputTerminalId,
                        principalTable: "Connector",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Transport_Connector_OutputTerminalId",
                        column: x => x.OutputTerminalId,
                        principalTable: "Connector",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Transport_Enum_StatusId",
                        column: x => x.StatusId,
                        principalTable: "Enum",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "AttributeType_Unit",
                columns: table => new
                {
                    AttributeTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UnitId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttributeType_Unit", x => new { x.AttributeTypeId, x.UnitId });
                    table.ForeignKey(
                        name: "FK_AttributeType_Unit_AttributeType_AttributeTypeId",
                        column: x => x.AttributeTypeId,
                        principalTable: "AttributeType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AttributeType_Unit_Enum_UnitId",
                        column: x => x.UnitId,
                        principalTable: "Enum",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NodeType_AttributeType",
                columns: table => new
                {
                    AttributeTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    NodeTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NodeType_AttributeType", x => new { x.AttributeTypeId, x.NodeTypeId });
                    table.ForeignKey(
                        name: "FK_NodeType_AttributeType_AttributeType_AttributeTypeId",
                        column: x => x.AttributeTypeId,
                        principalTable: "AttributeType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NodeType_AttributeType_LibraryType_NodeTypeId",
                        column: x => x.NodeTypeId,
                        principalTable: "LibraryType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SimpleType_AttributeType",
                columns: table => new
                {
                    AttributeTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SimpleTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SimpleType_AttributeType", x => new { x.AttributeTypeId, x.SimpleTypeId });
                    table.ForeignKey(
                        name: "FK_SimpleType_AttributeType_AttributeType_AttributeTypeId",
                        column: x => x.AttributeTypeId,
                        principalTable: "AttributeType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SimpleType_AttributeType_SimpleType_SimpleTypeId",
                        column: x => x.SimpleTypeId,
                        principalTable: "SimpleType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TerminalType_AttributeType",
                columns: table => new
                {
                    AttributeTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TerminalTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TerminalType_AttributeType", x => new { x.AttributeTypeId, x.TerminalTypeId });
                    table.ForeignKey(
                        name: "FK_TerminalType_AttributeType_AttributeType_AttributeTypeId",
                        column: x => x.AttributeTypeId,
                        principalTable: "AttributeType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TerminalType_AttributeType_TerminalType_TerminalTypeId",
                        column: x => x.TerminalTypeId,
                        principalTable: "TerminalType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TransportType_AttributeType",
                columns: table => new
                {
                    AttributeTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TransportTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransportType_AttributeType", x => new { x.AttributeTypeId, x.TransportTypeId });
                    table.ForeignKey(
                        name: "FK_TransportType_AttributeType_AttributeType_AttributeTypeId",
                        column: x => x.AttributeTypeId,
                        principalTable: "AttributeType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TransportType_AttributeType_LibraryType_TransportTypeId",
                        column: x => x.TransportTypeId,
                        principalTable: "LibraryType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Attribute",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Iri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Entity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SemanticReference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AttributeTypeId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsLocked = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    IsLockedStatusBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsLockedStatusDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SelectedUnitId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QualifierId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    SourceId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ConditionId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    FormatId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Tags = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SelectValuesString = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SelectType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Discipline = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UnitString = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TerminalId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    NodeId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    NodeIri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TransportId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    InterfaceId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    SimpleId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attribute", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Attribute_Connector_TerminalId",
                        column: x => x.TerminalId,
                        principalTable: "Connector",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Attribute_Enum_ConditionId",
                        column: x => x.ConditionId,
                        principalTable: "Enum",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Attribute_Enum_FormatId",
                        column: x => x.FormatId,
                        principalTable: "Enum",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Attribute_Enum_QualifierId",
                        column: x => x.QualifierId,
                        principalTable: "Enum",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Attribute_Enum_SourceId",
                        column: x => x.SourceId,
                        principalTable: "Enum",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Attribute_Interface_InterfaceId",
                        column: x => x.InterfaceId,
                        principalTable: "Interface",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Attribute_Node_NodeId",
                        column: x => x.NodeId,
                        principalTable: "Node",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Attribute_Simple_SimpleId",
                        column: x => x.SimpleId,
                        principalTable: "Simple",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Attribute_Transport_TransportId",
                        column: x => x.TransportId,
                        principalTable: "Transport",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Edge",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Iri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FromConnectorId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FromConnectorIri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ToConnectorId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ToConnectorIri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FromNodeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FromNodeIri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ToNodeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ToNodeIri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TransportId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    InterfaceId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    IsLocked = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    IsLockedStatusBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsLockedStatusDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    MasterProjectId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MasterProjectIri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Edge", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Edge_Connector_FromConnectorId",
                        column: x => x.FromConnectorId,
                        principalTable: "Connector",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Edge_Connector_ToConnectorId",
                        column: x => x.ToConnectorId,
                        principalTable: "Connector",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Edge_Interface_InterfaceId",
                        column: x => x.InterfaceId,
                        principalTable: "Interface",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Edge_Node_FromNodeId",
                        column: x => x.FromNodeId,
                        principalTable: "Node",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Edge_Node_ToNodeId",
                        column: x => x.ToNodeId,
                        principalTable: "Node",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Edge_Project_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Edge_Transport_TransportId",
                        column: x => x.TransportId,
                        principalTable: "Transport",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_ConditionId",
                table: "Attribute",
                column: "ConditionId");

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_FormatId",
                table: "Attribute",
                column: "FormatId");

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_InterfaceId",
                table: "Attribute",
                column: "InterfaceId");

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_NodeId",
                table: "Attribute",
                column: "NodeId");

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_QualifierId",
                table: "Attribute",
                column: "QualifierId");

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_SimpleId",
                table: "Attribute",
                column: "SimpleId");

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_SourceId",
                table: "Attribute",
                column: "SourceId");

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_TerminalId",
                table: "Attribute",
                column: "TerminalId");

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_TransportId",
                table: "Attribute",
                column: "TransportId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributeType_ConditionId",
                table: "AttributeType",
                column: "ConditionId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributeType_FormatId",
                table: "AttributeType",
                column: "FormatId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributeType_InterfaceTypeId",
                table: "AttributeType",
                column: "InterfaceTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributeType_QualifierId",
                table: "AttributeType",
                column: "QualifierId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributeType_SourceId",
                table: "AttributeType",
                column: "SourceId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributeType_Unit_UnitId",
                table: "AttributeType_Unit",
                column: "UnitId");

            migrationBuilder.CreateIndex(
                name: "IX_CollaborationPartner_Domain",
                table: "CollaborationPartner",
                column: "Domain",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Connector_NodeId",
                table: "Connector",
                column: "NodeId");

            migrationBuilder.CreateIndex(
                name: "IX_Connector_Terminal_CategoryId",
                table: "Connector",
                column: "Terminal_CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Edge_FromConnectorId",
                table: "Edge",
                column: "FromConnectorId");

            migrationBuilder.CreateIndex(
                name: "IX_Edge_FromNodeId",
                table: "Edge",
                column: "FromNodeId");

            migrationBuilder.CreateIndex(
                name: "IX_Edge_InterfaceId",
                table: "Edge",
                column: "InterfaceId");

            migrationBuilder.CreateIndex(
                name: "IX_Edge_ProjectId",
                table: "Edge",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Edge_ToConnectorId",
                table: "Edge",
                column: "ToConnectorId");

            migrationBuilder.CreateIndex(
                name: "IX_Edge_ToNodeId",
                table: "Edge",
                column: "ToNodeId");

            migrationBuilder.CreateIndex(
                name: "IX_Edge_TransportId",
                table: "Edge",
                column: "TransportId");

            migrationBuilder.CreateIndex(
                name: "IX_Enum_ParentId",
                table: "Enum",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_Interface_InputTerminalId",
                table: "Interface",
                column: "InputTerminalId");

            migrationBuilder.CreateIndex(
                name: "IX_Interface_OutputTerminalId",
                table: "Interface",
                column: "OutputTerminalId");

            migrationBuilder.CreateIndex(
                name: "IX_Interface_StatusId",
                table: "Interface",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryType_InterfaceType_TerminalTypeId",
                table: "LibraryType",
                column: "InterfaceType_TerminalTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryType_PurposeId",
                table: "LibraryType",
                column: "PurposeId");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryType_RdsId",
                table: "LibraryType",
                column: "RdsId");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryType_StatusId",
                table: "LibraryType",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryType_TransportType_TerminalTypeId",
                table: "LibraryType",
                column: "TransportType_TerminalTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Node_ProjectId",
                table: "Node",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Node_StatusId",
                table: "Node",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_NodeType_AttributeType_NodeTypeId",
                table: "NodeType_AttributeType",
                column: "NodeTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_NodeType_TerminalType_NodeTypeId",
                table: "NodeType_TerminalType",
                column: "NodeTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_NodeType_TerminalType_TerminalTypeId",
                table: "NodeType_TerminalType",
                column: "TerminalTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Rds_RdsCategoryId",
                table: "Rds",
                column: "RdsCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Simple_NodeId",
                table: "Simple",
                column: "NodeId");

            migrationBuilder.CreateIndex(
                name: "IX_SimpleType_AttributeType_SimpleTypeId",
                table: "SimpleType_AttributeType",
                column: "SimpleTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_SimpleType_NodeType_SimpleTypeId",
                table: "SimpleType_NodeType",
                column: "SimpleTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_TerminalType_TerminalCategoryId",
                table: "TerminalType",
                column: "TerminalCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_TerminalType_AttributeType_TerminalTypeId",
                table: "TerminalType_AttributeType",
                column: "TerminalTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Transport_InputTerminalId",
                table: "Transport",
                column: "InputTerminalId");

            migrationBuilder.CreateIndex(
                name: "IX_Transport_OutputTerminalId",
                table: "Transport",
                column: "OutputTerminalId");

            migrationBuilder.CreateIndex(
                name: "IX_Transport_StatusId",
                table: "Transport",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_TransportType_AttributeType_TransportTypeId",
                table: "TransportType_AttributeType",
                column: "TransportTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Attribute");

            migrationBuilder.DropTable(
                name: "AttributeType_Unit");

            migrationBuilder.DropTable(
                name: "BlobData");

            migrationBuilder.DropTable(
                name: "CollaborationPartner");

            migrationBuilder.DropTable(
                name: "Edge");

            migrationBuilder.DropTable(
                name: "NodeType_AttributeType");

            migrationBuilder.DropTable(
                name: "NodeType_TerminalType");

            migrationBuilder.DropTable(
                name: "PredefinedAttribute");

            migrationBuilder.DropTable(
                name: "SimpleType_AttributeType");

            migrationBuilder.DropTable(
                name: "SimpleType_NodeType");

            migrationBuilder.DropTable(
                name: "TerminalType_AttributeType");

            migrationBuilder.DropTable(
                name: "TransportType_AttributeType");

            migrationBuilder.DropTable(
                name: "Version");

            migrationBuilder.DropTable(
                name: "Simple");

            migrationBuilder.DropTable(
                name: "Interface");

            migrationBuilder.DropTable(
                name: "Transport");

            migrationBuilder.DropTable(
                name: "SimpleType");

            migrationBuilder.DropTable(
                name: "AttributeType");

            migrationBuilder.DropTable(
                name: "Connector");

            migrationBuilder.DropTable(
                name: "LibraryType");

            migrationBuilder.DropTable(
                name: "Node");

            migrationBuilder.DropTable(
                name: "Rds");

            migrationBuilder.DropTable(
                name: "TerminalType");

            migrationBuilder.DropTable(
                name: "Project");

            migrationBuilder.DropTable(
                name: "Enum");
        }
    }
}