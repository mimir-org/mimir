using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Data.Repositories;

public class VersionRepository : GenericRepository<ModelBuilderDbContext, Version>, IVersionRepository
{
    public VersionRepository(ModelBuilderDbContext dbContext) : base(dbContext)
    {
    }
}