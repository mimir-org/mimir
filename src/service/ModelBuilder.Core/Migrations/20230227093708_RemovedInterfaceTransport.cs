using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    /// <inheritdoc />
    public partial class RemovedInterfaceTransport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attribute_Interface_InterfaceId",
                table: "Attribute");

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
                name: "IX_Attribute_InterfaceId",
                table: "Attribute");

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
                name: "InterfaceId",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "InterfaceIri",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "TransportId",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "TransportIri",
                table: "Attribute");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                name: "InterfaceId",
                table: "Attribute",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InterfaceIri",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TransportId",
                table: "Attribute",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TransportIri",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Interface",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    InputTerminalId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    OutputTerminalId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Iri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Label = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LibraryTypeId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rds = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TypeReferenceString = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Updated = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Version = table.Column<string>(type: "nvarchar(max)", nullable: false, defaultValue: "1.0")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Interface", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Interface_Connector_InputTerminalId",
                        column: x => x.InputTerminalId,
                        principalTable: "Connector",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Interface_Connector_OutputTerminalId",
                        column: x => x.OutputTerminalId,
                        principalTable: "Connector",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Transport",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    InputTerminalId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    OutputTerminalId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Iri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Label = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LibraryTypeId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rds = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TypeReferenceString = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Updated = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Version = table.Column<string>(type: "nvarchar(max)", nullable: false, defaultValue: "1.0")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transport", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Transport_Connector_InputTerminalId",
                        column: x => x.InputTerminalId,
                        principalTable: "Connector",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Transport_Connector_OutputTerminalId",
                        column: x => x.OutputTerminalId,
                        principalTable: "Connector",
                        principalColumn: "Id");
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
                name: "IX_Attribute_InterfaceId",
                table: "Attribute",
                column: "InterfaceId");

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_TransportId",
                table: "Attribute",
                column: "TransportId");

            migrationBuilder.CreateIndex(
                name: "IX_Interface_InputTerminalId",
                table: "Interface",
                column: "InputTerminalId");

            migrationBuilder.CreateIndex(
                name: "IX_Interface_OutputTerminalId",
                table: "Interface",
                column: "OutputTerminalId");

            migrationBuilder.CreateIndex(
                name: "IX_Transport_InputTerminalId",
                table: "Transport",
                column: "InputTerminalId");

            migrationBuilder.CreateIndex(
                name: "IX_Transport_OutputTerminalId",
                table: "Transport",
                column: "OutputTerminalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Attribute_Interface_InterfaceId",
                table: "Attribute",
                column: "InterfaceId",
                principalTable: "Interface",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Attribute_Transport_TransportId",
                table: "Attribute",
                column: "TransportId",
                principalTable: "Transport",
                principalColumn: "Id");

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
    }
}