using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories
{
    public class LibraryTypeComponentRepository : GenericRepository<ModelBuilderDbContext, LibraryTypeComponent>, ILibraryTypeComponentRepository

    {
    public LibraryTypeComponentRepository(ModelBuilderDbContext dbContext) : base(dbContext)
    {
    }
    }
}
