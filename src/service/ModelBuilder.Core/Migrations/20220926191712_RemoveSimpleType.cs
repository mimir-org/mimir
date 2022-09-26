using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class RemoveSimpleType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attribute_Simple_SimpleId",
                table: "Attribute");

            migrationBuilder.DropTable(
                name: "Simple");

            migrationBuilder.DropIndex(
                name: "IX_Attribute_SimpleId",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "SimpleId",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "SimpleIri",
                table: "Attribute");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SimpleId",
                table: "Attribute",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SimpleIri",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Simple",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    NodeId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Iri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NodeIri = table.Column<string>(type: "nvarchar(max)", nullable: true)
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

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_SimpleId",
                table: "Attribute",
                column: "SimpleId");

            migrationBuilder.CreateIndex(
                name: "IX_Simple_NodeId",
                table: "Simple",
                column: "NodeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Attribute_Simple_SimpleId",
                table: "Attribute",
                column: "SimpleId",
                principalTable: "Simple",
                principalColumn: "Id");
        }
    }
}