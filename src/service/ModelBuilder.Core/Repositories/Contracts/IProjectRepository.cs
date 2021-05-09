using Mb.Models;
using Mb.Models.Data;

namespace Mb.Core.Repositories.Contracts
{
    public interface IProjectRepository : IGenericRepository<ModelBuilderDbContext, Project>
    {
    }
}
