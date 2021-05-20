using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class RemovedPropertiesFromNode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "Rds",
                table: "Node",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rds",
                table: "Node");

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
    }
}
