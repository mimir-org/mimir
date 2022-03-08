using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class Attribute_Iris_2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SemanticReference",
                table: "TerminalType");

            migrationBuilder.RenameColumn(
                name: "SemanticReference",
                table: "Connector",
                newName: "TerminalTypeIri");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TerminalTypeIri",
                table: "Connector",
                newName: "SemanticReference");

            migrationBuilder.AddColumn<string>(
                name: "SemanticReference",
                table: "TerminalType",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
