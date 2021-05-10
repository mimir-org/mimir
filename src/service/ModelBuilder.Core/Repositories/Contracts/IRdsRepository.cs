using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories.Contracts
{
    public interface IRdsRepository : IGenericRepository<ModelBuilderDbContext, Rds>
    {
    }
}
