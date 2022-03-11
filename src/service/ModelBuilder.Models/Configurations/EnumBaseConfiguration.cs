using Mb.Models.Data.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class EnumBaseConfiguration : IEntityTypeConfiguration<EnumBase>
    {
        public void Configure(EntityTypeBuilder<EnumBase> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Enum");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired().ValueGeneratedNever().HasMaxLength(63);
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired().HasMaxLength(63);
            builder.Property(p => p.Aspect).HasColumnName("Aspect").IsRequired().HasConversion<string>().HasMaxLength(31);
            builder.Property(p => p.ParentId).HasColumnName("ParentId").IsRequired(false).HasMaxLength(127);

            builder.Property(p => p.InternalType).HasColumnName("InternalType").IsRequired().HasMaxLength(63);
            builder.Property(p => p.Description).HasColumnName("Description").IsRequired(false).HasMaxLength(511);
            builder.Property(p => p.SemanticReference).HasColumnName("SemanticReference").IsRequired(false);

            builder.HasOne(x => x.Parent).WithMany(y => y.Children).HasForeignKey(x => x.ParentId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}