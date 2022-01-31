using System.Collections.Generic;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Enums;

namespace Mb.Data.Contracts
{
    public interface INodeRepository : IGenericRepository<ModelBuilderDbContext, Node>
    {
        IEnumerable<(Node node, WorkerStatus status)> UpdateInsert(ICollection<Node> original, Project project, string invokedByDomain);
        IEnumerable<(Node node, WorkerStatus status)> DeleteNodes(ICollection<Node> delete, string projectId, string invokedByDomain);
    }
}