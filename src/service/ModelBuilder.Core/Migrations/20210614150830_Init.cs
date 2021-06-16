using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Contractor",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Domain = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contractor", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Edge",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FromConnector = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ToConnector = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FromNode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ToNode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ParentType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TargetType = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Edge", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Enum",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InternalType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SemanticReference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enum", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Project",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ParentId = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                name: "AttributeType",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Entity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Aspect = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    QualifierId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    SourceId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ConditionId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    FormatId = table.Column<string>(type: "nvarchar(450)", nullable: true)
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
                });

            migrationBuilder.CreateTable(
                name: "Node",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Rds = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Contractor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SemanticId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TagNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Label = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PositionX = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    PositionY = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    IsLocked = table.Column<bool>(type: "bit", nullable: false),
                    IsSelected = table.Column<bool>(type: "bit", nullable: false),
                    PositionBlockX = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    PositionBlockY = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    Length = table.Column<int>(type: "int", nullable: false),
                    Width = table.Column<int>(type: "int", nullable: false),
                    Height = table.Column<int>(type: "int", nullable: false),
                    Level = table.Column<int>(type: "int", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false),
                    StatusId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Version = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Node", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Node_Enum_StatusId",
                        column: x => x.StatusId,
                        principalTable: "Enum",
                        principalColumn: "Id");
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
                name: "ProjectEdge",
                columns: table => new
                {
                    EdgeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProjectId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectEdge", x => new { x.EdgeId, x.ProjectId });
                    table.ForeignKey(
                        name: "FK_ProjectEdge_Edge_EdgeId",
                        column: x => x.EdgeId,
                        principalTable: "Edge",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectEdge_Project_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AttributeTypeUnit",
                columns: table => new
                {
                    AttributeTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UnitId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttributeTypeUnit", x => new { x.AttributeTypeId, x.UnitId });
                    table.ForeignKey(
                        name: "FK_AttributeTypeUnit_AttributeType_AttributeTypeId",
                        column: x => x.AttributeTypeId,
                        principalTable: "AttributeType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AttributeTypeUnit_Enum_UnitId",
                        column: x => x.UnitId,
                        principalTable: "Enum",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Connector",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SemanticReference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NodeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RelationType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TerminalCategoryId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Connector", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Connector_Enum_TerminalCategoryId",
                        column: x => x.TerminalCategoryId,
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
                name: "ProjectNode",
                columns: table => new
                {
                    NodeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProjectId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectNode", x => new { x.NodeId, x.ProjectId });
                    table.ForeignKey(
                        name: "FK_ProjectNode_Node_NodeId",
                        column: x => x.NodeId,
                        principalTable: "Node",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectNode_Project_ProjectId",
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
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SemanticReference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RdsId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InterfaceType_TerminalTypeId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Aspect = table.Column<int>(type: "int", nullable: true),
                    TransportType_TerminalTypeId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LibraryType", x => x.Id);
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
                name: "TerminalTypeAttributeType",
                columns: table => new
                {
                    AttributeTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TerminalTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TerminalTypeAttributeType", x => new { x.AttributeTypeId, x.TerminalTypeId });
                    table.ForeignKey(
                        name: "FK_TerminalTypeAttributeType_AttributeType_AttributeTypeId",
                        column: x => x.AttributeTypeId,
                        principalTable: "AttributeType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TerminalTypeAttributeType_TerminalType_TerminalTypeId",
                        column: x => x.TerminalTypeId,
                        principalTable: "TerminalType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Attribute",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Key = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SelectedUnitId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QualifierId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    SourceId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ConditionId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    FormatId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    TerminalId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    NodeId = table.Column<string>(type: "nvarchar(450)", nullable: true)
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
                        name: "FK_Attribute_Node_NodeId",
                        column: x => x.NodeId,
                        principalTable: "Node",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "NodeTypeAttributeType",
                columns: table => new
                {
                    AttributeTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    NodeTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NodeTypeAttributeType", x => new { x.AttributeTypeId, x.NodeTypeId });
                    table.ForeignKey(
                        name: "FK_NodeTypeAttributeType_AttributeType_AttributeTypeId",
                        column: x => x.AttributeTypeId,
                        principalTable: "AttributeType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NodeTypeAttributeType_LibraryType_NodeTypeId",
                        column: x => x.NodeTypeId,
                        principalTable: "LibraryType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NodeTypeTerminalType",
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
                    table.PrimaryKey("PK_NodeTypeTerminalType", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NodeTypeTerminalType_LibraryType_NodeTypeId",
                        column: x => x.NodeTypeId,
                        principalTable: "LibraryType",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_NodeTypeTerminalType_TerminalType_TerminalTypeId",
                        column: x => x.TerminalTypeId,
                        principalTable: "TerminalType",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TransportTypeAttributeType",
                columns: table => new
                {
                    AttributeTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TransportTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransportTypeAttributeType", x => new { x.AttributeTypeId, x.TransportTypeId });
                    table.ForeignKey(
                        name: "FK_TransportTypeAttributeType_AttributeType_AttributeTypeId",
                        column: x => x.AttributeTypeId,
                        principalTable: "AttributeType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TransportTypeAttributeType_LibraryType_TransportTypeId",
                        column: x => x.TransportTypeId,
                        principalTable: "LibraryType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AttributeUnit",
                columns: table => new
                {
                    AttributeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UnitId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttributeUnit", x => new { x.AttributeId, x.UnitId });
                    table.ForeignKey(
                        name: "FK_AttributeUnit_Attribute_AttributeId",
                        column: x => x.AttributeId,
                        principalTable: "Attribute",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AttributeUnit_Enum_UnitId",
                        column: x => x.UnitId,
                        principalTable: "Enum",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                name: "IX_Attribute_NodeId",
                table: "Attribute",
                column: "NodeId");

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_QualifierId",
                table: "Attribute",
                column: "QualifierId");

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_SourceId",
                table: "Attribute",
                column: "SourceId");

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_TerminalId",
                table: "Attribute",
                column: "TerminalId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributeType_ConditionId",
                table: "AttributeType",
                column: "ConditionId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributeType_FormatId",
                table: "AttributeType",
                column: "FormatId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributeType_QualifierId",
                table: "AttributeType",
                column: "QualifierId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributeType_SourceId",
                table: "AttributeType",
                column: "SourceId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributeTypeUnit_UnitId",
                table: "AttributeTypeUnit",
                column: "UnitId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributeUnit_UnitId",
                table: "AttributeUnit",
                column: "UnitId");

            migrationBuilder.CreateIndex(
                name: "IX_Connector_NodeId",
                table: "Connector",
                column: "NodeId");

            migrationBuilder.CreateIndex(
                name: "IX_Connector_TerminalCategoryId",
                table: "Connector",
                column: "TerminalCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryType_InterfaceType_TerminalTypeId",
                table: "LibraryType",
                column: "InterfaceType_TerminalTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryType_RdsId",
                table: "LibraryType",
                column: "RdsId");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryType_TransportType_TerminalTypeId",
                table: "LibraryType",
                column: "TransportType_TerminalTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Node_StatusId",
                table: "Node",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_NodeTypeAttributeType_NodeTypeId",
                table: "NodeTypeAttributeType",
                column: "NodeTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_NodeTypeTerminalType_NodeTypeId",
                table: "NodeTypeTerminalType",
                column: "NodeTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_NodeTypeTerminalType_TerminalTypeId",
                table: "NodeTypeTerminalType",
                column: "TerminalTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectEdge_ProjectId",
                table: "ProjectEdge",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectNode_ProjectId",
                table: "ProjectNode",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Rds_RdsCategoryId",
                table: "Rds",
                column: "RdsCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_TerminalType_TerminalCategoryId",
                table: "TerminalType",
                column: "TerminalCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_TerminalTypeAttributeType_TerminalTypeId",
                table: "TerminalTypeAttributeType",
                column: "TerminalTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_TransportTypeAttributeType_TransportTypeId",
                table: "TransportTypeAttributeType",
                column: "TransportTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AttributeTypeUnit");

            migrationBuilder.DropTable(
                name: "AttributeUnit");

            migrationBuilder.DropTable(
                name: "Contractor");

            migrationBuilder.DropTable(
                name: "NodeTypeAttributeType");

            migrationBuilder.DropTable(
                name: "NodeTypeTerminalType");

            migrationBuilder.DropTable(
                name: "ProjectEdge");

            migrationBuilder.DropTable(
                name: "ProjectNode");

            migrationBuilder.DropTable(
                name: "TerminalTypeAttributeType");

            migrationBuilder.DropTable(
                name: "TransportTypeAttributeType");

            migrationBuilder.DropTable(
                name: "Attribute");

            migrationBuilder.DropTable(
                name: "Edge");

            migrationBuilder.DropTable(
                name: "Project");

            migrationBuilder.DropTable(
                name: "AttributeType");

            migrationBuilder.DropTable(
                name: "LibraryType");

            migrationBuilder.DropTable(
                name: "Connector");

            migrationBuilder.DropTable(
                name: "Rds");

            migrationBuilder.DropTable(
                name: "TerminalType");

            migrationBuilder.DropTable(
                name: "Node");

            migrationBuilder.DropTable(
                name: "Enum");
        }
    }
}
