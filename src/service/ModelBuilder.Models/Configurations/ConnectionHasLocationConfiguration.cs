using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class ConnectionHasLocationConfiguration : IEntityTypeConfiguration<ConnectionHasLocation>
    {
        public void Configure(EntityTypeBuilder<ConnectionHasLocation> builder)
        {
        }
    }
}