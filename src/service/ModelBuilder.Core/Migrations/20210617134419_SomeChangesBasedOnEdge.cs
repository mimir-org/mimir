using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class SomeChangesBasedOnEdge : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FromConnector",
                table: "Edge");

            migrationBuilder.DropColumn(
                name: "FromNode",
                table: "Edge");

            migrationBuilder.DropColumn(
                name: "ParentType",
                table: "Edge");

            migrationBuilder.DropColumn(
                name: "TargetType",
                table: "Edge");

            migrationBuilder.DropColumn(
                name: "ToConnector",
                table: "Edge");

            migrationBuilder.DropColumn(
                name: "ToNode",
                table: "Edge");

            migrationBuilder.RenameColumn(
                name: "SemanticId",
                table: "Node",
                newName: "SemanticReference");

            migrationBuilder.AddColumn<bool>(
                name: "IsRoot",
                table: "Node",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "FromConnectorId",
                table: "Edge",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FromNodeId",
                table: "Edge",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ToConnectorId",
                table: "Edge",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ToNodeId",
                table: "Edge",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Edge_FromConnectorId",
                table: "Edge",
                column: "FromConnectorId");

            migrationBuilder.CreateIndex(
                name: "IX_Edge_FromNodeId",
                table: "Edge",
                column: "FromNodeId");

            migrationBuilder.CreateIndex(
                name: "IX_Edge_ToConnectorId",
                table: "Edge",
                column: "ToConnectorId");

            migrationBuilder.CreateIndex(
                name: "IX_Edge_ToNodeId",
                table: "Edge",
                column: "ToNodeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Edge_Connector_FromConnectorId",
                table: "Edge",
                column: "FromConnectorId",
                principalTable: "Connector",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Edge_Connector_ToConnectorId",
                table: "Edge",
                column: "ToConnectorId",
                principalTable: "Connector",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Edge_Node_FromNodeId",
                table: "Edge",
                column: "FromNodeId",
                principalTable: "Node",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Edge_Node_ToNodeId",
                table: "Edge",
                column: "ToNodeId",
                principalTable: "Node",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Edge_Connector_FromConnectorId",
                table: "Edge");

            migrationBuilder.DropForeignKey(
                name: "FK_Edge_Connector_ToConnectorId",
                table: "Edge");

            migrationBuilder.DropForeignKey(
                name: "FK_Edge_Node_FromNodeId",
                table: "Edge");

            migrationBuilder.DropForeignKey(
                name: "FK_Edge_Node_ToNodeId",
                table: "Edge");

            migrationBuilder.DropIndex(
                name: "IX_Edge_FromConnectorId",
                table: "Edge");

            migrationBuilder.DropIndex(
                name: "IX_Edge_FromNodeId",
                table: "Edge");

            migrationBuilder.DropIndex(
                name: "IX_Edge_ToConnectorId",
                table: "Edge");

            migrationBuilder.DropIndex(
                name: "IX_Edge_ToNodeId",
                table: "Edge");

            migrationBuilder.DropColumn(
                name: "IsRoot",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "FromConnectorId",
                table: "Edge");

            migrationBuilder.DropColumn(
                name: "FromNodeId",
                table: "Edge");

            migrationBuilder.DropColumn(
                name: "ToConnectorId",
                table: "Edge");

            migrationBuilder.DropColumn(
                name: "ToNodeId",
                table: "Edge");

            migrationBuilder.RenameColumn(
                name: "SemanticReference",
                table: "Node",
                newName: "SemanticId");

            migrationBuilder.AddColumn<string>(
                name: "FromConnector",
                table: "Edge",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FromNode",
                table: "Edge",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ParentType",
                table: "Edge",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TargetType",
                table: "Edge",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ToConnector",
                table: "Edge",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ToNode",
                table: "Edge",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
