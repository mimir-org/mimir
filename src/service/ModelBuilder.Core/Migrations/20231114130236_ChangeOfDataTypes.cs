using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    /// <inheritdoc />
    public partial class ChangeOfDataTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SubProject",
                table: "Project");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Connector");

            migrationBuilder.DropColumn(
                name: "ReferenceType",
                table: "Connector");

            migrationBuilder.DropColumn(
                name: "TerminalParentType",
                table: "Connector");

            migrationBuilder.DropColumn(
                name: "TerminalType",
                table: "Connector");

            migrationBuilder.DropColumn(
                name: "Label",
                table: "Block");

            migrationBuilder.DropColumn(
                name: "LibraryType",
                table: "Block");

            migrationBuilder.DropColumn(
                name: "Purpose",
                table: "Block");

            migrationBuilder.DropColumn(
                name: "Rds",
                table: "Block");

            migrationBuilder.RenameColumn(
                name: "Block",
                table: "Connector",
                newName: "TerminalId");

            migrationBuilder.RenameColumn(
                name: "BlockType",
                table: "Block",
                newName: "BlockTypeIri");

            migrationBuilder.RenameColumn(
                name: "Version",
                table: "Block",
                newName: "PurposeId");

            migrationBuilder.RenameColumn(
                name: "Symbol",
                table: "Block",
                newName: "SymbolId");

            migrationBuilder.RenameColumn(
                name: "ReferenceType",
                table: "Block",
                newName: "Notation");

            migrationBuilder.RenameColumn(
                name: "MainProject",
                table: "Block",
                newName: "BlockTypeIri1");

            migrationBuilder.RenameColumn(
                name: "ConnectorTerminal",
                table: "Attribute",
                newName: "TerminalId");

            migrationBuilder.RenameColumn(
                name: "Block",
                table: "Attribute",
                newName: "ConnectorId");

            migrationBuilder.AlterColumn<string>(
                name: "Outside",
                table: "Connector",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Connector",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Inside",
                table: "Connector",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Color",
                table: "Connector",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "BlockId",
                table: "Connector",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "TypeConnector",
                table: "Connector",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "BlockTypeIri",
                table: "Block",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<Guid>(
                name: "AttributePredicateId",
                table: "Attribute",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "BlockId",
                table: "Attribute",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_ConnectorId",
                table: "Attribute",
                column: "ConnectorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Attribute_Connector_ConnectorId",
                table: "Attribute",
                column: "ConnectorId",
                principalTable: "Connector",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attribute_Connector_ConnectorId",
                table: "Attribute");

            migrationBuilder.DropIndex(
                name: "IX_Attribute_ConnectorId",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "BlockId",
                table: "Connector");

            migrationBuilder.DropColumn(
                name: "TypeConnector",
                table: "Connector");

            migrationBuilder.DropColumn(
                name: "AttributePredicateId",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "BlockId",
                table: "Attribute");

            migrationBuilder.RenameColumn(
                name: "TerminalId",
                table: "Connector",
                newName: "Block");

            migrationBuilder.RenameColumn(
                name: "BlockTypeIri",
                table: "Block",
                newName: "BlockType");

            migrationBuilder.RenameColumn(
                name: "SymbolId",
                table: "Block",
                newName: "Symbol");

            migrationBuilder.RenameColumn(
                name: "PurposeId",
                table: "Block",
                newName: "Version");

            migrationBuilder.RenameColumn(
                name: "Notation",
                table: "Block",
                newName: "ReferenceType");

            migrationBuilder.RenameColumn(
                name: "BlockTypeIri1",
                table: "Block",
                newName: "MainProject");

            migrationBuilder.RenameColumn(
                name: "TerminalId",
                table: "Attribute",
                newName: "ConnectorTerminal");

            migrationBuilder.RenameColumn(
                name: "ConnectorId",
                table: "Attribute",
                newName: "Block");

            migrationBuilder.AddColumn<bool>(
                name: "SubProject",
                table: "Project",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<string>(
                name: "Outside",
                table: "Connector",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Connector",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Inside",
                table: "Connector",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Color",
                table: "Connector",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Connector",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ReferenceType",
                table: "Connector",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TerminalParentType",
                table: "Connector",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TerminalType",
                table: "Connector",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "BlockType",
                table: "Block",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "Label",
                table: "Block",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "LibraryType",
                table: "Block",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "Purpose",
                table: "Block",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Rds",
                table: "Block",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
