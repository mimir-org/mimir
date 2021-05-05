using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class RdfCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Rds",
                table: "Rds");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Rds",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Rds",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Rds",
                table: "Rds",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Rds_Code_Category",
                table: "Rds",
                columns: new[] { "Code", "Category" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Rds",
                table: "Rds");

            migrationBuilder.DropIndex(
                name: "IX_Rds_Code_Category",
                table: "Rds");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Rds");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Rds");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Rds",
                table: "Rds",
                column: "Code");
        }
    }
}
