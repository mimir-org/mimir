using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class IslockedBy_SemanticReference : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IsLockedBy",
                table: "Node",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IsLockedBy",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SemanticReference",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsLockedBy",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "IsLockedBy",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "SemanticReference",
                table: "Attribute");
        }
    }
}
