using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class Attribute_Iris : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SemanticReference",
                table: "Attribute",
                newName: "TransportIri");

            migrationBuilder.AddColumn<string>(
                name: "AttributeTypeIri",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InterfaceIri",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SimpleIri",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TerminalIri",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AttributeTypeIri",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "InterfaceIri",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "SimpleIri",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "TerminalIri",
                table: "Attribute");

            migrationBuilder.RenameColumn(
                name: "TransportIri",
                table: "Attribute",
                newName: "SemanticReference");
        }
    }
}
