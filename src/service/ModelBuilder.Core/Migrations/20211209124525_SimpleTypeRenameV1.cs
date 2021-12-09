using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class SimpleTypeRenameV1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attribute_Composite_CompositeId",
                table: "Attribute");

            migrationBuilder.DropTable(
                name: "Composite");

            migrationBuilder.DropTable(
                name: "CompositeType_AttributeType");

            migrationBuilder.DropTable(
                name: "CompositeType_NodeType");

            migrationBuilder.DropTable(
                name: "CompositeType");

            migrationBuilder.RenameColumn(
                name: "CompositeId",
                table: "Attribute",
                newName: "SimpleId");

            migrationBuilder.RenameIndex(
                name: "IX_Attribute_CompositeId",
                table: "Attribute",
                newName: "IX_Attribute_SimpleId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Attribute_Simple_SimpleId",
                table: "Attribute",
                column: "SimpleId",
                principalTable: "Simple",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attribute_Simple_SimpleId",
                table: "Attribute");

            migrationBuilder.DropTable(
                name: "Simple");

            migrationBuilder.DropTable(
                name: "SimpleType_AttributeType");

            migrationBuilder.DropTable(
                name: "SimpleType_NodeType");

            migrationBuilder.DropTable(
                name: "SimpleType");

            migrationBuilder.RenameColumn(
                name: "SimpleId",
                table: "Attribute",
                newName: "CompositeId");

            migrationBuilder.RenameIndex(
                name: "IX_Attribute_SimpleId",
                table: "Attribute",
                newName: "IX_Attribute_CompositeId");

            migrationBuilder.CreateTable(
                name: "Composite",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    NodeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SemanticReference = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Composite", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Composite_Node_NodeId",
                        column: x => x.NodeId,
                        principalTable: "Node",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CompositeType",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SemanticReference = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompositeType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CompositeType_AttributeType",
                columns: table => new
                {
                    AttributeTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CompositeTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompositeType_AttributeType", x => new { x.AttributeTypeId, x.CompositeTypeId });
                    table.ForeignKey(
                        name: "FK_CompositeType_AttributeType_AttributeType_AttributeTypeId",
                        column: x => x.AttributeTypeId,
                        principalTable: "AttributeType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CompositeType_AttributeType_CompositeType_CompositeTypeId",
                        column: x => x.CompositeTypeId,
                        principalTable: "CompositeType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompositeType_NodeType",
                columns: table => new
                {
                    CompositeTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    NodeTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompositeType_NodeType", x => new { x.CompositeTypeId, x.NodeTypeId });
                    table.ForeignKey(
                        name: "FK_CompositeType_NodeType_CompositeType_CompositeTypeId",
                        column: x => x.CompositeTypeId,
                        principalTable: "CompositeType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CompositeType_NodeType_LibraryType_NodeTypeId",
                        column: x => x.NodeTypeId,
                        principalTable: "LibraryType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Composite_NodeId",
                table: "Composite",
                column: "NodeId");

            migrationBuilder.CreateIndex(
                name: "IX_CompositeType_AttributeType_CompositeTypeId",
                table: "CompositeType_AttributeType",
                column: "CompositeTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_CompositeType_NodeType_NodeTypeId",
                table: "CompositeType_NodeType",
                column: "NodeTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Attribute_Composite_CompositeId",
                table: "Attribute",
                column: "CompositeId",
                principalTable: "Composite",
                principalColumn: "Id");
        }
    }
}
