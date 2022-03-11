using Mb.Models.Data;
using Mb.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class ConnectorConfiguration : IEntityTypeConfiguration<Connector>
    {
        public void Configure(EntityTypeBuilder<Connector> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Connector");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired().HasMaxLength(127);
            builder.Property(p => p.Iri).HasColumnName("Iri").IsRequired().HasMaxLength(255);
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired().HasMaxLength(63);
            builder.Property(p => p.Type).HasColumnName("Type").IsRequired().HasConversion<string>().HasMaxLength(31);
            builder.Property(p => p.ConnectorVisibility).HasColumnName("ConnectorVisibility").IsRequired().HasConversion<string>().HasDefaultValue(ConnectorVisibility.None).HasMaxLength(31);
            builder.Property(p => p.NodeId).HasColumnName("NodeId").IsRequired(false).HasMaxLength(127);
            builder.Property(p => p.NodeIri).HasColumnName("NodeIri").IsRequired(false).HasMaxLength(255);
            builder.Property(p => p.IsRequired).HasColumnName("IsRequired").IsRequired().HasDefaultValue(false);

            builder.HasOne(x => x.Node).WithMany(y => y.Connectors).HasForeignKey(x => x.NodeId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}