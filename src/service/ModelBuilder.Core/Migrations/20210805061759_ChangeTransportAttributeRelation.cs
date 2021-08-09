using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class ChangeTransportAttributeRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Transport_Attribute");

            migrationBuilder.AddColumn<string>(
                name: "TransportId",
                table: "Attribute",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_TransportId",
                table: "Attribute",
                column: "TransportId");

            migrationBuilder.AddForeignKey(
                name: "FK_Attribute_Transport_TransportId",
                table: "Attribute",
                column: "TransportId",
                principalTable: "Transport",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attribute_Transport_TransportId",
                table: "Attribute");

            migrationBuilder.DropIndex(
                name: "IX_Attribute_TransportId",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "TransportId",
                table: "Attribute");

            migrationBuilder.CreateTable(
                name: "Transport_Attribute",
                columns: table => new
                {
                    AttributeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TransportId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transport_Attribute", x => new { x.AttributeId, x.TransportId });
                    table.ForeignKey(
                        name: "FK_Transport_Attribute_Attribute_AttributeId",
                        column: x => x.AttributeId,
                        principalTable: "Attribute",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Transport_Attribute_Transport_TransportId",
                        column: x => x.TransportId,
                        principalTable: "Transport",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Transport_Attribute_TransportId",
                table: "Transport_Attribute",
                column: "TransportId");
        }
    }
}
