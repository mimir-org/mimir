using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class SimpleConfiguration : IEntityTypeConfiguration<Simple>
    {
        public void Configure(EntityTypeBuilder<Simple> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Simple");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Iri).HasColumnName("Iri").IsRequired();
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
            builder.Property(p => p.NodeId).HasColumnName("NodeId").IsRequired(false);
            builder.Property(p => p.NodeIri).HasColumnName("NodeIri").IsRequired(false);

            builder.HasMany(x => x.Attributes).WithOne(y => y.Simple).HasForeignKey(y => y.SimpleId).IsRequired(false);
            builder.HasOne(x => x.Node).WithMany(y => y.Simples).HasForeignKey(y => y.NodeId).IsRequired().OnDelete(DeleteBehavior.NoAction);
        }
    }
}