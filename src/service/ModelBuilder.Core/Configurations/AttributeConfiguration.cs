using Mb.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Core.Configurations
{
    public class AttributeConfiguration : IEntityTypeConfiguration<Attribute>
    {
        public void Configure(EntityTypeBuilder<Attribute> builder)
        {
            builder.HasKey(x => new {x.Key, x.NodeId});
            builder.ToTable("Attribute");
            builder.Property(p => p.Key).HasColumnName("Key").IsRequired();
            builder.Property(p => p.Value).HasColumnName("Value");
            builder.Property(p => p.Unit).HasColumnName("Unit");
            builder.Property(p => p.Type).HasColumnName("Type");
            builder.Property(p => p.InputType).HasColumnName("InputType");

            builder.Property(p => p.NodeId).HasColumnName("NodeId").IsRequired();
            builder.HasOne(x => x.Node).WithMany(y => y.Attributes).HasForeignKey(x => x.NodeId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
