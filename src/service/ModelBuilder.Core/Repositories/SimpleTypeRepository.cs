using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories
{
    public class CompositeTypeRepository : GenericRepository<ModelBuilderDbContext, CompositeType>, ICompositeTypeRepository
    {
        public CompositeTypeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
