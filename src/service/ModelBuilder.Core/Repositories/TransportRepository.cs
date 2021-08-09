using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories
{
    public class TransportRepository : GenericRepository<ModelBuilderDbContext, Transport>, ITransportRepository
    {
        public TransportRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
