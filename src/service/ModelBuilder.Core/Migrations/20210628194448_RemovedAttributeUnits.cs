using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class RemovedAttributeUnits : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Attribute_Unit");

            migrationBuilder.AddColumn<string>(
                name: "AttributeTypeId",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UnitString",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AttributeTypeId",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "UnitString",
                table: "Attribute");

            migrationBuilder.CreateTable(
                name: "Attribute_Unit",
                columns: table => new
                {
                    AttributeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UnitId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attribute_Unit", x => new { x.AttributeId, x.UnitId });
                    table.ForeignKey(
                        name: "FK_Attribute_Unit_Attribute_AttributeId",
                        column: x => x.AttributeId,
                        principalTable: "Attribute",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Attribute_Unit_Enum_UnitId",
                        column: x => x.UnitId,
                        principalTable: "Enum",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_Unit_UnitId",
                table: "Attribute_Unit",
                column: "UnitId");
        }
    }
}
