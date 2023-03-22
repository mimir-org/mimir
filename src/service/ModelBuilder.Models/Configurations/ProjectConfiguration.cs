using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations;

public class ProjectConfiguration : IEntityTypeConfiguration<ProjectDm>
{
    public void Configure(EntityTypeBuilder<ProjectDm> builder)
    {
        builder.HasKey(x => x.Id);
        builder.ToTable("Project");

        builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
        builder.Property(p => p.Name).HasColumnName("Name").IsRequired().HasMaxLength(63);
        builder.Property(p => p.SubProject).HasColumnName("IsSubProject").IsRequired();
        builder.Property(p => p.Description).HasColumnName("Description").IsRequired(false).HasMaxLength(511);
        builder.Property(p => p.UpdatedBy).HasColumnName("UpdatedBy").IsRequired(false).HasMaxLength(63);
        builder.Property(p => p.Updated).HasColumnName("Updated").IsRequired(false);
        builder.Property(p => p.CreatedBy).HasColumnName("CreatedBy").IsRequired().HasMaxLength(63);
        builder.Property(p => p.Created).HasColumnName("Created").IsRequired();
        builder.Property(p => p.Version).HasColumnName("Version").IsRequired().HasMaxLength(7);
    }
}