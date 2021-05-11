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
            builder.Property(p => p.SemanticId).HasColumnName("SemanticId");
            builder.Property(p => p.TagNumber).HasColumnName("TagNumber");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
            builder.Property(p => p.Icon).HasColumnName("Icon").IsRequired().HasConversion<string>();
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
            
            builder.Property(p => p.UpdatedBy).HasColumnName("UpdatedBy").IsRequired();
            builder.Property(p => p.Updated).HasColumnName("Updated").IsRequired();
            builder.Property(p => p.Version).HasColumnName("Version").IsRequired();

            builder.HasMany(x => x.Projects).WithMany(y => y.Nodes).UsingEntity(join => join.ToTable("ProjectNode"));

            builder.HasMany(x => x.Projects).WithMany(y => y.Nodes).UsingEntity<Dictionary<string, object>>("ProjectNode",
                x => x.HasOne<Project>().WithMany().HasForeignKey("ProjectId"),
                x => x.HasOne<Node>().WithMany().HasForeignKey("NodeId"),
                x => x.ToTable("ProjectNode")
            );

        }
    }
}
