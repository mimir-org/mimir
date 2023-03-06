using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class ConnectorTerminalConfiguration : IEntityTypeConfiguration<ConnectorTerminal>
    {
        public void Configure(EntityTypeBuilder<ConnectorTerminal> builder)
        {
            builder.Property(p => p.TerminalType).HasColumnName("TerminalType").IsRequired(false);
            builder.Property(p => p.TerminalParentType).HasColumnName("TerminalParentType").IsRequired(false);
            builder.Property(p => p.TypeReferenceString).HasColumnName("TypeReferenceString");
        }
    }
}