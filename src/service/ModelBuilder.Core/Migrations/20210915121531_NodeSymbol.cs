using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class NodeSymbol : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Node_BlobData_SymbolId",
                table: "Node");

            migrationBuilder.DropIndex(
                name: "IX_Node_SymbolId",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "SymbolId",
                table: "Node");

            migrationBuilder.AddColumn<string>(
                name: "Symbol",
                table: "Node",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Symbol",
                table: "Node");

            migrationBuilder.AddColumn<string>(
                name: "SymbolId",
                table: "Node",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Node_SymbolId",
                table: "Node",
                column: "SymbolId");

            migrationBuilder.AddForeignKey(
                name: "FK_Node_BlobData_SymbolId",
                table: "Node",
                column: "SymbolId",
                principalTable: "BlobData",
                principalColumn: "Id");
        }
    }
}
