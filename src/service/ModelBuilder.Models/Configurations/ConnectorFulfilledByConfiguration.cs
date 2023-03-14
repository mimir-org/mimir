using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mb.Models.Configurations
{
    public class ConnectionFulfilledByConfiguration : IEntityTypeConfiguration<ConnectionFulfilledBy>
    {
        public void Configure(EntityTypeBuilder<ConnectionFulfilledBy> builder)
        {
        }
    }
}