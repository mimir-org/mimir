using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class ChangedNodeType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsRoot",
                table: "Node");

            migrationBuilder.AddColumn<int>(
                name: "NodeType",
                table: "Node",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NodeType",
                table: "Node");

            migrationBuilder.AddColumn<bool>(
                name: "IsRoot",
                table: "Node",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}