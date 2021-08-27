using System.Collections.Generic;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class SimpleTypeConfiguration : IEntityTypeConfiguration<SimpleType>
    {
        public void Configure(EntityTypeBuilder<SimpleType> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Interface");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
            builder.Property(p => p.SemanticReference).HasColumnName("SemanticReference").IsRequired(false);

            builder.HasMany(x => x.AttributeTypes).WithMany(y => y.SimpleTypes).UsingEntity<Dictionary<string, object>>("SimpleType_AttributeType",
                x => x.HasOne<AttributeType>().WithMany().HasForeignKey("AttributeTypeId"),
                x => x.HasOne<SimpleType>().WithMany().HasForeignKey("SimpleTypeId"),
                x => x.ToTable("SimpleType_AttributeType")
            );
        }
    }
}
