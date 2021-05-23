using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class TerminalTypeConfiguration : IEntityTypeConfiguration<TerminalType>
    {
        public void Configure(EntityTypeBuilder<TerminalType> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("TerminalType");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Terminal).HasColumnName("Terminal").HasConversion<string>();
            builder.Property(p => p.ConnectorType).HasColumnName("ConnectorType").HasConversion<string>();
            builder.Property(p => p.SemanticReference).HasColumnName("SemanticReference").IsRequired(false);
            builder.Property(p => p.AttributeJson).HasColumnName("AttributeJson");

            builder.Ignore(p => p.Attributes);
        }
    }
}
