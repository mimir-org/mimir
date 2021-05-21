using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class TerminalTypeConfiguration : IEntityTypeConfiguration<TerminalType>
    {
        public void Configure(EntityTypeBuilder<TerminalType> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("TerminalType");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Terminal).HasColumnName("Terminal").HasConversion<string>();
            builder.Property(p => p.ConnectorType).HasColumnName("ConnectorType").HasConversion<string>();
            builder.Property(p => p.SemanticReference).HasColumnName("SemanticReference").IsRequired(false);
            builder.Property(p => p.Color).HasColumnName("Color").IsRequired(false);
            builder.Property(p => p.AttributeJson).HasColumnName("AttributeJson");


            //public string SemanticReference { get; set; }
            //public string Color { get; set; }
            //public ICollection<AttributeType> Attributes { get; set; }



            //builder.Property(p => p.Key).HasColumnName("Key").IsRequired();
            //builder.Property(p => p.Value).HasColumnName("Value");

            //builder.Property(p => p.Qualifier).HasColumnName("Qualifier").HasConversion<string>();
            //builder.Property(p => p.Source).HasColumnName("Source").HasConversion<string>();
            //builder.Property(p => p.Condition).HasColumnName("Condition").HasConversion<string>();
            //builder.Property(p => p.Format).HasColumnName("Format").HasConversion<string>();
            //builder.Property(p => p.Units).HasColumnName("Units").HasConversion(unitConverter).Metadata.SetValueComparer(unitComparer);

            //builder.Property(p => p.NodeId).HasColumnName("NodeId").IsRequired(false);
            //builder.HasOne(x => x.Node).WithMany(y => y.Attributes).HasForeignKey(x => x.NodeId).OnDelete(DeleteBehavior.NoAction);
            //builder.Property(p => p.ConnectorId).HasColumnName("ConnectorId").IsRequired(false);
            //builder.HasOne(x => x.Connector).WithMany(y => y.Attributes).HasForeignKey(x => x.ConnectorId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
