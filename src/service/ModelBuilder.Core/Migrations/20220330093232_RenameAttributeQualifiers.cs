using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class RenameAttributeQualifiers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SourceId",
                table: "Attribute",
                newName: "Source");

            migrationBuilder.RenameColumn(
                name: "QualifierId",
                table: "Attribute",
                newName: "Qualifier");

            migrationBuilder.RenameColumn(
                name: "FormatId",
                table: "Attribute",
                newName: "Format");

            migrationBuilder.RenameColumn(
                name: "ConditionId",
                table: "Attribute",
                newName: "Condition");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Source",
                table: "Attribute",
                newName: "SourceId");

            migrationBuilder.RenameColumn(
                name: "Qualifier",
                table: "Attribute",
                newName: "QualifierId");

            migrationBuilder.RenameColumn(
                name: "Format",
                table: "Attribute",
                newName: "FormatId");

            migrationBuilder.RenameColumn(
                name: "Condition",
                table: "Attribute",
                newName: "ConditionId");
        }
    }
}