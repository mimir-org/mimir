using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class Simple_Iri : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SemanticReference",
                table: "Simple",
                newName: "NodeIri");

            migrationBuilder.AlterColumn<string>(
                name: "NodeId",
                table: "Simple",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "Iri",
                table: "Simple",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Iri",
                table: "Simple");

            migrationBuilder.RenameColumn(
                name: "NodeIri",
                table: "Simple",
                newName: "SemanticReference");

            migrationBuilder.AlterColumn<string>(
                name: "NodeId",
                table: "Simple",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);
        }
    }
}
