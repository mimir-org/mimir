using Mb.Models.Configurations.Converters;
using Mb.Models.Data;
using Mb.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class AttributeConfiguration : IEntityTypeConfiguration<Attribute>
    {
        public void Configure(EntityTypeBuilder<Attribute> builder)
        {
            var unitConverter = new EnumCollectionJsonValueConverter<Unit>();
            var unitComparer = new CollectionValueComparer<Unit>();

            builder.HasKey(x => x.Id);
            builder.ToTable("Attribute");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Key).HasColumnName("Key").IsRequired();
            builder.Property(p => p.Value).HasColumnName("Value");
            builder.Property(p => p.Unit).HasColumnName("Unit").HasConversion<string>();
            builder.Property(p => p.Qualifier).HasColumnName("Qualifier").HasConversion<string>();
            builder.Property(p => p.Source).HasColumnName("Source").HasConversion<string>();
            builder.Property(p => p.Condition).HasColumnName("Condition").HasConversion<string>();
            builder.Property(p => p.Format).HasColumnName("Format").HasConversion<string>();
            builder.Property(p => p.Units).HasColumnName("Units").HasConversion(unitConverter).Metadata.SetValueComparer(unitComparer);
            
            builder.Property(p => p.NodeId).HasColumnName("NodeId").IsRequired(false);
            builder.HasOne(x => x.Node).WithMany(y => y.Attributes).HasForeignKey(x => x.NodeId).OnDelete(DeleteBehavior.NoAction);
            builder.Property(p => p.ConnectorId).HasColumnName("ConnectorId").IsRequired(false);
            builder.HasOne(x => x.Connector).WithMany(y => y.Attributes).HasForeignKey(x => x.ConnectorId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
