using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class TerminalCategoryChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Connector_Enum_TerminalCategoryId",
                table: "Connector");

            migrationBuilder.DropForeignKey(
                name: "FK_TerminalType_Enum_TerminalCategoryId",
                table: "TerminalType");

            migrationBuilder.DropIndex(
                name: "IX_TerminalType_TerminalCategoryId",
                table: "TerminalType");

            migrationBuilder.DropIndex(
                name: "IX_Connector_TerminalCategoryId",
                table: "Connector");

            migrationBuilder.DropColumn(
                name: "TerminalCategoryId",
                table: "TerminalType");

            migrationBuilder.DropColumn(
                name: "TerminalCategoryId",
                table: "Connector");

            migrationBuilder.AddColumn<string>(
                name: "TerminalCategory",
                table: "TerminalType",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TerminalCategory",
                table: "Connector",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TerminalCategory",
                table: "TerminalType");

            migrationBuilder.DropColumn(
                name: "TerminalCategory",
                table: "Connector");

            migrationBuilder.AddColumn<string>(
                name: "TerminalCategoryId",
                table: "TerminalType",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TerminalCategoryId",
                table: "Connector",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TerminalType_TerminalCategoryId",
                table: "TerminalType",
                column: "TerminalCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Connector_TerminalCategoryId",
                table: "Connector",
                column: "TerminalCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Connector_Enum_TerminalCategoryId",
                table: "Connector",
                column: "TerminalCategoryId",
                principalTable: "Enum",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TerminalType_Enum_TerminalCategoryId",
                table: "TerminalType",
                column: "TerminalCategoryId",
                principalTable: "Enum",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}