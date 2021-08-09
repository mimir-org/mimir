using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories
{
    public class InterfaceRepository : GenericRepository<ModelBuilderDbContext, Interface>, IInterfaceRepository
    {
        public InterfaceRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
