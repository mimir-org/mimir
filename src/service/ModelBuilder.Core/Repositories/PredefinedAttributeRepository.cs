using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories
{
    public class PredefinedAttributeRepository : GenericRepository<ModelBuilderDbContext, PredefinedAttribute>, IPredefinedAttributeRepository
    {
        public PredefinedAttributeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
