using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class InterfaceConfiguration : IEntityTypeConfiguration<Interface>
    {
        public void Configure(EntityTypeBuilder<Interface> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Interface");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired().HasMaxLength(127);
            builder.Property(p => p.Iri).HasColumnName("Iri").IsRequired().HasMaxLength(255);
            builder.Property(p => p.Version).HasColumnName("Version").IsRequired().HasDefaultValue("1.0").HasMaxLength(7);
            builder.Property(p => p.Rds).HasColumnName("Rds").IsRequired(false).HasMaxLength(127);
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired().HasMaxLength(63);
            builder.Property(p => p.Label).HasColumnName("Label").IsRequired(false).HasMaxLength(63);
            builder.Property(p => p.Description).HasColumnName("Description").IsRequired(false).HasMaxLength(511);
            builder.Property(p => p.StatusId).HasColumnName("StatusId").IsRequired().HasDefaultValue("4590637F39B6BA6F39C74293BE9138DF").HasMaxLength(127);
            builder.Property(p => p.SemanticReference).HasColumnName("SemanticReference").IsRequired(false);
            builder.Property(p => p.OutputTerminalId).HasColumnName("OutputTerminalId").IsRequired().HasMaxLength(127);
            builder.Property(p => p.InputTerminalId).HasColumnName("InputTerminalId").IsRequired().HasMaxLength(127);
            builder.Property(p => p.UpdatedBy).HasColumnName("UpdatedBy").IsRequired(false).HasMaxLength(63);
            builder.Property(p => p.Updated).HasColumnName("Updated").IsRequired(false);
            builder.Property(p => p.CreatedBy).HasColumnName("CreatedBy").IsRequired().HasMaxLength(63);
            builder.Property(p => p.Created).HasColumnName("Created").IsRequired();
            builder.Property(p => p.LibraryTypeId).HasColumnName("LibraryTypeId").IsRequired().HasMaxLength(127);

            builder.HasOne(x => x.OutputTerminal).WithMany(y => y.OutputInterfaces).HasForeignKey(x => x.OutputTerminalId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.InputTerminal).WithMany(y => y.InputInterfaces).HasForeignKey(x => x.InputTerminalId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Status).WithMany(y => y.Interfaces).HasForeignKey(x => x.StatusId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}