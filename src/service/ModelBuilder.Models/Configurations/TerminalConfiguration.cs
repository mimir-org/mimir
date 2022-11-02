using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class TerminalConfiguration : IEntityTypeConfiguration<Terminal>
    {
        public void Configure(EntityTypeBuilder<Terminal> builder)
        {
            builder.Property(p => p.TerminalCategory).HasColumnName("TerminalCategory").IsRequired();
            builder.Property(p => p.TerminalTypeId).HasColumnName("TerminalTypeId").IsRequired(false);
            builder.Property(p => p.TerminalTypeIri).HasColumnName("TerminalTypeIri").IsRequired(false);
            builder.Property(p => p.TypeReferenceString).HasColumnName("TypeReferenceString");
            builder.Property(p => p.IsProxy).HasColumnName("IsProxy").IsRequired().HasDefaultValue(false);
            builder.Property(p => p.ProxyParent).HasColumnName("ProxyParent").IsRequired(false);
            builder.Property(p => p.ProxySibling).HasColumnName("ProxySibling").IsRequired(false);
        }
    }
}