using Mb.Core.Repositories.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories
{
    public class RdsRepository : GenericRepository<ModelBuilderDbContext, Rds>, IRdsRepository
    {
        public RdsRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
