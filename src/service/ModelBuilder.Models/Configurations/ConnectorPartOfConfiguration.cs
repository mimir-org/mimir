using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class ConnectorPartOfConfiguration : IEntityTypeConfiguration<ConnectorPartOf>
    {
        public void Configure(EntityTypeBuilder<ConnectorPartOf> builder)
        {
        }
    }
}