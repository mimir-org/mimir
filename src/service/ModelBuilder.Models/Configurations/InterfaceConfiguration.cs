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
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
            builder.Property(p => p.SemanticReference).HasColumnName("SemanticReference").IsRequired(false);
            builder.Property(p => p.OutputTerminalId).HasColumnName("OutputTerminalId").IsRequired();
            builder.Property(p => p.InputTerminalId).HasColumnName("InputTerminalId").IsRequired();

            builder.HasOne(x => x.OutputTerminal).WithMany(y => y.OutputInterfaces).HasForeignKey(x => x.OutputTerminalId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.InputTerminal).WithMany(y => y.InputInterfaces).HasForeignKey(x => x.InputTerminalId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
