using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class LibraryTypePurpose : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PurposeId",
                table: "LibraryType",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_LibraryType_PurposeId",
                table: "LibraryType",
                column: "PurposeId");

            migrationBuilder.AddForeignKey(
                name: "FK_LibraryType_Enum_PurposeId",
                table: "LibraryType",
                column: "PurposeId",
                principalTable: "Enum",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LibraryType_Enum_PurposeId",
                table: "LibraryType");

            migrationBuilder.DropIndex(
                name: "IX_LibraryType_PurposeId",
                table: "LibraryType");

            migrationBuilder.DropColumn(
                name: "PurposeId",
                table: "LibraryType");
        }
    }
}
