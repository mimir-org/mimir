using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;

namespace Mb.Data.Repositories;

public class ModelBuilderProcRepository : ProcRepository<ModelBuilderDbContext>, IModelBuilderProcRepository
{
    public ModelBuilderProcRepository(ModelBuilderDbContext dbContext) : base(dbContext)
    {
    }
}