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
            builder.Property(p => p.Iri).HasColumnName("Iri").IsRequired();
            builder.Property(p => p.Entity).HasColumnName("Entity").IsRequired();
            builder.Property(p => p.Value).HasColumnName("Value");
            builder.Property(p => p.SelectedUnitId).HasColumnName("SelectedUnitId");
            builder.Property(p => p.AttributeTypeId).HasColumnName("AttributeTypeId");
            builder.Property(p => p.AttributeTypeIri).HasColumnName("AttributeTypeIri");
            builder.Property(p => p.UnitString).HasColumnName("UnitString");

            builder.Property(p => p.SpecifiedScope).HasColumnName("SpecifiedScope").HasMaxLength(127).IsRequired(false);
            builder.Property(p => p.SpecifiedProvenance).HasColumnName("SpecifiedProvenance").HasMaxLength(127).IsRequired(false);
            builder.Property(p => p.RangeSpecifying).HasColumnName("RangeSpecifying").HasMaxLength(127).IsRequired(false);
            builder.Property(p => p.RegularitySpecified).HasColumnName("RegularitySpecified").HasMaxLength(127).IsRequired(false);

            builder.Property(p => p.NodeId).HasColumnName("NodeId").IsRequired(false);
            builder.Property(p => p.NodeIri).HasColumnName("NodeIri").IsRequired(false);
            builder.Property(p => p.TerminalId).HasColumnName("TerminalId").IsRequired(false);
            builder.Property(p => p.TerminalIri).HasColumnName("TerminalIri").IsRequired(false);

            builder.Property(p => p.IsLocked).HasColumnName("IsLocked").IsRequired().HasDefaultValue(false);
            builder.Property(p => p.IsLockedStatusBy).HasColumnName("IsLockedStatusBy").IsRequired(false);
            builder.Property(p => p.IsLockedStatusDate).HasColumnName("IsLockedStatusDate").IsRequired(false);

            builder.HasOne(x => x.TerminalConnector).WithMany(y => y.Attributes).HasForeignKey(x => x.TerminalId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Node).WithMany(y => y.Attributes).HasForeignKey(x => x.NodeId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}