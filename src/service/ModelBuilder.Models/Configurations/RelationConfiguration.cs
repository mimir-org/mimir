using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class RelationConfiguration : IEntityTypeConfiguration<ConnectorRelation>
    {
        public void Configure(EntityTypeBuilder<ConnectorRelation> builder)
        {
            builder.Property(p => p.Discriminator).HasColumnName("Discriminator");
        }
    }
}