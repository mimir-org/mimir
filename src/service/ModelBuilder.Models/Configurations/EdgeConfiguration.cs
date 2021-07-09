using System.Collections.Generic;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class EdgeConfiguration : IEntityTypeConfiguration<Edge>
    {
        public void Configure(EntityTypeBuilder<Edge> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Edge");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.FromConnectorId).HasColumnName("FromConnectorId").IsRequired();
            builder.Property(p => p.ToConnectorId).HasColumnName("ToConnectorId").IsRequired();
            builder.Property(p => p.FromNodeId).HasColumnName("FromNodeId").IsRequired();
            builder.Property(p => p.ToNodeId).HasColumnName("ToNodeId").IsRequired();

            builder.HasOne(x => x.FromNode).WithMany(y => y.FromEdges).HasForeignKey(x => x.FromNodeId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.ToNode).WithMany(y => y.ToEdges).HasForeignKey(x => x.ToNodeId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.FromConnector).WithMany(y => y.FromEdges).HasForeignKey(x => x.FromConnectorId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.ToConnector).WithMany(y => y.ToEdges).HasForeignKey(x => x.ToConnectorId).OnDelete(DeleteBehavior.NoAction);

            builder.Property(p => p.MasterProjectId).HasColumnName("MasterProjectId").IsRequired();
            builder.Property(p => p.IsTemplateEdge).HasColumnName("IsTemplateEdge").IsRequired();
            builder.HasOne(x => x.MasterProject).WithMany().HasForeignKey(x => x.MasterProjectId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
