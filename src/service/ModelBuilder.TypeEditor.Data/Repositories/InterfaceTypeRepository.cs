using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.TypeEditor.Data.Contracts;

namespace Mb.TypeEditor.Data.Repositories
{
    public class InterfaceTypeRepository : GenericRepository<ModelBuilderDbContext, InterfaceType>, IInterfaceTypeRepository
    {
        public InterfaceTypeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
