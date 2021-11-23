using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class EventLogChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "WebSocketEvent",
                table: "EventLog",
                newName: "WorkerStatus");

            migrationBuilder.AddColumn<string>(
                name: "ProjectId",
                table: "EventLog",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "EventLog");

            migrationBuilder.RenameColumn(
                name: "WorkerStatus",
                table: "EventLog",
                newName: "WebSocketEvent");
        }
    }
}
