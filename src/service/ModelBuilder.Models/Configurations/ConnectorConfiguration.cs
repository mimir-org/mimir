using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;

namespace Mb.Models.Configurations;

#region ConnectorConfiguration
public class ConnectorConfiguration : IEntityTypeConfiguration<ConnectorDm>
{
    public void Configure(EntityTypeBuilder<ConnectorDm> builder)
    {
        builder.HasKey(x => x.Id);
        builder.ToTable("Connector");
        builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
        builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
        builder.Property(p => p.Direction).HasColumnName("Direction").IsRequired();
        builder.Property(p => p.Inside).HasColumnName("Inside").IsRequired();
        builder.Property(p => p.Outside).HasColumnName("Outside").IsRequired();
        builder.Property(p => p.Block).HasColumnName("block").IsRequired();
    }
}
#endregion ConnectorConfiguration

#region ConnectorTerminalConfiguration
public class ConnectorTerminalConfiguration : IEntityTypeConfiguration<ConnectorTerminalDm>
{
    public void Configure(EntityTypeBuilder<ConnectorTerminalDm> builder)
    {
        builder.Property(p => p.TerminalType).HasColumnName("TerminalType").IsRequired();
        builder.Property(p => p.TerminalParentType).HasColumnName("TerminalParentType").IsRequired(false);
        builder.Property(p => p.Color).HasColumnName("Color").IsRequired();
    }
}
#endregion ConnectorTerminalConfiguration

#region ConnectorRelationConfiguration
public class ConnectorRelationConfiguration : IEntityTypeConfiguration<ConnectorRelationDm>
{
    public void Configure(EntityTypeBuilder<ConnectorRelationDm> builder)
    {
    }
}
#endregion ConnectorRelationConfiguration

#region ConnectorFulfilledByConfiguration
public class ConnectorFulfilledByConfiguration : IEntityTypeConfiguration<ConnectorFulfilledByDm>
{
    public void Configure(EntityTypeBuilder<ConnectorFulfilledByDm> builder)
    {
    }
}
#endregion ConnectorFulfilledByConfiguration

#region ConnectorHasLocationConfiguration
public class ConnectorHasLocationConfiguration : IEntityTypeConfiguration<ConnectorHasLocationDm>
{
    public void Configure(EntityTypeBuilder<ConnectorHasLocationDm> builder)
    {
    }
}
#endregion ConnectorHasLocationConfiguration

#region ConnectorPartOfConfiguration
public class ConnectorPartOfConfiguration : IEntityTypeConfiguration<ConnectorPartOfDm>
{
    public void Configure(EntityTypeBuilder<ConnectorPartOfDm> builder)
    {
    }
}
#endregion ConnectorPartOfConfiguration