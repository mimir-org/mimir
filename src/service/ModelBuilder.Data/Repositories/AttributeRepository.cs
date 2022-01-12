using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Data.Repositories
{
    public class AttributeRepository : GenericRepository<ModelBuilderDbContext, Attribute>, IAttributeRepository
    {
        public AttributeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}