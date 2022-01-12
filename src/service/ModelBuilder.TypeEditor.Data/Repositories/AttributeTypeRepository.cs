using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data.TypeEditor;
using Mb.TypeEditor.Data.Contracts;

namespace Mb.TypeEditor.Data.Repositories
{
    public class AttributeTypeRepository : GenericRepository<ModelBuilderDbContext, AttributeType>, IAttributeTypeRepository
    {
        public AttributeTypeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}