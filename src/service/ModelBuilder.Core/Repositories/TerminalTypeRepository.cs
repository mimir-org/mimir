using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories
{
    public class TerminalTypeRepository : GenericRepository<ModelBuilderDbContext, TerminalType>, ITerminalTypeRepository
    {
        public TerminalTypeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
