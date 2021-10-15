using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.TypeEditor.Data.Contracts;

namespace Mb.TypeEditor.Data.Repositories
{
    public class CompositeTypeRepository : GenericRepository<ModelBuilderDbContext, CompositeType>, ICompositeTypeRepository
    {
        public CompositeTypeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
