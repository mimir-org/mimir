using System;
using Mb.Models.Data.TypeEditor;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class LibraryTypeConfiguration : IEntityTypeConfiguration<LibraryType>

    {
        public void Configure(EntityTypeBuilder<LibraryType> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("LibraryType");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired().HasMaxLength(127);
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired().HasMaxLength(63);
            builder.Property(p => p.Version).HasColumnName("Version").IsRequired().HasMaxLength(7);
            builder.Property(p => p.TypeId).HasColumnName("TypeId").IsRequired().HasMaxLength(127);
            builder.Property(p => p.SemanticReference).HasColumnName("SemanticReference").IsRequired(false).HasDefaultValue(null);
            builder.Property(p => p.PurposeId).HasColumnName("PurposeId").IsRequired(false).HasMaxLength(127);
            builder.Property(p => p.Description).HasColumnName("Description").IsRequired(false).HasDefaultValue(null).HasMaxLength(511);
            builder.Property(p => p.StatusId).HasColumnName("StatusId").IsRequired().HasDefaultValue("4590637F39B6BA6F39C74293BE9138DF").HasMaxLength(127);
            builder.Property(p => p.UpdatedBy).HasColumnName("UpdatedBy").IsRequired(false).HasDefaultValue(null).HasMaxLength(63);
            builder.Property(p => p.Updated).HasColumnName("Updated").IsRequired(false).HasDefaultValue(null);
            builder.Property(p => p.CreatedBy).HasColumnName("CreatedBy").IsRequired().HasDefaultValue("Unknown").HasMaxLength(63);
            builder.Property(p => p.Created).HasColumnName("Created").IsRequired().HasDefaultValue(DateTime.MinValue.ToUniversalTime());

            builder.HasOne(x => x.Purpose).WithMany(y => y.LibraryTypes).HasForeignKey(x => x.PurposeId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Rds).WithMany(y => y.LibraryTypes).HasForeignKey(x => x.RdsId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Status).WithMany(y => y.LibraryTypes).HasForeignKey(x => x.StatusId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}