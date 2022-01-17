using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class ConnectorVisibleV2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Visible",
                table: "Connector");

            migrationBuilder.AddColumn<string>(
                name: "ConnectorVisibility",
                table: "Connector",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "None");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConnectorVisibility",
                table: "Connector");

            migrationBuilder.AddColumn<string>(
                name: "Visible",
                table: "Connector",
                type: "nvarchar(1)",
                nullable: false,
                defaultValue: "");
        }
    }
}
