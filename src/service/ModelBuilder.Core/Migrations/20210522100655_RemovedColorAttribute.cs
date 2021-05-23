using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class RemovedColorAttribute : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "TerminalType");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "TerminalType",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
