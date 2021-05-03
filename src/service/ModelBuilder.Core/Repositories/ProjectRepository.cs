using Mb.Models;

namespace Mb.Core.Repositories
{
    public class ProjectRepository : GenericRepository<ModelBuilderDbContext, Project>, IProjectRepository
    {
        public ProjectRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
