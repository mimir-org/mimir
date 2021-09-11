using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class Composites : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CompositeId",
                table: "Attribute",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Composite",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SemanticReference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NodeId = table.Column<string>(type: "nvarchar(450)", nullable: false)
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
                name: "IX_Attribute_CompositeId",
                table: "Attribute",
                column: "CompositeId");

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropIndex(
                name: "IX_Attribute_CompositeId",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "CompositeId",
                table: "Attribute");
        }
    }
}
