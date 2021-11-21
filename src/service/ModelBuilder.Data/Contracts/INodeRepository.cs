using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Workers;

namespace Mb.Data.Contracts
{
    public interface INodeRepository : IGenericRepository<ModelBuilderDbContext, Node>
    {
        void UpdateInsert(ProjectWorker projectWorker, ICollection<Node> original, Project project, string invokedByDomain);
        Task DeleteNodes(ProjectWorker projectWorker, ICollection<Node> delete, string projectId, string invokedByDomain);
    }
}
