using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class MasterProject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Edge_Project_MasterProjectId",
                table: "Edge");

            migrationBuilder.DropForeignKey(
                name: "FK_Node_Project_MasterProjectId",
                table: "Node");

            migrationBuilder.DropIndex(
                name: "IX_Node_MasterProjectId",
                table: "Node");

            migrationBuilder.DropIndex(
                name: "IX_Edge_MasterProjectId",
                table: "Edge");

            migrationBuilder.DropColumn(
                name: "IsTemplateEdge",
                table: "Edge");

            migrationBuilder.AlterColumn<string>(
                name: "MasterProjectId",
                table: "Node",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "MasterProjectIri",
                table: "Node",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "MasterProjectId",
                table: "Edge",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "MasterProjectIri",
                table: "Edge",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MasterProjectIri",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "MasterProjectIri",
                table: "Edge");

            migrationBuilder.AlterColumn<string>(
                name: "MasterProjectId",
                table: "Node",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "MasterProjectId",
                table: "Edge",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<bool>(
                name: "IsTemplateEdge",
                table: "Edge",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Node_MasterProjectId",
                table: "Node",
                column: "MasterProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Edge_MasterProjectId",
                table: "Edge",
                column: "MasterProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Edge_Project_MasterProjectId",
                table: "Edge",
                column: "MasterProjectId",
                principalTable: "Project",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Node_Project_MasterProjectId",
                table: "Node",
                column: "MasterProjectId",
                principalTable: "Project",
                principalColumn: "Id");
        }
    }
}
