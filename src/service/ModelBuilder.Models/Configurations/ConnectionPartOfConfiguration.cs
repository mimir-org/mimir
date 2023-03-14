using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class ConnectionPartOfConfiguration : IEntityTypeConfiguration<ConnectionPartOf>
    {
        public void Configure(EntityTypeBuilder<ConnectionPartOf> builder)
        {
        }
    }
}