using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories
{
    public class AttributeTypeRepository : GenericRepository<ModelBuilderDbContext, AttributeType>, IAttributeTypeRepository
    {
        public AttributeTypeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
