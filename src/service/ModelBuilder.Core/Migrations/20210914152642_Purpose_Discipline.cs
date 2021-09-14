using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class Purpose_Discipline : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BlobData_Enum_CategoryId",
                table: "BlobData");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "BlobData");

            //migrationBuilder.DropIndex(
            //    name: "IX_BlobData_CategoryId",
            //    table: "BlobData"
            //    );

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

            //migrationBuilder.AddForeignKey(
            //    name: "FK_BlobData_Enum_PurposeId",
            //    table: "BlobData",
            //    column: "PurposeId",
            //    principalTable: "Enum",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BlobData_Enum_PurposeId",
                table: "BlobData");

            migrationBuilder.DropColumn(
                name: "Discipline",
                table: "Enum");

            migrationBuilder.DropColumn(
                name: "Discipline",
                table: "BlobData");

            migrationBuilder.RenameColumn(
                name: "PurposeId",
                table: "BlobData",
                newName: "CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_BlobData_PurposeId",
                table: "BlobData",
                newName: "IX_BlobData_CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_BlobData_Enum_CategoryId",
                table: "BlobData",
                column: "CategoryId",
                principalTable: "Enum",
                principalColumn: "Id");
        }
    }
}
