using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class ConnectorConfiguration : IEntityTypeConfiguration<Connector>
    {
        public void Configure(EntityTypeBuilder<Connector> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Connector");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
            builder.Property(p => p.Direction).HasColumnName("Direction").IsRequired();
            builder.Property(p => p.AspectObjectId).HasColumnName("AspectObject").IsRequired();
            builder.Property(p => p.Inside).HasColumnName("Inside").IsRequired();
            builder.Property(p => p.Outside).HasColumnName("Outside").IsRequired();

            builder.HasOne(x => x.AspectObject).WithMany(y => y.Connectors).HasForeignKey(x => x.AspectObjectId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}