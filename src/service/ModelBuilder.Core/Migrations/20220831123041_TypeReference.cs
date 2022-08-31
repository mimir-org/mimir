using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class TypeReference : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SemanticReference",
                table: "Transport",
                newName: "TypeReferenceString");

            migrationBuilder.RenameColumn(
                name: "SemanticReference",
                table: "Node",
                newName: "TypeReferenceString");

            migrationBuilder.RenameColumn(
                name: "SemanticReference",
                table: "Interface",
                newName: "TypeReferenceString");

            migrationBuilder.AddColumn<string>(
                name: "TypeReferenceString",
                table: "Connector",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TypeReferenceString",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TypeReferenceString",
                table: "Connector");

            migrationBuilder.DropColumn(
                name: "TypeReferenceString",
                table: "Attribute");

            migrationBuilder.RenameColumn(
                name: "TypeReferenceString",
                table: "Transport",
                newName: "SemanticReference");

            migrationBuilder.RenameColumn(
                name: "TypeReferenceString",
                table: "Node",
                newName: "SemanticReference");

            migrationBuilder.RenameColumn(
                name: "TypeReferenceString",
                table: "Interface",
                newName: "SemanticReference");
        }
    }
}
