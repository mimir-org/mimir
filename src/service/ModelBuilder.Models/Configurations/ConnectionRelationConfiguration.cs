using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class ConnectionRelationConfiguration : IEntityTypeConfiguration<ConnectionRelation>
    {
        public void Configure(EntityTypeBuilder<ConnectionRelation> builder)
        {
        }
    }
}