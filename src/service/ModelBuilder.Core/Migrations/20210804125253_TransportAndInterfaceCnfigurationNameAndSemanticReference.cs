using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class TransportAndInterfaceCnfigurationNameAndSemanticReference : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Transport",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SemanticReference",
                table: "Transport",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Interface",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SemanticReference",
                table: "Interface",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Transport");

            migrationBuilder.DropColumn(
                name: "SemanticReference",
                table: "Transport");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Interface");

            migrationBuilder.DropColumn(
                name: "SemanticReference",
                table: "Interface");
        }
    }
}
