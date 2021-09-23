using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class PurposeType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BlobData_Enum_CategoryId",
                table: "BlobData");

            migrationBuilder.DropIndex(
                name: "IX_BlobData_CategoryId",
                table: "BlobData");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "BlobData");

            migrationBuilder.AddColumn<string>(
                name: "Discipline",
                table: "Enum",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discipline",
                table: "BlobData",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discipline",
                table: "Enum");

            migrationBuilder.DropColumn(
                name: "Discipline",
                table: "BlobData");

            migrationBuilder.AddColumn<string>(
                name: "CategoryId",
                table: "BlobData",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_BlobData_CategoryId",
                table: "BlobData",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_BlobData_Enum_CategoryId",
                table: "BlobData",
                column: "CategoryId",
                principalTable: "Enum",
                principalColumn: "Id");
        }
    }
}
