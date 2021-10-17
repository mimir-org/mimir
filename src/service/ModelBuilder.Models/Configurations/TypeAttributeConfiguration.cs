using Mb.Models.Data.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class TypeAttributeConfiguration : IEntityTypeConfiguration<TypeAttribute>
    {
        public void Configure(EntityTypeBuilder<TypeAttribute> builder)
        {
            builder.Property(p => p.Aspect).HasColumnName("Aspect").IsRequired().HasConversion<string>();
            builder.HasOne(x => x.Parent).WithMany(y => y.Children).HasForeignKey(x => x.ParentId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
