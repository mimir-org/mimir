using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class RefactorAttributeDatums : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Source",
                table: "Attribute",
                newName: "SpecifiedScope");

            migrationBuilder.RenameColumn(
                name: "Qualifier",
                table: "Attribute",
                newName: "SpecifiedProvenance");

            migrationBuilder.RenameColumn(
                name: "Format",
                table: "Attribute",
                newName: "RegularitySpecified");

            migrationBuilder.RenameColumn(
                name: "Condition",
                table: "Attribute",
                newName: "RangeSpecifying");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SpecifiedScope",
                table: "Attribute",
                newName: "Source");

            migrationBuilder.RenameColumn(
                name: "SpecifiedProvenance",
                table: "Attribute",
                newName: "Qualifier");

            migrationBuilder.RenameColumn(
                name: "RegularitySpecified",
                table: "Attribute",
                newName: "Format");

            migrationBuilder.RenameColumn(
                name: "RangeSpecifying",
                table: "Attribute",
                newName: "Condition");
        }
    }
}