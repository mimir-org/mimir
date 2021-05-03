using System.Collections.Generic;
using Mb.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Core.Configurations
{
    public class NodeConfiguration : IEntityTypeConfiguration<Node>
    {
        public void Configure(EntityTypeBuilder<Node> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Node");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
            builder.Property(p => p.Icon).HasColumnName("Icon").IsRequired().HasConversion<string>();
            builder.Property(p => p.Label).HasColumnName("Label").IsRequired(false);
            builder.Property(p => p.Type).HasColumnName("Type").IsRequired().HasConversion<string>();
            builder.Property(p => p.PositionX).HasColumnName("PositionX").HasColumnType("decimal(18,4)").IsRequired();
            builder.Property(p => p.PositionY).HasColumnName("PositionY").HasColumnType("decimal(18,4)").IsRequired();
            builder.Property(p => p.IsLocked).HasColumnName("IsLocked").IsRequired(); // TODO: Hva gjør vi med denne, bør den ligge i db?
            builder.Property(p => p.IsSelected).HasColumnName("IsSelected").IsRequired(); // TODO: Hva gjør vi med denne, bør den ligge i db?

            builder.HasMany(x => x.Projects).WithMany(y => y.Nodes).UsingEntity(join => join.ToTable("ProjectNode"));

            builder.HasMany(x => x.Projects).WithMany(y => y.Nodes).UsingEntity<Dictionary<string, object>>("ProjectNode",
                x => x.HasOne<Project>().WithMany().HasForeignKey("ProjectId"),
                x => x.HasOne<Node>().WithMany().HasForeignKey("NodeId"),
                x => x.ToTable("ProjectNode")
            );

        }
    }
}
