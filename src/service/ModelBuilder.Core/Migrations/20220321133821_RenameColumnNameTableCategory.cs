using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class RenameColumnNameTableCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Connector_Enum_Terminal_CategoryId",
                table: "Connector");

            migrationBuilder.RenameColumn(
                name: "Terminal_CategoryId",
                table: "Connector",
                newName: "TerminalCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Connector_Terminal_CategoryId",
                table: "Connector",
                newName: "IX_Connector_TerminalCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Connector_Enum_TerminalCategoryId",
                table: "Connector",
                column: "TerminalCategoryId",
                principalTable: "Enum",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Connector_Enum_TerminalCategoryId",
                table: "Connector");

            migrationBuilder.RenameColumn(
                name: "TerminalCategoryId",
                table: "Connector",
                newName: "Terminal_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Connector_TerminalCategoryId",
                table: "Connector",
                newName: "IX_Connector_Terminal_CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Connector_Enum_Terminal_CategoryId",
                table: "Connector",
                column: "Terminal_CategoryId",
                principalTable: "Enum",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}