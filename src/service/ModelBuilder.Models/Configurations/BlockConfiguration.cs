using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations;

public class BlockConfiguration : IEntityTypeConfiguration<Block>
{
    public void Configure(EntityTypeBuilder<Block> builder)
    {
        builder.HasKey(x => x.Id);
        builder.ToTable("Block");
        builder.HasIndex(x => x.Project).IsUnique(false);

        builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
        builder.Property(p => p.Version).HasColumnName("Version").IsRequired();
        builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
        builder.Property(p => p.Label).HasColumnName("Label").IsRequired(false);
        builder.Property(p => p.Description).HasColumnName("Description").IsRequired(false);
        builder.Property(p => p.Aspect).HasColumnName("Aspect").IsRequired().HasConversion<string>().IsRequired();
        builder.Property(p => p.BlockType).HasColumnName("BlockType").IsRequired();
        builder.Property(p => p.Project).HasColumnName("Project").IsRequired();
        builder.Property(p => p.MainProject).HasColumnName("MainProject").IsRequired();
        builder.Property(p => p.LibraryType).HasColumnName("LibraryType").IsRequired();
        builder.Property(p => p.PositionTree).HasColumnName("PositionTree").IsRequired();
        builder.Property(p => p.PositionBlock).HasColumnName("PositionBlock").IsRequired(false);
        builder.Property(p => p.ReferenceType).HasColumnName("ReferenceType").IsRequired(false);
        builder.Property(p => p.CreatedBy).HasColumnName("CreatedBy").IsRequired();
        builder.Property(p => p.Created).HasColumnName("Created").IsRequired();
        builder.Property(p => p.UpdatedBy).HasColumnName("UpdatedBy").IsRequired(false);
        builder.Property(p => p.Updated).HasColumnName("Updated").IsRequired(false);
        builder.Property(p => p.Rds).HasColumnName("Rds").IsRequired(false);
        builder.Property(p => p.Symbol).HasColumnName("Symbol").IsRequired(false);
        builder.Property(p => p.Purpose).HasColumnName("Purpose").IsRequired(false);
        builder.Property(p => p.IsLocked).HasColumnName("IsLocked").IsRequired().HasDefaultValue(false);
        builder.Property(p => p.IsLockedStatusBy).HasColumnName("IsLockedStatusBy").IsRequired(false);
        builder.Property(p => p.IsLockedStatusDate).HasColumnName("IsLockedStatusDate").IsRequired(false);
    }
}