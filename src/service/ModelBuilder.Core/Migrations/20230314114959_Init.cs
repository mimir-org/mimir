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
                name: "AspectObject",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Rds = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TypeReferenceString = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Label = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Position = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsLocked = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    IsLockedStatusBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsLockedStatusDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LibraryTypeId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Version = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Aspect = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AspectObjectType = table.Column<int>(type: "int", nullable: false),
                    MasterProjectId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Symbol = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PurposeString = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Width = table.Column<int>(type: "int", nullable: true),
                    Height = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspectObject", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspectObject_Project_ProjectId",
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
                    Direction = table.Column<int>(type: "int", nullable: false),
                    Inside = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Outside = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AspectObject = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TerminalType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TerminalParentType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TypeReference = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Connector", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Connector_AspectObject_AspectObject",
                        column: x => x.AspectObject,
                        principalTable: "AspectObject",
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
                    AspectObjectId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    AspectObjectIri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsLocked = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    IsLockedStatusBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsLockedStatusDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attribute", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Attribute_AspectObject_AspectObjectId",
                        column: x => x.AspectObjectId,
                        principalTable: "AspectObject",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Attribute_Connector_TerminalId",
                        column: x => x.TerminalId,
                        principalTable: "Connector",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Connection",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FromConnector = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ToConnector = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MainProject = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Project = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AspectObjectId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    AspectObjectId1 = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ConnectorId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ConnectorId1 = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TerminalType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TerminalParentType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Connection", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Connection_AspectObject_AspectObjectId",
                        column: x => x.AspectObjectId,
                        principalTable: "AspectObject",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Connection_AspectObject_AspectObjectId1",
                        column: x => x.AspectObjectId1,
                        principalTable: "AspectObject",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Connection_Connector_ConnectorId",
                        column: x => x.ConnectorId,
                        principalTable: "Connector",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Connection_Connector_ConnectorId1",
                        column: x => x.ConnectorId1,
                        principalTable: "Connector",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Connection_Project_Project",
                        column: x => x.Project,
                        principalTable: "Project",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspectObject_Name",
                table: "AspectObject",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_AspectObject_ProjectId",
                table: "AspectObject",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_AspectObjectId",
                table: "Attribute",
                column: "AspectObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_TerminalId",
                table: "Attribute",
                column: "TerminalId");

            migrationBuilder.CreateIndex(
                name: "IX_Connection_AspectObjectId",
                table: "Connection",
                column: "AspectObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Connection_AspectObjectId1",
                table: "Connection",
                column: "AspectObjectId1");

            migrationBuilder.CreateIndex(
                name: "IX_Connection_ConnectorId",
                table: "Connection",
                column: "ConnectorId");

            migrationBuilder.CreateIndex(
                name: "IX_Connection_ConnectorId1",
                table: "Connection",
                column: "ConnectorId1");

            migrationBuilder.CreateIndex(
                name: "IX_Connection_Project",
                table: "Connection",
                column: "Project");

            migrationBuilder.CreateIndex(
                name: "IX_Connector_AspectObject",
                table: "Connector",
                column: "AspectObject");
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
                name: "AspectObject");

            migrationBuilder.DropTable(
                name: "Project");
        }
    }
}
