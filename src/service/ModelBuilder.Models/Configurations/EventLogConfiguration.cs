using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class EventLogConfiguration : IEntityTypeConfiguration<EventLog>
    {
        public void Configure(EntityTypeBuilder<EventLog> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("EventLog");
            builder.Property(p => p.Id).HasColumnName("Id").ValueGeneratedOnAdd().IsRequired();
            builder.Property(p => p.DataId).HasColumnName("DataId").IsRequired();
            builder.Property(p => p.DateTime).HasColumnName("DateTime").IsRequired();
            builder.Property(p => p.Data).HasColumnName("Data").IsRequired();
            builder.Property(p => p.EventLogDataType).HasColumnName("EventLogDataType").IsRequired().HasConversion<string>();
            builder.Property(p => p.WebSocketEvent).HasColumnName("WebSocketEvent").IsRequired().HasConversion<string>();
        }
    }
}
