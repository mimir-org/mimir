using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class RdfModules : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SemanticReference",
                table: "TerminalType");

            migrationBuilder.RenameColumn(
                name: "SemanticReference",
                table: "Simple",
                newName: "NodeIri");

            migrationBuilder.RenameColumn(
                name: "SemanticReference",
                table: "Connector",
                newName: "TerminalTypeIri");

            migrationBuilder.RenameColumn(
                name: "SemanticReference",
                table: "Attribute",
                newName: "TransportIri");

            migrationBuilder.AlterColumn<string>(
                name: "NodeId",
                table: "Simple",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "Iri",
                table: "Simple",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Node",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "ProjectIri",
                table: "Node",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ProjectIri",
                table: "Edge",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AttributeTypeIri",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InterfaceIri",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SimpleIri",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TerminalIri",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Node_Name",
                table: "Node",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_Node_ProjectIri",
                table: "Node",
                column: "ProjectIri");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Node_Name",
                table: "Node");

            migrationBuilder.DropIndex(
                name: "IX_Node_ProjectIri",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "Iri",
                table: "Simple");

            migrationBuilder.DropColumn(
                name: "ProjectIri",
                table: "Node");

            migrationBuilder.DropColumn(
                name: "ProjectIri",
                table: "Edge");

            migrationBuilder.DropColumn(
                name: "AttributeTypeIri",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "InterfaceIri",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "SimpleIri",
                table: "Attribute");

            migrationBuilder.DropColumn(
                name: "TerminalIri",
                table: "Attribute");

            migrationBuilder.RenameColumn(
                name: "NodeIri",
                table: "Simple",
                newName: "SemanticReference");

            migrationBuilder.RenameColumn(
                name: "TerminalTypeIri",
                table: "Connector",
                newName: "SemanticReference");

            migrationBuilder.RenameColumn(
                name: "TransportIri",
                table: "Attribute",
                newName: "SemanticReference");

            migrationBuilder.AddColumn<string>(
                name: "SemanticReference",
                table: "TerminalType",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NodeId",
                table: "Simple",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Node",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}