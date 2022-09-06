using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class RemoveStatusId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "Transport");

            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "Interface");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StatusId",
                table: "Transport",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "4590637F39B6BA6F39C74293BE9138DF");

            migrationBuilder.AddColumn<string>(
                name: "StatusId",
                table: "Node",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "StatusId",
                table: "Interface",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "4590637F39B6BA6F39C74293BE9138DF");
        }
    }
}