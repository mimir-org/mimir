using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class LibraryTypeVersion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TypeId",
                table: "LibraryType",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Version",
                table: "LibraryType",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TypeId",
                table: "LibraryType");

            migrationBuilder.DropColumn(
                name: "Version",
                table: "LibraryType");
        }
    }
}
