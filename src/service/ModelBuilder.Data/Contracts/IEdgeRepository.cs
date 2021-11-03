using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Data.Contracts
{
    public interface IEdgeRepository : IGenericRepository<ModelBuilderDbContext, Edge>
    {
        IEnumerable<Edge> UpdateInsert(ICollection<Edge> original, Project project, string invokedByDomain);
        Task<IEnumerable<Edge>> DeleteEdges(ICollection<Edge> delete, string projectId, string invokedByDomain);
    }
}
