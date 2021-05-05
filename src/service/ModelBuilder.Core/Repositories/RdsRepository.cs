using Mb.Core.Repositories.Contracts;
using Mb.Models;

namespace Mb.Core.Repositories
{
    public class RdsRepository : GenericRepository<ModelBuilderDbContext, Rds>, IRdsRepository
    {
        public RdsRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
