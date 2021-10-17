using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Data.Repositories
{
    public class ContractorRepository : GenericRepository<ModelBuilderDbContext, Contractor>, IContractorRepository
    {
        public ContractorRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
