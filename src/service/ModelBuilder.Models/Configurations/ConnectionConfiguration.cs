using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class ConnectionConfiguration : IEntityTypeConfiguration<Connection>
    {
        public void Configure(EntityTypeBuilder<Connection> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Connection");
            builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
            builder.Property(p => p.Project).HasColumnName("Project").IsRequired();
            builder.Property(p => p.FromConnector).HasColumnName("FromConnector").IsRequired();
            builder.Property(p => p.ToConnector).HasColumnName("ToConnector").IsRequired();
            builder.Property(p => p.MainProject).HasColumnName("MainProject").IsRequired();
        }
    }
}