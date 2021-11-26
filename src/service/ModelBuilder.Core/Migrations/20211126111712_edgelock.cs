﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class edgelock : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsLockedBy",
                table: "Node",
                newName: "IsLockedStatusBy");

            migrationBuilder.RenameColumn(
                name: "IsLockedBy",
                table: "Attribute",
                newName: "IsLockedStatusBy");

            migrationBuilder.AddColumn<bool>(
                name: "IsLocked",
                table: "Transport",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "IsLockedStatusBy",
                table: "Transport",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsLocked",
                table: "Node",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AddColumn<bool>(
                name: "IsLocked",
                table: "Interface",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "IsLockedStatusBy",
                table: "Interface",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsLocked",
                table: "Attribute",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.CreateTable(
                name: "EventLog",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DataId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Data = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EventLogDataType = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    WorkerStatus = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventLog", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EventLog_DataId",
                table: "EventLog",
                column: "DataId");

            migrationBuilder.CreateIndex(
                name: "IX_EventLog_EventLogDataType",
                table: "EventLog",
                column: "EventLogDataType");

            migrationBuilder.CreateIndex(
                name: "IX_EventLog_ProjectId",
                table: "EventLog",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_EventLog_WorkerStatus",
                table: "EventLog",
                column: "WorkerStatus");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EventLog");

            migrationBuilder.DropColumn(
                name: "IsLocked",
                table: "Transport");

            migrationBuilder.DropColumn(
                name: "IsLockedStatusBy",
                table: "Transport");

            migrationBuilder.DropColumn(
                name: "IsLocked",
                table: "Interface");

            migrationBuilder.DropColumn(
                name: "IsLockedStatusBy",
                table: "Interface");

            migrationBuilder.RenameColumn(
                name: "IsLockedStatusBy",
                table: "Node",
                newName: "IsLockedBy");

            migrationBuilder.RenameColumn(
                name: "IsLockedStatusBy",
                table: "Attribute",
                newName: "IsLockedBy");

            migrationBuilder.AlterColumn<bool>(
                name: "IsLocked",
                table: "Node",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValue: false);

            migrationBuilder.AlterColumn<bool>(
                name: "IsLocked",
                table: "Attribute",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValue: false);
        }
    }
}
