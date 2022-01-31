using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data.TypeEditor;
using Mb.TypeEditor.Data.Contracts;

namespace Mb.TypeEditor.Data.Repositories
{
    public class SimpleTypeRepository : GenericRepository<ModelBuilderDbContext, SimpleType>, ISimpleTypeRepository
    {
        public SimpleTypeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}