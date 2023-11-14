using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json.Linq;

namespace Mb.Models.Configurations;

public class AttributeConfiguration : IEntityTypeConfiguration<Attribute>
{
    public void Configure(EntityTypeBuilder<Attribute> builder)
    {
        builder.HasKey(x => x.Id);
        builder.ToTable("Attribute");
        builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
        builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
        builder.Property(p => p.Value).HasColumnName("Value");
        builder.Property(p => p.AttributeType).HasColumnName("AttributeType");        
        builder.Property(p => p.Units).HasColumnName("Units");
        builder.Property(p => p.Qualifiers).HasColumnName("Qualifiers").IsRequired(false);        
        builder.Property(p => p.Terminal).HasColumnName("TerminalId").IsRequired(false);        
        builder.Property(p => p.BlockId).HasColumnName("BlockId").IsRequired(false);
        builder.Property(p => p.AttributePredicateId).HasColumnName("AttributePredicateId").IsRequired(false);
    }
}
