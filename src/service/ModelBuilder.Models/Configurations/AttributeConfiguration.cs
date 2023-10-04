using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations;

public class AttributeConfiguration : IEntityTypeConfiguration<AttributeDm>
{
    public void Configure(EntityTypeBuilder<AttributeDm> builder)
    {
        builder.HasKey(x => x.Id);
        builder.ToTable("Attribute");
        builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
        builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
        builder.Property(p => p.Value).HasColumnName("Value");
        builder.Property(p => p.AttributeType).HasColumnName("AttributeType");
        builder.Property(p => p.UnitSelected).HasColumnName("UnitSelected");
        builder.Property(p => p.Units).HasColumnName("Units");
        builder.Property(p => p.Qualifiers).HasColumnName("Qualifiers").IsRequired(false);
        builder.Property(p => p.ConnectorTerminal).HasColumnName("ConnectorTerminal").IsRequired(false);
        builder.Property(p => p.Block).HasColumnName("Block").IsRequired(false);
    }
}