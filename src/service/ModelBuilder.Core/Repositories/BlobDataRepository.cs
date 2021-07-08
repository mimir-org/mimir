using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories
{
    public class BlobDataRepository : GenericRepository<ModelBuilderDbContext, BlobData>, IBlobDataRepository
    {
        public BlobDataRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
