using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class VersionConfiguration : IEntityTypeConfiguration<Version>
    {
        public void Configure(EntityTypeBuilder<Version> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Version");
            builder.Property(p => p.Id).HasColumnName("Id").ValueGeneratedOnAdd().IsRequired().HasMaxLength(127);
            builder.Property(p => p.Ver).HasColumnName("Ver").IsRequired().HasMaxLength(7);
            builder.Property(p => p.Type).HasColumnName("Type").IsRequired().HasMaxLength(63);
            builder.Property(p => p.TypeId).HasColumnName("TypeId").IsRequired().HasMaxLength(127);
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired().HasMaxLength(63);
            builder.Property(p => p.Created).HasColumnName("Created").IsRequired();
            builder.Property(p => p.CreatedBy).HasColumnName("CreatedBy").IsRequired().HasMaxLength(63);
            builder.Property(p => p.Data).HasColumnName("Data").IsRequired();
        }
    }
}