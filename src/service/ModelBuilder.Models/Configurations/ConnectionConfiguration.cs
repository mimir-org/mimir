using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class ConnectionConfiguration : IEntityTypeConfiguration<Connection>
    {
        public void Configure(EntityTypeBuilder<Connection> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Connection");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Discriminator).HasColumnName("Discriminator");
            builder.Property(p => p.Project).HasColumnName("Project").IsRequired();
            builder.Property(p => p.FromConnector).HasColumnName("FromConnector").IsRequired();
            builder.Property(p => p.ToConnector).HasColumnName("ToConnector").IsRequired();
            builder.Property(p => p.FromNode).HasColumnName("FromNode").IsRequired();
            builder.Property(p => p.ToNode).HasColumnName("ToNode").IsRequired();
            builder.Property(p => p.MainProject).HasColumnName("MainProject").IsRequired();
            builder.Property(p => p.TerminalType).HasColumnName("TerminalType").IsRequired(false);
            builder.Property(p => p.TerminalParentType).HasColumnName("TerminalParentType").IsRequired(false);

            builder.HasOne(x => x.FromNodeObject).WithMany(y => y.FromConnections).HasForeignKey(x => x.FromNode).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.ToNodeObject).WithMany(y => y.ToConnections).HasForeignKey(x => x.ToNode).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.FromConnectorObject).WithMany(y => y.FromConnections).HasForeignKey(x => x.FromConnector).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.ToConnectorObject).WithMany(y => y.ToConnections).HasForeignKey(x => x.ToConnector).OnDelete(DeleteBehavior.NoAction);
        }
    }
}