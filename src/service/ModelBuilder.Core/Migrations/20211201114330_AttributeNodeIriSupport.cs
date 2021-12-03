using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class AttributeNodeIriSupport : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NodeIri",
                table: "Attribute",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NodeIri",
                table: "Attribute");
        }
    }
}
