using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Project",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Iri = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    IsSubProject = table.Column<bool>(type: "bit", nullable: false),
                    Version = table.Column<string>(type: "nvarchar(7)", maxLength: 7, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(63)", maxLength: 63, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    ProjectOwner = table.Column<string>(type: "nvarchar(63)", maxLength: 63, nullable: false),
                    UpdatedBy = table.Column<string>(type: "nvarchar(63)", maxLength: 63, nullable: true),
                    Updated = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Project", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Version",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ver = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TypeId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Data = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Version", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Node",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Iri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rds = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TypeReferenceString = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Label = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PositionX = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    PositionY = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    IsLocked = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    IsLockedStatusBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsLockedStatusDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PositionBlockX = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    PositionBlockY = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    Level = table.Column<int>(type: "int", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LibraryTypeId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Version = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Aspect = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NodeType = table.Column<int>(type: "int", nullable: false),
                    MasterProjectId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MasterProjectIri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Symbol = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PurposeString = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProjectIri = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Width = table.Column<int>(type: "int", nullable: true),
                    Height = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Node", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Node_Project_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Connector",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Direction = table.Column<int>(type: "int", nullable: false),
                    AspectObject = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Inside = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Outside = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TypeReference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TerminalType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TerminalParentType = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Connector", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Connector_Node_AspectObject",
                        column: x => x.AspectObject,
                        principalTable: "Node",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Attribute",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Iri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Entity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AttributeTypeId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AttributeTypeIri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SelectedUnitId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UnitString = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SpecifiedScope = table.Column<string>(type: "nvarchar(127)", maxLength: 127, nullable: true),
                    SpecifiedProvenance = table.Column<string>(type: "nvarchar(127)", maxLength: 127, nullable: true),
                    RangeSpecifying = table.Column<string>(type: "nvarchar(127)", maxLength: 127, nullable: true),
                    RegularitySpecified = table.Column<string>(type: "nvarchar(127)", maxLength: 127, nullable: true),
                    TerminalId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    TerminalIri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NodeId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    NodeIri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsLocked = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    IsLockedStatusBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsLockedStatusDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attribute", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Attribute_Connector_TerminalId",
                        column: x => x.TerminalId,
                        principalTable: "Connector",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Attribute_Node_NodeId",
                        column: x => x.NodeId,
                        principalTable: "Node",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Connection",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Iri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FromConnectorId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FromConnectorIri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ToConnectorId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ToConnectorIri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FromNodeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FromNodeIri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ToNodeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ToNodeIri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsLocked = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    IsLockedStatusBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsLockedStatusDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    MasterProjectId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MasterProjectIri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProjectIri = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Connection", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Connection_Connector_FromConnectorId",
                        column: x => x.FromConnectorId,
                        principalTable: "Connector",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Connection_Connector_ToConnectorId",
                        column: x => x.ToConnectorId,
                        principalTable: "Connector",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Connection_Node_FromNodeId",
                        column: x => x.FromNodeId,
                        principalTable: "Node",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Connection_Node_ToNodeId",
                        column: x => x.ToNodeId,
                        principalTable: "Node",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Connection_Project_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_NodeId",
                table: "Attribute",
                column: "NodeId");

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_TerminalId",
                table: "Attribute",
                column: "TerminalId");

            migrationBuilder.CreateIndex(
                name: "IX_Connection_FromConnectorId",
                table: "Connection",
                column: "FromConnectorId");

            migrationBuilder.CreateIndex(
                name: "IX_Connection_FromNodeId",
                table: "Connection",
                column: "FromNodeId");

            migrationBuilder.CreateIndex(
                name: "IX_Connection_ProjectId",
                table: "Connection",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Connection_ToConnectorId",
                table: "Connection",
                column: "ToConnectorId");

            migrationBuilder.CreateIndex(
                name: "IX_Connection_ToNodeId",
                table: "Connection",
                column: "ToNodeId");

            migrationBuilder.CreateIndex(
                name: "IX_Connector_AspectObject",
                table: "Connector",
                column: "AspectObject");

            migrationBuilder.CreateIndex(
                name: "IX_Node_Name",
                table: "Node",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_Node_ProjectId",
                table: "Node",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Node_ProjectIri",
                table: "Node",
                column: "ProjectIri");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Attribute");

            migrationBuilder.DropTable(
                name: "Connection");

            migrationBuilder.DropTable(
                name: "Version");

            migrationBuilder.DropTable(
                name: "Connector");

            migrationBuilder.DropTable(
                name: "Node");

            migrationBuilder.DropTable(
                name: "Project");
        }
    }
}
