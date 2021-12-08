using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class IriSupportV1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Domain",
                table: "Project");

            migrationBuilder.DropColumn(
                name: "Domain",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "Domain",
                table: "Edge");

            migrationBuilder.DropColumn(
                name: "Domain",
                table: "Connector");

            migrationBuilder.DropColumn(
                name: "Domain",
                table: "Attribute");

            migrationBuilder.AddColumn<string>(
                name: "Iri",
                table: "Transport",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Iri",
                table: "Interface",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Iri",
                table: "Transport");

            migrationBuilder.DropColumn(
                name: "Iri",
                table: "Interface");

            migrationBuilder.AddColumn<string>(
                name: "Domain",
                table: "Project",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Domain",
                table: "Node",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Domain",
                table: "Edge",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Domain",
                table: "Connector",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Domain",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
