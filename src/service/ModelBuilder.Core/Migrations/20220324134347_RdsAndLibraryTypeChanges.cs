using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class RdsAndLibraryTypeChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LibraryType_Enum_StatusId",
                table: "LibraryType");

            migrationBuilder.DropForeignKey(
                name: "FK_LibraryType_Rds_RdsId",
                table: "LibraryType");

            migrationBuilder.DropIndex(
                name: "IX_LibraryType_RdsId",
                table: "LibraryType");

            migrationBuilder.DropIndex(
                name: "IX_LibraryType_StatusId",
                table: "LibraryType");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "Rds");

            migrationBuilder.AlterColumn<string>(
                name: "StatusId",
                table: "LibraryType",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "4590637F39B6BA6F39C74293BE9138DF",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldDefaultValue: "4590637F39B6BA6F39C74293BE9138DF");

            migrationBuilder.AlterColumn<string>(
                name: "RdsId",
                table: "LibraryType",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BuildStatusId",
                table: "LibraryType",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RdsName",
                table: "LibraryType",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryType_BuildStatusId",
                table: "LibraryType",
                column: "BuildStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_LibraryType_Enum_BuildStatusId",
                table: "LibraryType",
                column: "BuildStatusId",
                principalTable: "Enum",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LibraryType_Enum_BuildStatusId",
                table: "LibraryType");

            migrationBuilder.DropIndex(
                name: "IX_LibraryType_BuildStatusId",
                table: "LibraryType");

            migrationBuilder.DropColumn(
                name: "BuildStatusId",
                table: "LibraryType");

            migrationBuilder.DropColumn(
                name: "RdsName",
                table: "LibraryType");

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Rds",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "StatusId",
                table: "LibraryType",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "4590637F39B6BA6F39C74293BE9138DF",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldDefaultValue: "4590637F39B6BA6F39C74293BE9138DF");

            migrationBuilder.AlterColumn<string>(
                name: "RdsId",
                table: "LibraryType",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryType_RdsId",
                table: "LibraryType",
                column: "RdsId");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryType_StatusId",
                table: "LibraryType",
                column: "StatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_LibraryType_Enum_StatusId",
                table: "LibraryType",
                column: "StatusId",
                principalTable: "Enum",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LibraryType_Rds_RdsId",
                table: "LibraryType",
                column: "RdsId",
                principalTable: "Rds",
                principalColumn: "Id");
        }
    }
}