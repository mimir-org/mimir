using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class RdsConfiguration : IEntityTypeConfiguration<Rds>
    {
        public void Configure(EntityTypeBuilder<Rds> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Rds");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired().ValueGeneratedOnAdd();
            builder.Property(p => p.Code).HasColumnName("Code").IsRequired();
            builder.Property(p => p.Category).HasColumnName("Category").IsRequired().HasConversion<string>(); ;
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
            builder.Property(p => p.IsFunction).HasColumnName("IsFunction").IsRequired();
            builder.Property(p => p.IsProduct).HasColumnName("IsProduct").IsRequired();
            builder.Property(p => p.IsLocation).HasColumnName("IsLocation").IsRequired();

            builder.HasIndex(p => new { p.Code, p.Category }).IsUnique();
        }
    }
}
