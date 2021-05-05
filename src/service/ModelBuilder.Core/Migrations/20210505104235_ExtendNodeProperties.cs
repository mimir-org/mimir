using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class ExtendNodeProperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Height",
                table: "Node",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Length",
                table: "Node",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "PositionBlockX",
                table: "Node",
                type: "decimal(18,4)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "PositionBlockY",
                table: "Node",
                type: "decimal(18,4)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "SemanticId",
                table: "Node",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TagNumber",
                table: "Node",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Updated",
                table: "Node",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "Node",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Width",
                table: "Node",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Height",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "Length",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "PositionBlockX",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "PositionBlockY",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "SemanticId",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "TagNumber",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "Updated",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "Width",
                table: "Node");
        }
    }
}
