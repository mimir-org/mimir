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
            builder.Property(p => p.Iri).HasColumnName("Iri").IsRequired();
            builder.Property(p => p.ProjectId).HasColumnName("ProjectId").IsRequired();
            builder.Property(p => p.ProjectIri).HasColumnName("ProjectIri").IsRequired();
            builder.Property(p => p.FromConnectorId).HasColumnName("FromConnectorId").IsRequired();
            builder.Property(p => p.ToConnectorId).HasColumnName("ToConnectorId").IsRequired();
            builder.Property(p => p.FromNodeId).HasColumnName("FromNodeId").IsRequired();
            builder.Property(p => p.ToNodeId).HasColumnName("ToNodeId").IsRequired();
            builder.Property(p => p.FromConnectorIri).HasColumnName("FromConnectorIri").IsRequired();
            builder.Property(p => p.ToConnectorIri).HasColumnName("ToConnectorIri").IsRequired();
            builder.Property(p => p.FromNodeIri).HasColumnName("FromNodeIri").IsRequired();
            builder.Property(p => p.ToNodeIri).HasColumnName("ToNodeIri").IsRequired();

            builder.HasOne(x => x.FromNode).WithMany(y => y.FromConnections).HasForeignKey(x => x.FromNodeId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.ToNode).WithMany(y => y.ToConnections).HasForeignKey(x => x.ToNodeId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.FromConnector).WithMany(y => y.FromConnections).HasForeignKey(x => x.FromConnectorId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.ToConnector).WithMany(y => y.ToConnections).HasForeignKey(x => x.ToConnectorId).OnDelete(DeleteBehavior.NoAction);

            builder.Property(p => p.MasterProjectId).HasColumnName("MasterProjectId").IsRequired();
            builder.Property(p => p.MasterProjectIri).HasColumnName("MasterProjectIri").IsRequired();

            builder.Property(p => p.IsLocked).HasColumnName("IsLocked").IsRequired().HasDefaultValue(false);
            builder.Property(p => p.IsLockedStatusBy).HasColumnName("IsLockedStatusBy").IsRequired(false).HasDefaultValue(null);
            builder.Property(p => p.IsLockedStatusDate).HasColumnName("IsLockedStatusDate").IsRequired(false).HasDefaultValue(null);
        }
    }
}