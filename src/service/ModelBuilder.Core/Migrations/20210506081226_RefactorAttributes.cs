using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class RefactorAttributes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InputType",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Attribute");

            migrationBuilder.AddColumn<bool>(
                name: "IsInterface",
                table: "AttributeType",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<string>(
                name: "Unit",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Condition",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Format",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Qualifier",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Source",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Units",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsInterface",
                table: "AttributeType");

            migrationBuilder.DropColumn(
                name: "Condition",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "Format",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "Qualifier",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "Source",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "Units",
                table: "Attribute");

            migrationBuilder.AlterColumn<string>(
                name: "Unit",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "InputType",
                table: "Attribute",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Attribute",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
