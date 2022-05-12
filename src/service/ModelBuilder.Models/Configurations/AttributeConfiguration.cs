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
            builder.Property(p => p.Entity).HasColumnName("Entity").IsRequired();
            builder.Property(p => p.Value).HasColumnName("Value");
            builder.Property(p => p.SelectedUnitId).HasColumnName("SelectedUnitId");
            builder.Property(p => p.AttributeTypeId).HasColumnName("AttributeTypeId");
            builder.Property(p => p.AttributeTypeIri).HasColumnName("AttributeTypeIri");
            builder.Property(p => p.UnitString).HasColumnName("UnitString");

            builder.Property(p => p.Qualifier).HasColumnName("Qualifier").HasMaxLength(127);
            builder.Property(p => p.Source).HasColumnName("Source").HasMaxLength(127);
            builder.Property(p => p.Condition).HasColumnName("Condition").HasMaxLength(127);
            builder.Property(p => p.Format).HasColumnName("Format").HasMaxLength(127);

            builder.Property(p => p.NodeId).HasColumnName("NodeId").IsRequired(false);
            builder.Property(p => p.NodeIri).HasColumnName("NodeIri").IsRequired(false);
            builder.Property(p => p.TerminalId).HasColumnName("TerminalId").IsRequired(false);
            builder.Property(p => p.TerminalIri).HasColumnName("TerminalIri").IsRequired(false);
            builder.Property(p => p.TransportId).HasColumnName("TransportId").IsRequired(false);
            builder.Property(p => p.TransportIri).HasColumnName("TransportIri").IsRequired(false);
            builder.Property(p => p.InterfaceId).HasColumnName("InterfaceId").IsRequired(false);
            builder.Property(p => p.InterfaceIri).HasColumnName("InterfaceIri").IsRequired(false);
            builder.Property(p => p.SimpleId).HasColumnName("SimpleId").IsRequired(false);
            builder.Property(p => p.SimpleIri).HasColumnName("SimpleIri").IsRequired(false);

            builder.Property(p => p.IsLocked).HasColumnName("IsLocked").IsRequired().HasDefaultValue(false);
            builder.Property(p => p.IsLockedStatusBy).HasColumnName("IsLockedStatusBy").IsRequired(false);
            builder.Property(p => p.IsLockedStatusDate).HasColumnName("IsLockedStatusDate").IsRequired(false);
            builder.Property(p => p.SelectValuesString).HasColumnName("SelectValuesString").IsRequired(false);
            builder.Property(p => p.SelectType).HasColumnName("SelectType").IsRequired();
            builder.Property(p => p.Discipline).HasColumnName("Discipline").IsRequired();
            
            builder.HasOne(x => x.Terminal).WithMany(y => y.Attributes).HasForeignKey(x => x.TerminalId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Node).WithMany(y => y.Attributes).HasForeignKey(x => x.NodeId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Transport).WithMany(y => y.Attributes).HasForeignKey(x => x.TransportId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Interface).WithMany(y => y.Attributes).HasForeignKey(x => x.InterfaceId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Simple).WithMany(y => y.Attributes).HasForeignKey(x => x.SimpleId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}