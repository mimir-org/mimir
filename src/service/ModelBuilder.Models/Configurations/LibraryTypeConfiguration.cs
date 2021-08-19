using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class LibraryTypeConfiguration : IEntityTypeConfiguration<LibraryType>

    {
        public void Configure(EntityTypeBuilder<LibraryType> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("LibraryType");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
            builder.Property(p => p.SemanticReference).HasColumnName("SemanticReference").IsRequired(false);

            builder.HasOne(x => x.Rds).WithMany(y => y.LibraryTypes).HasForeignKey(x => x.RdsId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
