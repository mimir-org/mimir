using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories.Contracts
{
    public interface IEdgeRepository : IGenericRepository<ModelBuilderDbContext, Edge>
    {
        Task UpdateInsert(ICollection<Edge> original, Project project);
        Task DeleteEdges(ICollection<Edge> delete);
    }
}
