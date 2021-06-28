using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class PredefinedAttribute : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ParentId",
                table: "Enum",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PredefinedAttribute",
                columns: table => new
                {
                    Key = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Values = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsMultiSelect = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PredefinedAttribute", x => x.Key);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Enum_ParentId",
                table: "Enum",
                column: "ParentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Enum_Enum_ParentId",
                table: "Enum",
                column: "ParentId",
                principalTable: "Enum",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enum_Enum_ParentId",
                table: "Enum");

            migrationBuilder.DropTable(
                name: "PredefinedAttribute");

            migrationBuilder.DropIndex(
                name: "IX_Enum_ParentId",
                table: "Enum");

            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "Enum");
        }
    }
}
