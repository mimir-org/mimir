using Mb.Models.Data.TypeEditor;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class RdsConfiguration : IEntityTypeConfiguration<Rds>
    {
        public void Configure(EntityTypeBuilder<Rds> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Rds");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired().HasMaxLength(127);
            builder.Property(p => p.Code).HasColumnName("Code").IsRequired().HasMaxLength(15);
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired().HasMaxLength(63);
            builder.Property(p => p.SemanticReference).HasColumnName("SemanticReference").IsRequired(false);
            builder.Property(p => p.Aspect).HasColumnName("Aspect").IsRequired().HasConversion<string>().HasMaxLength(31);

            builder.HasOne(x => x.RdsCategory).WithMany(y => y.RdsList).HasForeignKey(x => x.RdsCategoryId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}