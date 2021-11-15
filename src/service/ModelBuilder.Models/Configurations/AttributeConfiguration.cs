using Mb.Models.Configurations.Converters;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class AttributeConfiguration : IEntityTypeConfiguration<Attribute>
    {
        public void Configure(EntityTypeBuilder<Attribute> builder)
        {
            var stringComparer = new StringHashSetValueComparer();
            var stringConverter = new StringHashSetValueConverter();

            builder.HasKey(x => x.Id);
            builder.ToTable("Attribute");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Iri).HasColumnName("Iri").IsRequired();
            builder.Property(p => p.Domain).HasColumnName("Domain").IsRequired();
            builder.Property(p => p.Key).HasColumnName("Key").IsRequired();
            builder.Property(p => p.Value).HasColumnName("Value");
            builder.Property(p => p.SemanticReference).HasColumnName("SemanticReference").IsRequired(false);
            builder.Property(p => p.SelectedUnitId).HasColumnName("SelectedUnitId");
            builder.Property(p => p.AttributeTypeId).HasColumnName("AttributeTypeId");
            builder.Property(p => p.UnitString).HasColumnName("UnitString");
            
            builder.Property(p => p.NodeId).HasColumnName("NodeId").IsRequired(false);
            builder.Property(p => p.TerminalId).HasColumnName("TerminalId").IsRequired(false);
            builder.Property(p => p.TransportId).HasColumnName("TransportId").IsRequired(false);
            builder.Property(p => p.IsLocked).HasColumnName("IsLocked").IsRequired();
            builder.Property(p => p.IsLockedBy).HasColumnName("IsLockedBy").IsRequired(false);
            builder.Property(p => p.SelectValuesString).HasColumnName("SelectValuesString").IsRequired(false);
            builder.Property(p => p.SelectType).HasColumnName("SelectType").IsRequired().HasConversion<string>();
            builder.Property(p => p.Discipline).HasColumnName("Discipline").IsRequired().HasConversion<string>();
            builder.Property(p => p.Tags).HasColumnName("Tags").IsRequired(false).HasConversion(stringConverter, stringComparer);

            builder.HasOne(x => x.Terminal).WithMany(y => y.Attributes).HasForeignKey(x => x.TerminalId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Node).WithMany(y => y.Attributes).HasForeignKey(x => x.NodeId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Transport).WithMany(y => y.Attributes).HasForeignKey(x => x.TransportId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Condition).WithMany(y => y.Attributes).HasForeignKey(x => x.ConditionId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Qualifier).WithMany(y => y.Attributes).HasForeignKey(x => x.QualifierId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Source).WithMany(y => y.Attributes).HasForeignKey(x => x.SourceId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Format).WithMany(y => y.Attributes).HasForeignKey(x => x.FormatId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Composite).WithMany(y => y.Attributes).HasForeignKey(x => x.CompositeId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
