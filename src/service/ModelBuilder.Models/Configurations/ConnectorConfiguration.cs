using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations;


public class ConnectorConfiguration : IEntityTypeConfiguration<Connector>
{
    public void Configure(EntityTypeBuilder<Connector> builder)
    {
        builder.HasKey(x => x.Id);
        builder.ToTable("Connector");
        builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
        builder.Property(p => p.Name).HasColumnName("Name");
        builder.Property(p => p.Direction);
        builder.Property(p => p.Inside);
        builder.Property(p => p.Outside);
        builder.Property(p => p.BlockId);
        builder.Property(p => p.TypeConnector);
        builder.Property(p => p.TerminalId);
        builder.Property(p => p.Color).HasColumnName("Color").IsRequired();
    }
}

