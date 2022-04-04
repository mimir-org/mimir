using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class ConnectorValidationEnumProps : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sql = @"
                update connector set RelationType = 0 where RelationType = 'NotSet';
                update connector set RelationType = 1 where RelationType = 'HasLocation';
                update connector set RelationType = 2 where RelationType = 'PartOf';
                update connector set RelationType = 3 where RelationType = 'FulfilledBy';
                update connector set ConnectorVisibility = 0 where ConnectorVisibility = 'None';
                update connector set ConnectorVisibility = 1 where ConnectorVisibility = 'InputVisible';
                update connector set ConnectorVisibility = 2 where ConnectorVisibility = 'OutputVisible';
                update Connector set [Type] = 0 where [Type] = 'Input';
                update Connector set [Type] = 1 where [Type] = 'Output';
                update Connector set [Type] = 2 where [Type] = 'Bidirectional';
            ";

            migrationBuilder.Sql(sql);

            migrationBuilder.AlterColumn<int>(
                name: "Type",
                table: "Connector",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "RelationType",
                table: "Connector",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ConnectorVisibility",
                table: "Connector",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldDefaultValue: "None");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Type",
                table: "Connector",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "RelationType",
                table: "Connector",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ConnectorVisibility",
                table: "Connector",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "None",
                oldClrType: typeof(int),
                oldType: "int",
                oldDefaultValue: 0);
        }
    }
}