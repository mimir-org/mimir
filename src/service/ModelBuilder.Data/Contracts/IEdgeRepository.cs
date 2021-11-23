using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Workers;

namespace Mb.Data.Contracts
{
    public interface IEdgeRepository : IGenericRepository<ModelBuilderDbContext, Edge>
    {
        Task UpdateInsert(ProjectWorker projectWorker, ICollection<Edge> original, Project project, string invokedByDomain);
        Task DeleteEdges(ProjectWorker projectWorker, ICollection<Edge> delete, string projectId, string invokedByDomain);
    }
}
