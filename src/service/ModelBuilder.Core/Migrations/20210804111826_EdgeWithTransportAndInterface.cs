using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class EdgeWithTransportAndInterface : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "InterfaceId",
                table: "Edge",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TransportId",
                table: "Edge",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TransportId",
                table: "Attribute",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Interface",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TerminalId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Interface", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Interface_Connector_TerminalId",
                        column: x => x.TerminalId,
                        principalTable: "Connector",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Transport",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TerminalId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transport", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Transport_Connector_TerminalId",
                        column: x => x.TerminalId,
                        principalTable: "Connector",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Edge_InterfaceId",
                table: "Edge",
                column: "InterfaceId");

            migrationBuilder.CreateIndex(
                name: "IX_Edge_TransportId",
                table: "Edge",
                column: "TransportId");

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_TransportId",
                table: "Attribute",
                column: "TransportId");

            migrationBuilder.CreateIndex(
                name: "IX_Interface_TerminalId",
                table: "Interface",
                column: "TerminalId");

            migrationBuilder.CreateIndex(
                name: "IX_Transport_TerminalId",
                table: "Transport",
                column: "TerminalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Attribute_Transport_TransportId",
                table: "Attribute",
                column: "TransportId",
                principalTable: "Transport",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Edge_Interface_InterfaceId",
                table: "Edge",
                column: "InterfaceId",
                principalTable: "Interface",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Edge_Transport_TransportId",
                table: "Edge",
                column: "TransportId",
                principalTable: "Transport",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attribute_Transport_TransportId",
                table: "Attribute");

            migrationBuilder.DropForeignKey(
                name: "FK_Edge_Interface_InterfaceId",
                table: "Edge");

            migrationBuilder.DropForeignKey(
                name: "FK_Edge_Transport_TransportId",
                table: "Edge");

            migrationBuilder.DropTable(
                name: "Interface");

            migrationBuilder.DropTable(
                name: "Transport");

            migrationBuilder.DropIndex(
                name: "IX_Edge_InterfaceId",
                table: "Edge");

            migrationBuilder.DropIndex(
                name: "IX_Edge_TransportId",
                table: "Edge");

            migrationBuilder.DropIndex(
                name: "IX_Attribute_TransportId",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "InterfaceId",
                table: "Edge");

            migrationBuilder.DropColumn(
                name: "TransportId",
                table: "Edge");

            migrationBuilder.DropColumn(
                name: "TransportId",
                table: "Attribute");
        }
    }
}
