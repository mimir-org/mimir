using Mb.Models.Configurations.Converters;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class PredefinedAttributeConfiguration : IEntityTypeConfiguration<PredefinedAttribute>
    {
        public void Configure(EntityTypeBuilder<PredefinedAttribute> builder)
        {
            var stringConverter = new StringCollectionValueConverter();
            var stringComparer = new StringCollectionValueComparer();

            builder.HasKey(x => x.Key);
            builder.ToTable("PredefinedAttribute");
            builder.Property(p => p.Key).HasColumnName("Key").IsRequired().HasMaxLength(127);
            builder.Property(p => p.Values).HasColumnName("Values").IsRequired(false).HasConversion(stringConverter, stringComparer).HasMaxLength(511);
            builder.Property(p => p.IsMultiSelect).HasColumnName("IsMultiSelect").IsRequired();
        }
    }
}