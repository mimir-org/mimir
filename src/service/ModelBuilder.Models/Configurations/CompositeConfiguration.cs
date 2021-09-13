using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class CompositeConfiguration : IEntityTypeConfiguration<Composite>
    {
        public void Configure(EntityTypeBuilder<Composite> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Composite");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
            builder.Property(p => p.SemanticReference).HasColumnName("SemanticReference").IsRequired(false);

            builder.HasMany(x => x.Attributes).WithOne(y => y.Composite).HasForeignKey(y => y.CompositeId).IsRequired(false);
            builder.HasOne(x => x.Node).WithMany(y => y.Composites).HasForeignKey(y => y.NodeId).IsRequired().OnDelete(DeleteBehavior.NoAction);
        }
    }
}
