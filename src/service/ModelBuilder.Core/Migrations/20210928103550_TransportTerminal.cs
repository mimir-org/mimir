using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class TransportTerminal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transport_Connector_TerminalId",
                table: "Transport");

            migrationBuilder.RenameColumn(
                name: "TerminalId",
                table: "Transport",
                newName: "OutputTerminalId");

            migrationBuilder.RenameIndex(
                name: "IX_Transport_TerminalId",
                table: "Transport",
                newName: "IX_Transport_OutputTerminalId");

            migrationBuilder.AddColumn<string>(
                name: "InputTerminalId",
                table: "Transport",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Transport_InputTerminalId",
                table: "Transport",
                column: "InputTerminalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transport_Connector_InputTerminalId",
                table: "Transport",
                column: "InputTerminalId",
                principalTable: "Connector",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Transport_Connector_OutputTerminalId",
                table: "Transport",
                column: "OutputTerminalId",
                principalTable: "Connector",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transport_Connector_InputTerminalId",
                table: "Transport");

            migrationBuilder.DropForeignKey(
                name: "FK_Transport_Connector_OutputTerminalId",
                table: "Transport");

            migrationBuilder.DropIndex(
                name: "IX_Transport_InputTerminalId",
                table: "Transport");

            migrationBuilder.DropColumn(
                name: "InputTerminalId",
                table: "Transport");

            migrationBuilder.RenameColumn(
                name: "OutputTerminalId",
                table: "Transport",
                newName: "TerminalId");

            migrationBuilder.RenameIndex(
                name: "IX_Transport_OutputTerminalId",
                table: "Transport",
                newName: "IX_Transport_TerminalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transport_Connector_TerminalId",
                table: "Transport",
                column: "TerminalId",
                principalTable: "Connector",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
