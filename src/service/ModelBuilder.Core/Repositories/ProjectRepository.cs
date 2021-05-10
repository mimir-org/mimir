using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories
{
    public class ProjectRepository : GenericRepository<ModelBuilderDbContext, Project>, IProjectRepository
    {
        public ProjectRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
