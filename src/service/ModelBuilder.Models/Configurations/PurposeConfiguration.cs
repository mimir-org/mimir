using Mb.Models.Data.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class PurposeConfiguration : IEntityTypeConfiguration<Purpose>
    {
        public void Configure(EntityTypeBuilder<Purpose> builder)
        {
            builder.Property(p => p.Discipline).HasColumnName("Discipline").IsRequired().HasConversion<string>();
        }
    }
}