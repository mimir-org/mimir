using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.TypeEditor.Data.Contracts;

namespace Mb.TypeEditor.Data.Repositories
{
    public class PredefinedAttributeRepository : GenericRepository<ModelBuilderDbContext, PredefinedAttribute>, IPredefinedAttributeRepository
    {
        public PredefinedAttributeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}