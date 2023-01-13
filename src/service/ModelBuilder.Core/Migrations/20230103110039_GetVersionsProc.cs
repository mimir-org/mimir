using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class GetVersionsProc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var nodeEdgeChildrenProc = @"
                CREATE OR ALTER PROCEDURE dbo.GetProjectVersion @IsSubProject BIT
                AS
                BEGIN
					SET NOCOUNT OFF;
					
					SELECT Project.Id, Project.Name, Project.Version, Project.Description, Version.Ver, Version.Data, Version.Type FROM Project 
					LEFT JOIN Version ON Project.Id = Version.TypeId 
					WHERE Project.IsSubProject = @IsSubProject AND (Version.Type = 'Project' OR Version.Type is NULL)					
				END   
            ";
            migrationBuilder.Sql(nodeEdgeChildrenProc);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP PROCEDURE IF EXISTS dbo.GetProjectVersion");
        }
    }
}