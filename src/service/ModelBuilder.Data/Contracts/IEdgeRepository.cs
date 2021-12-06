using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Enums;

namespace Mb.Data.Contracts
{
    public interface IEdgeRepository : IGenericRepository<ModelBuilderDbContext, Edge>
    {
        IEnumerable<(Edge edge, WorkerStatus status)> UpdateInsert(ICollection<Edge> original, Project project, string invokedByDomain);
        Task<IEnumerable<(Edge edge, WorkerStatus status)>> DeleteEdges(ICollection<Edge> delete, string projectId, string invokedByDomain);
    }
}
