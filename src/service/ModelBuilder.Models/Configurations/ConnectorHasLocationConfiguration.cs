using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class ConnectorFulfilledByConfiguration : IEntityTypeConfiguration<ConnectorFulfilledBy>
    {
        public void Configure(EntityTypeBuilder<ConnectorFulfilledBy> builder)
        {
        }
    }
}