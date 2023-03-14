using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class ConnectorHasLocationConfiguration : IEntityTypeConfiguration<ConnectorHasLocation>
    {
        public void Configure(EntityTypeBuilder<ConnectorHasLocation> builder)
        {
        }
    }
}