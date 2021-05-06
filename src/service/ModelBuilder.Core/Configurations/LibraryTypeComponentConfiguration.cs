using Mb.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Core.Configurations
{
    public class LibraryTypeComponentConfiguration : IEntityTypeConfiguration<LibraryTypeComponent>

    {
        public void Configure(EntityTypeBuilder<LibraryTypeComponent> builder)
        {


            builder.HasKey(x => x.Id);
            builder.ToTable("LibraryTypeComponent");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Aspect).HasColumnName("Aspect").IsRequired().HasConversion<string>();
            builder.Property(p => p.ObjectType).HasColumnName("ObjectType").IsRequired().HasConversion<string>();
            builder.Property(p => p.TypeName).HasColumnName("TypeName").IsRequired();
            builder.Property(p => p.Status).HasColumnName("Status").IsRequired().HasConversion<string>();
            builder.Property(p => p.Rds).HasColumnName("Rds").IsRequired();
            builder.Property(p => p.RdsCategory).HasColumnName("RdsCategory").IsRequired().HasConversion<string>();
            builder.Property(p => p.TerminalJson).HasColumnName("TerminalJson");
            builder.Property(p => p.AttributeJson).HasColumnName("AttributeJson");
            builder.Property(p => p.RdsCategory).HasColumnName("RdsCategory").IsRequired().HasConversion<string>();
            builder.Property(p => p.Version).HasColumnName("Version").IsRequired();

            builder.Ignore(p => p.Terminals);
            builder.Ignore(p => p.Attributes);
        }
    }
}
