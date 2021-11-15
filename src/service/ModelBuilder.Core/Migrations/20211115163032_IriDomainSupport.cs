using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class IriDomainSupport : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Contractor",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "TagNumber",
                table: "Node");

            migrationBuilder.AddColumn<string>(
                name: "Domain",
                table: "Project",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Iri",
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
                name: "Iri",
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
                name: "Iri",
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
                name: "Iri",
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

            migrationBuilder.AddColumn<string>(
                name: "Iri",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Domain",
                table: "Project");

            migrationBuilder.DropColumn(
                name: "Iri",
                table: "Project");

            migrationBuilder.DropColumn(
                name: "Domain",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "Iri",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "Domain",
                table: "Edge");

            migrationBuilder.DropColumn(
                name: "Iri",
                table: "Edge");

            migrationBuilder.DropColumn(
                name: "Domain",
                table: "Connector");

            migrationBuilder.DropColumn(
                name: "Iri",
                table: "Connector");

            migrationBuilder.DropColumn(
                name: "Domain",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "Iri",
                table: "Attribute");

            migrationBuilder.AddColumn<string>(
                name: "Contractor",
                table: "Node",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TagNumber",
                table: "Node",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
