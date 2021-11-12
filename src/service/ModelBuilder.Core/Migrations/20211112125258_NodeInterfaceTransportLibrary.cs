using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class NodeInterfaceTransportLibrary : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "Transport",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Transport",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "Unknown");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Transport",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Label",
                table: "Transport",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LibraryTypeId",
                table: "Transport",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Rds",
                table: "Transport",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StatusId",
                table: "Transport",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "4590637F39B6BA6F39C74293BE9138DF");

            migrationBuilder.AddColumn<DateTime>(
                name: "Updated",
                table: "Transport",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "Transport",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "Unknown");

            migrationBuilder.AddColumn<string>(
                name: "Version",
                table: "Transport",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "1.0");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Node",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "Created",
                table: "Node",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LibraryTypeId",
                table: "Node",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "LibraryType",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "LibraryType",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "Unknown");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "LibraryType",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StatusId",
                table: "LibraryType",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "4590637F39B6BA6F39C74293BE9138DF");

            migrationBuilder.AddColumn<DateTime>(
                name: "Updated",
                table: "LibraryType",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "LibraryType",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "Unknown");

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "Interface",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Interface",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "Unknown");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Interface",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Label",
                table: "Interface",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LibraryTypeId",
                table: "Interface",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Rds",
                table: "Interface",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StatusId",
                table: "Interface",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "4590637F39B6BA6F39C74293BE9138DF");

            migrationBuilder.AddColumn<DateTime>(
                name: "Updated",
                table: "Interface",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "Interface",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "Unknown");

            migrationBuilder.AddColumn<string>(
                name: "Version",
                table: "Interface",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "1.0");

            migrationBuilder.AddColumn<string>(
                name: "InterfaceTypeId",
                table: "AttributeType",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transport_StatusId",
                table: "Transport",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryType_StatusId",
                table: "LibraryType",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Interface_StatusId",
                table: "Interface",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributeType_InterfaceTypeId",
                table: "AttributeType",
                column: "InterfaceTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_AttributeType_LibraryType_InterfaceTypeId",
                table: "AttributeType",
                column: "InterfaceTypeId",
                principalTable: "LibraryType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Interface_Enum_StatusId",
                table: "Interface",
                column: "StatusId",
                principalTable: "Enum",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LibraryType_Enum_StatusId",
                table: "LibraryType",
                column: "StatusId",
                principalTable: "Enum",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Transport_Enum_StatusId",
                table: "Transport",
                column: "StatusId",
                principalTable: "Enum",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AttributeType_LibraryType_InterfaceTypeId",
                table: "AttributeType");

            migrationBuilder.DropForeignKey(
                name: "FK_Interface_Enum_StatusId",
                table: "Interface");

            migrationBuilder.DropForeignKey(
                name: "FK_LibraryType_Enum_StatusId",
                table: "LibraryType");

            migrationBuilder.DropForeignKey(
                name: "FK_Transport_Enum_StatusId",
                table: "Transport");

            migrationBuilder.DropIndex(
                name: "IX_Transport_StatusId",
                table: "Transport");

            migrationBuilder.DropIndex(
                name: "IX_LibraryType_StatusId",
                table: "LibraryType");

            migrationBuilder.DropIndex(
                name: "IX_Interface_StatusId",
                table: "Interface");

            migrationBuilder.DropIndex(
                name: "IX_AttributeType_InterfaceTypeId",
                table: "AttributeType");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "Transport");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Transport");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Transport");

            migrationBuilder.DropColumn(
                name: "Label",
                table: "Transport");

            migrationBuilder.DropColumn(
                name: "LibraryTypeId",
                table: "Transport");

            migrationBuilder.DropColumn(
                name: "Rds",
                table: "Transport");

            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "Transport");

            migrationBuilder.DropColumn(
                name: "Updated",
                table: "Transport");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "Transport");

            migrationBuilder.DropColumn(
                name: "Version",
                table: "Transport");

            migrationBuilder.DropColumn(
                name: "LibraryTypeId",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "LibraryType");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "LibraryType");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "LibraryType");

            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "LibraryType");

            migrationBuilder.DropColumn(
                name: "Updated",
                table: "LibraryType");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "LibraryType");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "Interface");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Interface");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Interface");

            migrationBuilder.DropColumn(
                name: "Label",
                table: "Interface");

            migrationBuilder.DropColumn(
                name: "LibraryTypeId",
                table: "Interface");

            migrationBuilder.DropColumn(
                name: "Rds",
                table: "Interface");

            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "Interface");

            migrationBuilder.DropColumn(
                name: "Updated",
                table: "Interface");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "Interface");

            migrationBuilder.DropColumn(
                name: "Version",
                table: "Interface");

            migrationBuilder.DropColumn(
                name: "InterfaceTypeId",
                table: "AttributeType");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Node",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Created",
                table: "Node",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }
    }
}
