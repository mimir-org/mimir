using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class RenameTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProjectEdge");

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

            migrationBuilder.CreateIndex(
                name: "IX_Project_Edge_ProjectId",
                table: "Project_Edge",
                column: "ProjectId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Project_Edge");

            migrationBuilder.CreateTable(
                name: "ProjectEdge",
                columns: table => new
                {
                    EdgeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProjectId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectEdge", x => new { x.EdgeId, x.ProjectId });
                    table.ForeignKey(
                        name: "FK_ProjectEdge_Edge_EdgeId",
                        column: x => x.EdgeId,
                        principalTable: "Edge",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectEdge_Project_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectEdge_ProjectId",
                table: "ProjectEdge",
                column: "ProjectId");
        }
    }
}
