using Microsoft.EntityFrameworkCore.Migrations;

namespace Mb.Core.Migrations
{
    public partial class ConnectorTerminalAttributes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attribute_Node_NodeId",
                table: "Attribute");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Attribute",
                table: "Attribute");

            migrationBuilder.AddColumn<string>(
                name: "SemanticReference",
                table: "Rds",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SemanticRdsReference",
                table: "LibraryTypeComponent",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SemanticReference",
                table: "LibraryTypeComponent",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SemanticReference",
                table: "Connector",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsTerminalType",
                table: "AttributeType",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<string>(
                name: "NodeId",
                table: "Attribute",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "Key",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "Attribute",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ConnectorId",
                table: "Attribute",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Attribute",
                table: "Attribute",
                column: "Id");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Attribute_Node_NodeId",
                table: "Attribute",
                column: "NodeId",
                principalTable: "Node",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attribute_Connector_ConnectorId",
                table: "Attribute");

            migrationBuilder.DropForeignKey(
                name: "FK_Attribute_Node_NodeId",
                table: "Attribute");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Attribute",
                table: "Attribute");

            migrationBuilder.DropIndex(
                name: "IX_Attribute_ConnectorId",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "SemanticReference",
                table: "Rds");

            migrationBuilder.DropColumn(
                name: "SemanticRdsReference",
                table: "LibraryTypeComponent");

            migrationBuilder.DropColumn(
                name: "SemanticReference",
                table: "LibraryTypeComponent");

            migrationBuilder.DropColumn(
                name: "SemanticReference",
                table: "Connector");

            migrationBuilder.DropColumn(
                name: "IsTerminalType",
                table: "AttributeType");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "ConnectorId",
                table: "Attribute");

            migrationBuilder.AlterColumn<string>(
                name: "NodeId",
                table: "Attribute",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Key",
                table: "Attribute",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Attribute",
                table: "Attribute",
                columns: new[] { "Key", "NodeId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Attribute_Node_NodeId",
                table: "Attribute",
                column: "NodeId",
                principalTable: "Node",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
