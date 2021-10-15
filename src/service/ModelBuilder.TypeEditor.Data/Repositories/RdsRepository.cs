using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.TypeEditor.Data.Contracts;

namespace Mb.TypeEditor.Data.Repositories
{
    public class RdsRepository : GenericRepository<ModelBuilderDbContext, Rds>, IRdsRepository
    {
        public RdsRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
