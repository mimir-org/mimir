using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories
{
    public class LibraryTypeRepository : GenericRepository<ModelBuilderDbContext, LibraryType>, ILibraryTypeRepository

    {
        public LibraryTypeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
