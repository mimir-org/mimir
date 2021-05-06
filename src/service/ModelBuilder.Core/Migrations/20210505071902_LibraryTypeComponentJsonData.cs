using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class LibraryTypeComponentJsonData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Terminals",
                table: "LibraryTypeComponent",
                newName: "TerminalJson");

            migrationBuilder.RenameColumn(
                name: "Attributes",
                table: "LibraryTypeComponent",
                newName: "AttributeJson");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TerminalJson",
                table: "LibraryTypeComponent",
                newName: "Terminals");

            migrationBuilder.RenameColumn(
                name: "AttributeJson",
                table: "LibraryTypeComponent",
                newName: "Attributes");
        }
    }
}
