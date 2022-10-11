using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class ProxyTerminal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsProxy",
                table: "Connector",
                type: "bit",
                nullable: true,
                defaultValue: false);

            migrationBuilder.Sql(@"update Connector set IsProxy = 0;");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsProxy",
                table: "Connector");
        }
    }
}