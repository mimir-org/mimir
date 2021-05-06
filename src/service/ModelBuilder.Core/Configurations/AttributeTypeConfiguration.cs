using Mb.Core.Configurations.Converters;
using Mb.Models;
using Mb.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Core.Configurations
{
    public class AttributeTypeConfiguration : IEntityTypeConfiguration<AttributeType>
    {
       
        public void Configure(EntityTypeBuilder<AttributeType> builder)
        {
            var unitConverter = new EnumCollectionJsonValueConverter<Unit>();
            var unitComparer = new CollectionValueComparer<Unit>();

            builder.HasKey(x => x.Id);
            builder.ToTable("AttributeType");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired().ValueGeneratedOnAdd();
            builder.Property(p => p.Entity).HasColumnName("Entity").IsRequired();
            builder.Property(p => p.Qualifier).HasColumnName("Qualifier").IsRequired().HasConversion<string>();
            builder.Property(p => p.Source).HasColumnName("Source").IsRequired().HasConversion<string>();
            builder.Property(p => p.Condition).HasColumnName("Condition").IsRequired().HasConversion<string>();
            builder.Property(p => p.Aspect).HasColumnName("Aspect").IsRequired().HasConversion<string>();
            builder.Property(p => p.Format).HasColumnName("Format").IsRequired().HasConversion<string>();
            builder.Property(p => p.Units).HasColumnName("Units").HasConversion(unitConverter).Metadata.SetValueComparer(unitComparer);
        }
    }
}
