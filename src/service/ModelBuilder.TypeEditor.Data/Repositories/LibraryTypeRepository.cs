using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data.TypeEditor;
using Mb.TypeEditor.Data.Contracts;

namespace Mb.TypeEditor.Data.Repositories
{
    public class LibraryTypeRepository : GenericRepository<ModelBuilderDbContext, LibraryType>, ILibraryTypeRepository

    {
        public LibraryTypeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}