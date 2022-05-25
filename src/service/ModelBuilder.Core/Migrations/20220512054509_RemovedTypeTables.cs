using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class RemovedTypeTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Interface_Enum_StatusId",
                table: "Interface");

            migrationBuilder.DropForeignKey(
                name: "FK_Node_Enum_StatusId",
                table: "Node");

            migrationBuilder.DropForeignKey(
                name: "FK_Transport_Enum_StatusId",
                table: "Transport");

            migrationBuilder.DropTable(
                name: "AttributeType_Unit");

            migrationBuilder.DropTable(
                name: "BlobData");

            migrationBuilder.DropTable(
                name: "NodeType_AttributeType");

            migrationBuilder.DropTable(
                name: "NodeType_TerminalType");

            migrationBuilder.DropTable(
                name: "PredefinedAttribute");

            migrationBuilder.DropTable(
                name: "Rds");

            migrationBuilder.DropTable(
                name: "SimpleType_AttributeType");

            migrationBuilder.DropTable(
                name: "SimpleType_NodeType");

            migrationBuilder.DropTable(
                name: "TerminalType_AttributeType");

            migrationBuilder.DropTable(
                name: "TransportType_AttributeType");

            migrationBuilder.DropTable(
                name: "SimpleType");

            migrationBuilder.DropTable(
                name: "AttributeType");

            migrationBuilder.DropTable(
                name: "LibraryType");

            migrationBuilder.DropTable(
                name: "Enum");

            migrationBuilder.DropTable(
                name: "TerminalType");

            migrationBuilder.DropIndex(
                name: "IX_Transport_StatusId",
                table: "Transport");

            migrationBuilder.DropIndex(
                name: "IX_Node_StatusId",
                table: "Node");

            migrationBuilder.DropIndex(
                name: "IX_Interface_StatusId",
                table: "Interface");

            migrationBuilder.DropColumn(
                name: "Tags",
                table: "Attribute");

            migrationBuilder.AlterColumn<string>(
                name: "StatusId",
                table: "Transport",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "4590637F39B6BA6F39C74293BE9138DF",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldDefaultValue: "4590637F39B6BA6F39C74293BE9138DF");

            migrationBuilder.AlterColumn<string>(
                name: "StatusId",
                table: "Node",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "StatusId",
                table: "Interface",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "4590637F39B6BA6F39C74293BE9138DF",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldDefaultValue: "4590637F39B6BA6F39C74293BE9138DF");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "StatusId",
                table: "Transport",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "4590637F39B6BA6F39C74293BE9138DF",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldDefaultValue: "4590637F39B6BA6F39C74293BE9138DF");

            migrationBuilder.AlterColumn<string>(
                name: "StatusId",
                table: "Node",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "StatusId",
                table: "Interface",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "4590637F39B6BA6F39C74293BE9138DF",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldDefaultValue: "4590637F39B6BA6F39C74293BE9138DF");

            migrationBuilder.AddColumn<string>(
                name: "Tags",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BlobData",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Data = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Discipline = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlobData", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Enum",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ParentId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Aspect = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InternalType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SemanticReference = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    IsMultiSelect = table.Column<bool>(type: "bit", nullable: false),
                    Values = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PredefinedAttribute", x => x.Key);
                });

            migrationBuilder.CreateTable(
                name: "Rds",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Iri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rds", x => x.Id);
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
                name: "TerminalType",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TerminalCategory = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TerminalType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LibraryType",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PurposeId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Aspect = table.Column<int>(type: "int", nullable: false),
                    BuildStatusId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc)),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false, defaultValue: "Unknown"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RdsId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RdsName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SemanticReference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StatusId = table.Column<string>(type: "nvarchar(max)", nullable: false, defaultValue: "4590637F39B6BA6F39C74293BE9138DF"),
                    TypeId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Version = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InterfaceType_TerminalTypeId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    LocationType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PredefinedAttributeData = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SymbolId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TransportType_TerminalTypeId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LibraryType", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LibraryType_Enum_BuildStatusId",
                        column: x => x.BuildStatusId,
                        principalTable: "Enum",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LibraryType_Enum_PurposeId",
                        column: x => x.PurposeId,
                        principalTable: "Enum",
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
                name: "AttributeType",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ConditionId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    FormatId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    QualifierId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    SourceId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Aspect = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Discipline = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Entity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InterfaceTypeId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    SelectType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SelectValuesString = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tags = table.Column<string>(type: "nvarchar(max)", nullable: true)
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
                    NodeTypeId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    TerminalTypeId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ConnectorType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Number = table.Column<int>(type: "int", nullable: false, defaultValue: 1)
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

            migrationBuilder.CreateIndex(
                name: "IX_Transport_StatusId",
                table: "Transport",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Node_StatusId",
                table: "Node",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Interface_StatusId",
                table: "Interface",
                column: "StatusId");

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
                name: "IX_Enum_ParentId",
                table: "Enum",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryType_BuildStatusId",
                table: "LibraryType",
                column: "BuildStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryType_InterfaceType_TerminalTypeId",
                table: "LibraryType",
                column: "InterfaceType_TerminalTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryType_PurposeId",
                table: "LibraryType",
                column: "PurposeId");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryType_TransportType_TerminalTypeId",
                table: "LibraryType",
                column: "TransportType_TerminalTypeId");

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
                name: "IX_SimpleType_AttributeType_SimpleTypeId",
                table: "SimpleType_AttributeType",
                column: "SimpleTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_SimpleType_NodeType_SimpleTypeId",
                table: "SimpleType_NodeType",
                column: "SimpleTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_TerminalType_AttributeType_TerminalTypeId",
                table: "TerminalType_AttributeType",
                column: "TerminalTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_TransportType_AttributeType_TransportTypeId",
                table: "TransportType_AttributeType",
                column: "TransportTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Interface_Enum_StatusId",
                table: "Interface",
                column: "StatusId",
                principalTable: "Enum",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Node_Enum_StatusId",
                table: "Node",
                column: "StatusId",
                principalTable: "Enum",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Transport_Enum_StatusId",
                table: "Transport",
                column: "StatusId",
                principalTable: "Enum",
                principalColumn: "Id");
        }
    }
}