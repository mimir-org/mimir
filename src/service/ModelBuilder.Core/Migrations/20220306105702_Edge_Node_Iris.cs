using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class Edge_Node_Iris : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Node",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "ProjectIri",
                table: "Node",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ProjectIri",
                table: "Edge",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Node_Name",
                table: "Node",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_Node_ProjectIri",
                table: "Node",
                column: "ProjectIri");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Node_Name",
                table: "Node");

            migrationBuilder.DropIndex(
                name: "IX_Node_ProjectIri",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "ProjectIri",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "ProjectIri",
                table: "Edge");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Node",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
