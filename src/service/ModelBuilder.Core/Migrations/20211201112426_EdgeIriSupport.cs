using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class EdgeIriSupport : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FromConnectorIri",
                table: "Edge",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FromNodeIri",
                table: "Edge",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ToConnectorIri",
                table: "Edge",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ToNodeIri",
                table: "Edge",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FromConnectorIri",
                table: "Edge");

            migrationBuilder.DropColumn(
                name: "FromNodeIri",
                table: "Edge");

            migrationBuilder.DropColumn(
                name: "ToConnectorIri",
                table: "Edge");

            migrationBuilder.DropColumn(
                name: "ToNodeIri",
                table: "Edge");
        }
    }
}
