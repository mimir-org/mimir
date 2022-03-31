using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class RemovedRdsCategoryAndAspect : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rds_Enum_RdsCategoryId",
                table: "Rds");

            migrationBuilder.DropIndex(
                name: "IX_Rds_RdsCategoryId",
                table: "Rds");

            migrationBuilder.DropColumn(
                name: "Aspect",
                table: "Rds");

            migrationBuilder.DropColumn(
                name: "RdsCategoryId",
                table: "Rds");

            migrationBuilder.RenameColumn(
                name: "SemanticReference",
                table: "Rds",
                newName: "Iri");

            migrationBuilder.Sql(
                @"delete from Enum where Discriminator = 'RdsCategory'");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Iri",
                table: "Rds",
                newName: "SemanticReference");

            migrationBuilder.AddColumn<string>(
                name: "Aspect",
                table: "Rds",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "RdsCategoryId",
                table: "Rds",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rds_RdsCategoryId",
                table: "Rds",
                column: "RdsCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rds_Enum_RdsCategoryId",
                table: "Rds",
                column: "RdsCategoryId",
                principalTable: "Enum",
                principalColumn: "Id");
        }
    }
}