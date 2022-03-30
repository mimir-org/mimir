using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class RemoveAttributeQualifierConstraints : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sql = @"
                update Attribute set SelectType = 0 where SelectType = 'None';
                update Attribute set SelectType = 1 where SelectType = 'SingleSelect';
                update Attribute set SelectType = 2 where SelectType = 'MultiSelect';
                update Attribute set Discipline = 0 where Discipline = 'None';
                update Attribute set Discipline = 1 where Discipline = 'NotSet';
                update Attribute set Discipline = 2 where Discipline = 'ProjectManagement';
                update Attribute set Discipline = 4 where Discipline = 'Electrical';
                update Attribute set Discipline = 8 where Discipline = 'Automation';
                update Attribute set Discipline = 16 where Discipline = 'Structural';
                update Attribute set Discipline = 32 where Discipline = 'Operation';
                update Attribute set Discipline = 64 where Discipline = 'Process';
            ";

            migrationBuilder.Sql(sql);

            migrationBuilder.DropForeignKey(
                name: "FK_Attribute_Enum_ConditionId",
                table: "Attribute");

            migrationBuilder.DropForeignKey(
                name: "FK_Attribute_Enum_FormatId",
                table: "Attribute");

            migrationBuilder.DropForeignKey(
                name: "FK_Attribute_Enum_QualifierId",
                table: "Attribute");

            migrationBuilder.DropForeignKey(
                name: "FK_Attribute_Enum_SourceId",
                table: "Attribute");

            migrationBuilder.DropIndex(
                name: "IX_Attribute_ConditionId",
                table: "Attribute");

            migrationBuilder.DropIndex(
                name: "IX_Attribute_FormatId",
                table: "Attribute");

            migrationBuilder.DropIndex(
                name: "IX_Attribute_QualifierId",
                table: "Attribute");

            migrationBuilder.DropIndex(
                name: "IX_Attribute_SourceId",
                table: "Attribute");

            migrationBuilder.AlterColumn<string>(
                name: "SourceId",
                table: "Attribute",
                type: "nvarchar(127)",
                maxLength: 127,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "SelectType",
                table: "Attribute",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "QualifierId",
                table: "Attribute",
                type: "nvarchar(127)",
                maxLength: 127,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FormatId",
                table: "Attribute",
                type: "nvarchar(127)",
                maxLength: 127,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Discipline",
                table: "Attribute",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "ConditionId",
                table: "Attribute",
                type: "nvarchar(127)",
                maxLength: 127,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            var sqlFunction = @"
                CREATE OR ALTER FUNCTION [dbo].[ReplaceCondition](@Id VARCHAR(255))
                RETURNS VARCHAR(255)
                AS
                BEGIN
	                DECLARE @val VARCHAR(255);	
	                IF (SELECT Count(*) FROM Enum WHERE Id = @Id) = 0
		                SET @val = @Id;	
	                ELSE
		                SET @val = (SELECT Name from Enum where Id = @Id);		
	
	                RETURN @val;
                END
            ";

            migrationBuilder.Sql(sqlFunction);

            var sqlRename = @"
                update Attribute set QualifierId = (select dbo.ReplaceCondition(Attribute.QualifierId))
                update Attribute set SourceId = (select dbo.ReplaceCondition(Attribute.SourceId))
                update Attribute set ConditionId = (select dbo.ReplaceCondition(Attribute.ConditionId))
                update Attribute set FormatId = (select dbo.ReplaceCondition(Attribute.FormatId))
            ";

            migrationBuilder.Sql(sqlRename);

            var sqlFunctionDelete = @"
                DROP FUNCTION [dbo].[ReplaceCondition];
            ";

            migrationBuilder.Sql(sqlFunctionDelete);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "SourceId",
                table: "Attribute",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(127)",
                oldMaxLength: 127,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "SelectType",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "QualifierId",
                table: "Attribute",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(127)",
                oldMaxLength: 127,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FormatId",
                table: "Attribute",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(127)",
                oldMaxLength: 127,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Discipline",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "ConditionId",
                table: "Attribute",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(127)",
                oldMaxLength: 127,
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_ConditionId",
                table: "Attribute",
                column: "ConditionId");

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_FormatId",
                table: "Attribute",
                column: "FormatId");

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_QualifierId",
                table: "Attribute",
                column: "QualifierId");

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_SourceId",
                table: "Attribute",
                column: "SourceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Attribute_Enum_ConditionId",
                table: "Attribute",
                column: "ConditionId",
                principalTable: "Enum",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Attribute_Enum_FormatId",
                table: "Attribute",
                column: "FormatId",
                principalTable: "Enum",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Attribute_Enum_QualifierId",
                table: "Attribute",
                column: "QualifierId",
                principalTable: "Enum",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Attribute_Enum_SourceId",
                table: "Attribute",
                column: "SourceId",
                principalTable: "Enum",
                principalColumn: "Id");
        }
    }
}