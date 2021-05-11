using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories
{
    public class AttributeRepository : GenericRepository<ModelBuilderDbContext, Attribute>, IAttributeRepository
    {
        public AttributeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
