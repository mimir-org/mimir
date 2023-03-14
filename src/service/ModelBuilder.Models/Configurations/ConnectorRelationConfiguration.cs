using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class ConnectorRelationConfiguration : IEntityTypeConfiguration<ConnectorRelation>
    {
        public void Configure(EntityTypeBuilder<ConnectorRelation> builder)
        {
        }
    }
}