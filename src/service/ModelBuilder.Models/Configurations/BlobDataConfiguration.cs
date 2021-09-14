using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class BlobDataConfiguration : IEntityTypeConfiguration<BlobData>
    {
        public void Configure(EntityTypeBuilder<BlobData> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("BlobData");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
            builder.Property(p => p.Data).HasColumnName("Data").IsRequired();
            builder.Property(p => p.CategoryId).HasColumnName("CategoryId").IsRequired(false);

            builder.HasOne(x => x.Purpose).WithMany(y => y.Purposes).HasForeignKey(x => x.CategoryId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
