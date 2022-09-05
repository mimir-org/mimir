using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class TransportConfiguration : IEntityTypeConfiguration<Transport>
    {
        public void Configure(EntityTypeBuilder<Transport> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Transport");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Iri).HasColumnName("Iri").IsRequired();
            builder.Property(p => p.Version).HasColumnName("Version").IsRequired().HasDefaultValue("1.0");
            builder.Property(p => p.Rds).HasColumnName("Rds").IsRequired(false);
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
            builder.Property(p => p.Label).HasColumnName("Label").IsRequired(false);
            builder.Property(p => p.Description).HasColumnName("Description").IsRequired(false);
            builder.Property(p => p.TypeReferenceString).HasColumnName("TypeReferenceString");
            builder.Property(p => p.OutputTerminalId).HasColumnName("OutputTerminalId").IsRequired();
            builder.Property(p => p.InputTerminalId).HasColumnName("InputTerminalId").IsRequired();
            builder.Property(p => p.UpdatedBy).HasColumnName("UpdatedBy").IsRequired(false);
            builder.Property(p => p.Updated).HasColumnName("Updated").IsRequired(false);
            builder.Property(p => p.CreatedBy).HasColumnName("CreatedBy").IsRequired();
            builder.Property(p => p.Created).HasColumnName("Created").IsRequired();
            builder.Property(p => p.LibraryTypeId).HasColumnName("LibraryTypeId").IsRequired();

            builder.HasOne(x => x.OutputTerminal).WithMany(y => y.OutputTransports).HasForeignKey(x => x.OutputTerminalId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.InputTerminal).WithMany(y => y.InputTransports).HasForeignKey(x => x.InputTerminalId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}