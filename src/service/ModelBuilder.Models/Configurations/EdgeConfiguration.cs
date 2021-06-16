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
            builder.Property(p => p.FromConnector).HasColumnName("FromConnector").IsRequired();
            builder.Property(p => p.ToConnector).HasColumnName("ToConnector").IsRequired();
            builder.Property(p => p.FromNode).HasColumnName("FromNode").IsRequired();
            builder.Property(p => p.ToNode).HasColumnName("ToNode").IsRequired();
            builder.Property(p => p.ParentType).HasColumnName("ParentType").IsRequired().HasConversion<string>();
            builder.Property(p => p.TargetType).HasColumnName("TargetType").IsRequired().HasConversion<string>();
            builder.Property(p => p.MasterProjectId).HasColumnName("MasterProjectId").IsRequired();
            builder.Property(p => p.IsTemplateEdge).HasColumnName("IsTemplateEdge").IsRequired();
            builder.HasOne(x => x.MasterProject).WithMany().HasForeignKey(x => x.MasterProjectId).OnDelete(DeleteBehavior.NoAction);
            builder.HasMany(x => x.Projects).WithMany(y => y.Edges).UsingEntity<Dictionary<string, object>>("ProjectEdge", 
                x => x.HasOne<Project>().WithMany().HasForeignKey("ProjectId"),
                x => x.HasOne<Edge>().WithMany().HasForeignKey("EdgeId"),
                x => x.ToTable("ProjectEdge")
               );
        }
    }
}
