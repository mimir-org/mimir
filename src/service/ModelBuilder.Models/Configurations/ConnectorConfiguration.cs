using Mb.Models.Data;
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
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
            builder.Property(p => p.Type).HasColumnName("Type").IsRequired().HasConversion<string>();
            builder.Property(p => p.NodeId).HasColumnName("NodeId").IsRequired();
            
            builder.Property(p => p.Terminal).HasColumnName("Terminal").IsRequired().HasConversion<string>();
            builder.Property(p => p.TerminalCategory).HasColumnName("TerminalCategory").IsRequired().HasConversion<string>();
            builder.Property(p => p.RelationType).HasColumnName("RelationType").IsRequired().HasConversion<string>();
            builder.Ignore(p => p.MediaColor);
            builder.Ignore(p => p.TransportColor);

            builder.HasOne(x => x.Node).WithMany(y => y.Connectors).HasForeignKey(x => x.NodeId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
