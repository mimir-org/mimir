using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class NodeBlobdata : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        protected override void Down(MigrationBuilder migrationBuilder)
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
        }
    }
}
