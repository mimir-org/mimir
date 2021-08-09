using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories
{
    public class InterfaceTypeRepository : GenericRepository<ModelBuilderDbContext, InterfaceType>, IInterfaceTypeRepository
    {
        public InterfaceTypeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
