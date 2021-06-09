using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class EnumBase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Enum",
                columns: table => new
                {
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    InternalType = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SemanticReference = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enum", x => new { x.Name, x.InternalType });
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Enum");
        }
    }
}
