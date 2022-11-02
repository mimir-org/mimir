using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class RemovedTypeReferenceFromAttribute : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SelectType",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "SelectValuesString",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "TypeReferenceString",
                table: "Attribute");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SelectType",
                table: "Attribute",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "SelectValuesString",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TypeReferenceString",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}