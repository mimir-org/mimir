using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class AttributeConfiguration : IEntityTypeConfiguration<Attribute>
    {
        public void Configure(EntityTypeBuilder<Attribute> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Attribute");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
            builder.Property(p => p.Value).HasColumnName("Value");
            builder.Property(p => p.SelectedUnit).HasColumnName("SelectedUnit");
            builder.Property(p => p.AttributeType).HasColumnName("AttributeType");
            builder.Property(p => p.UnitString).HasColumnName("UnitString");

            builder.Property(p => p.SpecifiedScope).HasColumnName("SpecifiedScope").HasMaxLength(127).IsRequired(false);
            builder.Property(p => p.SpecifiedProvenance).HasColumnName("SpecifiedProvenance").HasMaxLength(127).IsRequired(false);
            builder.Property(p => p.RangeSpecifying).HasColumnName("RangeSpecifying").HasMaxLength(127).IsRequired(false);
            builder.Property(p => p.RegularitySpecified).HasColumnName("RegularitySpecified").HasMaxLength(127).IsRequired(false);

            builder.Property(p => p.AspectObject).HasColumnName("AspectObject").IsRequired(false);
            builder.Property(p => p.ConnectorTerminal).HasColumnName("ConnectorTerminal").IsRequired(false);

            builder.Property(p => p.IsLocked).HasColumnName("IsLocked").IsRequired().HasDefaultValue(false);
            builder.Property(p => p.IsLockedStatusBy).HasColumnName("IsLockedStatusBy").IsRequired(false);
            builder.Property(p => p.IsLockedStatusDate).HasColumnName("IsLockedStatusDate").IsRequired(false);
        }
    }
}