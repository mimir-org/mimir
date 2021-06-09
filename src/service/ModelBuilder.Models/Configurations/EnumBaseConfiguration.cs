using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class EnumBaseConfiguration: IEntityTypeConfiguration<EnumBase>
    {
        public void Configure(EntityTypeBuilder<EnumBase> builder)
        {
            builder.HasKey(x => new { x.Name, x.InternalType });
            builder.ToTable("Enum");
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
            builder.Property(p => p.InternalType).HasColumnName("InternalType").IsRequired();
            builder.Property(p => p.Description).HasColumnName("Description").IsRequired(false);
            builder.Property(p => p.SemanticReference).HasColumnName("SemanticReference").IsRequired(false);
        }
    }
}
