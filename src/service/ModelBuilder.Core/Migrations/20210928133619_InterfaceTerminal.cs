using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class InterfaceTerminal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Interface_Connector_TerminalId",
                table: "Interface");

            migrationBuilder.RenameColumn(
                name: "TerminalId",
                table: "Interface",
                newName: "OutputTerminalId");

            migrationBuilder.RenameIndex(
                name: "IX_Interface_TerminalId",
                table: "Interface",
                newName: "IX_Interface_OutputTerminalId");

            migrationBuilder.AddColumn<string>(
                name: "InputTerminalId",
                table: "Interface",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "InterfaceId",
                table: "Attribute",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Interface_InputTerminalId",
                table: "Interface",
                column: "InputTerminalId");

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_InterfaceId",
                table: "Attribute",
                column: "InterfaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Attribute_Interface_InterfaceId",
                table: "Attribute",
                column: "InterfaceId",
                principalTable: "Interface",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Interface_Connector_InputTerminalId",
                table: "Interface",
                column: "InputTerminalId",
                principalTable: "Connector",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Interface_Connector_OutputTerminalId",
                table: "Interface",
                column: "OutputTerminalId",
                principalTable: "Connector",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attribute_Interface_InterfaceId",
                table: "Attribute");

            migrationBuilder.DropForeignKey(
                name: "FK_Interface_Connector_InputTerminalId",
                table: "Interface");

            migrationBuilder.DropForeignKey(
                name: "FK_Interface_Connector_OutputTerminalId",
                table: "Interface");

            migrationBuilder.DropIndex(
                name: "IX_Interface_InputTerminalId",
                table: "Interface");

            migrationBuilder.DropIndex(
                name: "IX_Attribute_InterfaceId",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "InputTerminalId",
                table: "Interface");

            migrationBuilder.DropColumn(
                name: "InterfaceId",
                table: "Attribute");

            migrationBuilder.RenameColumn(
                name: "OutputTerminalId",
                table: "Interface",
                newName: "TerminalId");

            migrationBuilder.RenameIndex(
                name: "IX_Interface_OutputTerminalId",
                table: "Interface",
                newName: "IX_Interface_TerminalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Interface_Connector_TerminalId",
                table: "Interface",
                column: "TerminalId",
                principalTable: "Connector",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
