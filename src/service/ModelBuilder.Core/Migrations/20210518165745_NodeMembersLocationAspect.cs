using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class NodeMembersLocationAspect : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MaxTemp",
                table: "Node",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MinTemp",
                table: "Node",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "NoiceRestriction",
                table: "Node",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RelativeToPlatformEast",
                table: "Node",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RelativeToPlatformNorth",
                table: "Node",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RelativeToPlatformZeroPoint",
                table: "Node",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaxTemp",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "MinTemp",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "NoiceRestriction",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "RelativeToPlatformEast",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "RelativeToPlatformNorth",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "RelativeToPlatformZeroPoint",
                table: "Node");
        }
    }
}
