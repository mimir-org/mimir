using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class ScriptRdsUnitAttribute : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //Remove RDS 'JD'
            migrationBuilder.Sql(@"delete from Rds where Id = 'JD';");

            //Rette koblingen 'Rated Voltage' i tabell 'AttributeType' som er til 'W' til nå å være mot 'V' i tabell 'AttributeType_Unit' 
            migrationBuilder.Sql(@"UPDATE AttributeType_Unit SET UnitId = 'E84F64395609F2970B9161FBF0B943EE' WHERE AttributeTypeId = 'C091EA88A6C58C939FA9689CE999C253' and UnitId = 'B2B68149BFCC3F8193582BFB4EFFCF88';");

            //Rette koblingen 'Primary Voltage' i tabell 'AttributeType' som er til 'W' til nå å være mot 'V' i tabell 'AttributeType_Unit' 
            migrationBuilder.Sql(@"UPDATE AttributeType_Unit SET UnitId = 'E84F64395609F2970B9161FBF0B943EE' WHERE AttributeTypeId = 'B6F5A441748AEB5CD833012C2457CB67' and UnitId = 'B2B68149BFCC3F8193582BFB4EFFCF88';");

            //Rette 'Rated Voltage' i tabell 'Attribute' kolonne 'UnitString' 
            migrationBuilder.Sql(@"update Attribute set UnitString = REPLACE(UnitString, '{""Id"":""B2B68149BFCC3F8193582BFB4EFFCF88"",""Name"":""W"",""Description"":null,""SemanticReference"":null}', '{""Id"":""E84F64395609F2970B9161FBF0B943EE"",""Name"":""V"",""Description"":null,""SemanticReference"":null}') where UnitString like '%B2B68149BFCC3F8193582BFB4EFFCF88%' and Entity = 'Rated Voltage';");

            //Rette 'Rated Voltage' i tabell 'Attribute' kolonne 'SelectedUnit' 
            migrationBuilder.Sql(@"update Attribute set SelectedUnitId = 'E84F64395609F2970B9161FBF0B943EE' where SelectedUnitId = 'B2B68149BFCC3F8193582BFB4EFFCF88' and Entity = 'Rated Voltage';");

            //Rette 'Primary Voltage' i tabell 'Attribute' kolonne 'UnitString' 
            migrationBuilder.Sql(@"update Attribute set UnitString = REPLACE(UnitString, '{""Id"":""B2B68149BFCC3F8193582BFB4EFFCF88"",""Name"":""W"",""Description"":null,""SemanticReference"":null}', '{""Id"":""E84F64395609F2970B9161FBF0B943EE"",""Name"":""V"",""Description"":null,""SemanticReference"":null}') where UnitString like '%B2B68149BFCC3F8193582BFB4EFFCF88%' and Entity = 'Primary Voltage';");

            //Rette 'Primary Voltage' i tabell 'Attribute' kolonne 'SelectedUnit' 
            migrationBuilder.Sql(@"update Attribute set SelectedUnitId = 'E84F64395609F2970B9161FBF0B943EE' where SelectedUnitId = 'B2B68149BFCC3F8193582BFB4EFFCF88' and Entity = 'Primary Voltage';");

            //Fjern koblingen mellom 'Cooling Method' og 'IP' i tabell 'AttributeType_Unit'
            migrationBuilder.Sql(@"delete from AttributeType_Unit where AttributeTypeId = '90E00CB7659ADEB14754D8E6EFB7A68B' and UnitId = '175AEE65C3F87C15B0BD60A713C59F40';");

            //Fjern 'Cooling Method' og 'IP' i tabell 'Attribute' kolonne 'UnitString'
            migrationBuilder.Sql(@"update Attribute set UnitString = '[]' where Entity = 'Cooling Method';");

            //Fjern 'Cooling Method' og 'IP' i tabell 'Attribute' kolonne 'SelectedUnitId'
            migrationBuilder.Sql(@"update Attribute set SelectedUnitId = null where Entity = 'Cooling Method';");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}