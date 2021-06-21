using System.Collections.Generic;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class NodeConfiguration : IEntityTypeConfiguration<Node>
    {
        public void Configure(EntityTypeBuilder<Node> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Node");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Rds).HasColumnName("Rds").IsRequired(false);
            builder.Property(p => p.Contractor).HasColumnName("Contractor").IsRequired(false);
            builder.Property(p => p.SemanticReference).HasColumnName("SemanticReference");
            builder.Property(p => p.TagNumber).HasColumnName("TagNumber");
            builder.Property(p => p.Description).HasColumnName("Description").IsRequired(false);
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
            builder.Property(p => p.Label).HasColumnName("Label").IsRequired(false);
            builder.Property(p => p.Type).HasColumnName("Type").IsRequired().HasConversion<string>();
            builder.Property(p => p.PositionX).HasColumnName("PositionX").HasColumnType("decimal(18,4)").IsRequired();
            builder.Property(p => p.PositionY).HasColumnName("PositionY").HasColumnType("decimal(18,4)").IsRequired();
            builder.Property(p => p.IsLocked).HasColumnName("IsLocked").IsRequired(); // TODO: Hva gjør vi med denne, bør den ligge i db?
            builder.Property(p => p.IsSelected).HasColumnName("IsSelected").IsRequired(); // TODO: Hva gjør vi med denne, bør den ligge i db?

            builder.Property(p => p.PositionBlockX).HasColumnName("PositionBlockX").HasColumnType("decimal(18,4)").IsRequired();
            builder.Property(p => p.PositionBlockY).HasColumnName("PositionBlockY").HasColumnType("decimal(18,4)").IsRequired();
            builder.Property(p => p.Length).HasColumnName("Length").IsRequired();
            builder.Property(p => p.Width).HasColumnName("Width").IsRequired();
            builder.Property(p => p.Height).HasColumnName("Height").IsRequired();
            builder.Property(p => p.Level).HasColumnName("Level").IsRequired();
            builder.Property(p => p.Order).HasColumnName("Order").IsRequired();

            builder.Property(p => p.UpdatedBy).HasColumnName("UpdatedBy").IsRequired();
            builder.Property(p => p.Updated).HasColumnName("Updated").IsRequired();
            builder.Property(p => p.Version).HasColumnName("Version").IsRequired();
            builder.Property(p => p.MasterProjectId).HasColumnName("MasterProjectId").IsRequired();
            
            builder.HasOne(x => x.Status).WithMany(y => y.Nodes).HasForeignKey(x => x.StatusId).OnDelete(DeleteBehavior.NoAction);
            
            builder.HasOne(x => x.MasterProject).WithMany().HasForeignKey(x => x.MasterProjectId).OnDelete(DeleteBehavior.NoAction);
            builder.HasMany(x => x.Projects).WithMany(y => y.Nodes).UsingEntity<Dictionary<string, object>>("ProjectNode",
                x => x.HasOne<Project>().WithMany().HasForeignKey("ProjectId"),
                x => x.HasOne<Node>().WithMany().HasForeignKey("NodeId"),
                x => x.ToTable("ProjectNode")
            );

        }
    }
}
