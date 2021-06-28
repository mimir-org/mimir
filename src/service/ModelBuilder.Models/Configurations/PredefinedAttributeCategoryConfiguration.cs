using Mb.Models.Data.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class PredefinedAttributeCategoryConfiguration : IEntityTypeConfiguration<PredefinedAttributeCategory>
    {
        public void Configure(EntityTypeBuilder<PredefinedAttributeCategory> builder)
        {
            builder.HasOne(x => x.Parent).WithMany(y => y.Children).HasForeignKey(x => x.ParentId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
