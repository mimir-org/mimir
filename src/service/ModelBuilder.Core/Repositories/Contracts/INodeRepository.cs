using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories.Contracts
{
    public interface INodeRepository : IGenericRepository<ModelBuilderDbContext, Node>
    {
        Task UpdateInsert(IList<Node> original, Project project);
        Task DeleteNodes(IList<Node> delete);
    }
}
