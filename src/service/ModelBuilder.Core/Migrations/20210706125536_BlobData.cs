using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class BlobData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BlobData",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Data = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CategoryId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlobData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BlobData_Enum_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Enum",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_BlobData_CategoryId",
                table: "BlobData",
                column: "CategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlobData");
        }
    }
}
