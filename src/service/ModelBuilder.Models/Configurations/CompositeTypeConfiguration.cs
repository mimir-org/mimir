using System.Collections.Generic;
using Mb.Models.Data.TypeEditor;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class CompositeTypeConfiguration : IEntityTypeConfiguration<CompositeType>
    {
        public void Configure(EntityTypeBuilder<CompositeType> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("CompositeType");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
            builder.Property(p => p.SemanticReference).HasColumnName("SemanticReference").IsRequired(false);

            builder.HasMany(x => x.AttributeTypes).WithMany(y => y.CompositeTypes).UsingEntity<Dictionary<string, object>>("CompositeType_AttributeType",
                x => x.HasOne<AttributeType>().WithMany().HasForeignKey("AttributeTypeId"),
                x => x.HasOne<CompositeType>().WithMany().HasForeignKey("CompositeTypeId"),
                x => x.ToTable("CompositeType_AttributeType")
            );

            builder.HasMany(x => x.NodeTypes).WithMany(y => y.CompositeTypes).UsingEntity<Dictionary<string, object>>("CompositeType_NodeType",
                x => x.HasOne<NodeType>().WithMany().HasForeignKey("NodeTypeId"),
                x => x.HasOne<CompositeType>().WithMany().HasForeignKey("CompositeTypeId"),
                x => x.ToTable("CompositeType_NodeType")
            );
        }
    }
}
