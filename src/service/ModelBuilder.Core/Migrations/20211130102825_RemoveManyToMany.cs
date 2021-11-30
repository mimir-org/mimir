using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class RemoveManyToMany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Project_Edge");

            migrationBuilder.DropTable(
                name: "Project_Node");

            migrationBuilder.AddColumn<string>(
                name: "ProjectId",
                table: "Node",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ProjectId",
                table: "Edge",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Node_ProjectId",
                table: "Node",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Edge_ProjectId",
                table: "Edge",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Edge_Project_ProjectId",
                table: "Edge",
                column: "ProjectId",
                principalTable: "Project",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Node_Project_ProjectId",
                table: "Node",
                column: "ProjectId",
                principalTable: "Project",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Edge_Project_ProjectId",
                table: "Edge");

            migrationBuilder.DropForeignKey(
                name: "FK_Node_Project_ProjectId",
                table: "Node");

            migrationBuilder.DropIndex(
                name: "IX_Node_ProjectId",
                table: "Node");

            migrationBuilder.DropIndex(
                name: "IX_Edge_ProjectId",
                table: "Edge");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Edge");

            migrationBuilder.CreateTable(
                name: "Project_Edge",
                columns: table => new
                {
                    EdgeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProjectId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Project_Edge", x => new { x.EdgeId, x.ProjectId });
                    table.ForeignKey(
                        name: "FK_Project_Edge_Edge_EdgeId",
                        column: x => x.EdgeId,
                        principalTable: "Edge",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Project_Edge_Project_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Project_Node",
                columns: table => new
                {
                    NodeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProjectId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Project_Node", x => new { x.NodeId, x.ProjectId });
                    table.ForeignKey(
                        name: "FK_Project_Node_Node_NodeId",
                        column: x => x.NodeId,
                        principalTable: "Node",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Project_Node_Project_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Project_Edge_ProjectId",
                table: "Project_Edge",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Project_Node_ProjectId",
                table: "Project_Node",
                column: "ProjectId");
        }
    }
}
