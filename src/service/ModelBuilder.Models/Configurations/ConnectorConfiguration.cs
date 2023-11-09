using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;

namespace Mb.Models.Configurations;

//#region ConnectorConfiguration
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
        builder.Property(p => p.Block).HasColumnName("Block").IsRequired();
        builder.Property(p => p.Discriminator).HasColumnName("Discriminator").IsRequired();
    }
}
//#endregion ConnectorConfiguration

//#region ConnectorTerminalConfiguration
//public class ConnectorTerminalConfiguration : IEntityTypeConfiguration<ConnectorDm>
//{
//    public void Configure(EntityTypeBuilder<ConnectorDm> builder)
//    {
//        builder.Property(p => p.TerminalType).HasColumnName("TerminalType").IsRequired();
//    }
//}
//#endregion ConnectorTerminalConfiguration

//#region ConnectorRelationConfiguration
//public class ConnectorRelationConfiguration : IEntityTypeConfiguration<ConnectorDm>
//{
//    public void Configure(EntityTypeBuilder<ConnectorDm> builder)
//    {
//    }
//}
//#endregion ConnectorRelationConfiguration

//#region ConnectorFulfilledByConfiguration
//public class ConnectorFulfilledByConfiguration : IEntityTypeConfiguration<ConnectorDm>
//{
//    public void Configure(EntityTypeBuilder<ConnectorDm> builder)
//    {
//    }
//}
//#endregion ConnectorFulfilledByConfiguration

//#region ConnectorHasLocationConfiguration
//public class ConnectorHasLocationConfiguration : IEntityTypeConfiguration<ConnectorDm>
//{
//    public void Configure(EntityTypeBuilder<ConnectorDm> builder)
//    {
//    }
//}
//#endregion ConnectorHasLocationConfiguration

//#region ConnectorPartOfConfiguration
//public class ConnectorPartOfConfiguration : IEntityTypeConfiguration<ConnectorPartOfDm>
//{
//    public void Configure(EntityTypeBuilder<ConnectorPartOfDm> builder)
//    {
//    }
//}
//#endregion ConnectorPartOfConfiguration