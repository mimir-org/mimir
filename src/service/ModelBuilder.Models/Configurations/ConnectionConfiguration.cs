using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations;

#region ConnectionConfiguration
public class ConnectionConfiguration : IEntityTypeConfiguration<ConnectionDm>
{
    public void Configure(EntityTypeBuilder<ConnectionDm> builder)
    {
        builder.HasKey(x => x.Id);
        builder.ToTable("Connection");
        builder.Property(p => p.Id).HasColumnName("Id").IsRequired();
        builder.Property(p => p.Project).HasColumnName("Project").IsRequired();
        builder.Property(p => p.FromConnector).HasColumnName("FromConnector").IsRequired();
        builder.Property(p => p.ToConnector).HasColumnName("ToConnector").IsRequired();
        builder.Property(p => p.MainProject).HasColumnName("MainProject").IsRequired();
        builder.Property(p => p.Handles).HasColumnName("Handles").IsRequired(false);
    }
}
#endregion ConnectionConfiguration

#region ConnectionTerminalConfiguration
public class ConnectionTerminalConfiguration : IEntityTypeConfiguration<ConnectionTerminalDm>
{
    public void Configure(EntityTypeBuilder<ConnectionTerminalDm> builder)
    {
        builder.Property(p => p.TerminalType).HasColumnName("TerminalType").IsRequired();
        builder.Property(p => p.TerminalParentType).HasColumnName("TerminalParentType");
    }
}
#endregion ConnectionTerminalConfiguration

#region ConnectionRelationConfiguration
public class ConnectionRelationConfiguration : IEntityTypeConfiguration<ConnectionRelationDm>
{
    public void Configure(EntityTypeBuilder<ConnectionRelationDm> builder)
    {
    }
}
#endregion ConnectionRelationConfiguration

#region ConnectionFulfilledByConfiguration
public class ConnectionFulfilledByConfiguration : IEntityTypeConfiguration<ConnectionFulfilledByDm>
{
    public void Configure(EntityTypeBuilder<ConnectionFulfilledByDm> builder)
    {
    }
}
#endregion ConnectionFulfilledByConfiguration

#region ConnectionHasLocationConfiguration
public class ConnectionHasLocationConfiguration : IEntityTypeConfiguration<ConnectionHasLocationDm>
{
    public void Configure(EntityTypeBuilder<ConnectionHasLocationDm> builder)
    {
    }
}
#endregion ConnectionHasLocationConfiguration

#region ConnectionPartOfConfiguration
public class ConnectionPartOfConfiguration : IEntityTypeConfiguration<ConnectionPartOfDm>
{
    public void Configure(EntityTypeBuilder<ConnectionPartOfDm> builder)
    {
    }
}
#endregion ConnectionPartOfConfiguration