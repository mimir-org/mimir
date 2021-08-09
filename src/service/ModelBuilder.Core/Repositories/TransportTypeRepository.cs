using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories
{
    public class TransportTypeRepository : GenericRepository<ModelBuilderDbContext, TransportType>, ITransportTypeRepository
    {
        public TransportTypeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
