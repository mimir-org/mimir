using Mb.Core.Models;

namespace Mb.Core.Repositories
{
    public class EdgeRepository : GenericRepository<ModelBuilderDbContext, Edge>, IEdgeRepository
    {
        public EdgeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
