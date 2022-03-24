using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class NodeWidthHeight : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cost",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "Length",
                table: "Node");

            migrationBuilder.AlterColumn<int>(
                name: "Width",
                table: "Node",
                type: "int",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(5,2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Height",
                table: "Node",
                type: "int",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(5,2)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Width",
                table: "Node",
                type: "decimal(5,2)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "Height",
                table: "Node",
                type: "decimal(5,2)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Cost",
                table: "Node",
                type: "decimal(10,4)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Length",
                table: "Node",
                type: "decimal(5,2)",
                nullable: true);
        }
    }
}