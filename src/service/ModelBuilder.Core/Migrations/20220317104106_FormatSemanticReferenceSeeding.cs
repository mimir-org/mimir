using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mb.Core.Migrations
{
    public partial class FormatSemanticReferenceSeeding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"UPDATE Enum SET SemanticReference = 'http://www.w3.org/2001/XMLSchema#string' WHERE Name = 'NotSet' and Discriminator = 'AttributeFormat';
                  UPDATE Enum SET SemanticReference = 'http://www.w3.org/2001/XMLSchema#float' WHERE Name = 'Unsigned Float' and Discriminator = 'AttributeFormat';
                  UPDATE Enum SET SemanticReference = 'http://www.w3.org/2001/XMLSchema#float' WHERE Name = 'Float' and Discriminator = 'AttributeFormat';
                  UPDATE Enum SET SemanticReference = 'http://www.w3.org/2001/XMLSchema#unsignedInt' WHERE Name = 'Unsigned Integer' and Discriminator = 'AttributeFormat';
                  UPDATE Enum SET SemanticReference = 'http://www.w3.org/2001/XMLSchema#string' WHERE Name = 'Table' and Discriminator = 'AttributeFormat';
                  UPDATE Enum SET SemanticReference = 'http://www.w3.org/2001/XMLSchema#string' WHERE Name = 'Selection' and Discriminator = 'AttributeFormat';
                  UPDATE Enum SET SemanticReference = 'http://www.w3.org/2001/XMLSchema#string' WHERE Name = 'Text and doc reference' and Discriminator = 'AttributeFormat';
                  UPDATE Enum SET SemanticReference = 'http://www.w3.org/2001/XMLSchema#boolean' WHERE Name = 'Boolean' and Discriminator = 'AttributeFormat';
                  UPDATE Enum SET SemanticReference = 'http://www.w3.org/2001/XMLSchema#string' WHERE Name = 'String' and Discriminator = 'AttributeFormat';");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
