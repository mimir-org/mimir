using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class TerminalParentData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TerminalCategory",
                table: "Connector",
                newName: "TerminalParentTypeName");

            migrationBuilder.AddColumn<string>(
                name: "TerminalParentTypeId",
                table: "Connector",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TerminalParentTypeIri",
                table: "Connector",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TerminalParentTypeId",
                table: "Connector");

            migrationBuilder.DropColumn(
                name: "TerminalParentTypeIri",
                table: "Connector");

            migrationBuilder.RenameColumn(
                name: "TerminalParentTypeName",
                table: "Connector",
                newName: "TerminalCategory");
        }
    }
}