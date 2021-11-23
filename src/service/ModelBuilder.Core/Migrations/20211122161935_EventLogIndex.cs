using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class EventLogIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "WorkerStatus",
                table: "EventLog",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "ProjectId",
                table: "EventLog",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "EventLogDataType",
                table: "EventLog",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "DataId",
                table: "EventLog",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

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
            migrationBuilder.DropIndex(
                name: "IX_EventLog_DataId",
                table: "EventLog");

            migrationBuilder.DropIndex(
                name: "IX_EventLog_EventLogDataType",
                table: "EventLog");

            migrationBuilder.DropIndex(
                name: "IX_EventLog_ProjectId",
                table: "EventLog");

            migrationBuilder.DropIndex(
                name: "IX_EventLog_WorkerStatus",
                table: "EventLog");

            migrationBuilder.AlterColumn<string>(
                name: "WorkerStatus",
                table: "EventLog",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "ProjectId",
                table: "EventLog",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "EventLogDataType",
                table: "EventLog",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "DataId",
                table: "EventLog",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
