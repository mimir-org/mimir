using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories
{
    public class ContractorRepository : GenericRepository<ModelBuilderDbContext, Contractor>, IContractorRepository
    {
        public ContractorRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
