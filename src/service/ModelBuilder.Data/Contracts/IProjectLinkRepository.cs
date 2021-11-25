using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Data;

namespace Mb.Data.Contracts
{
    public interface IProjectLinkRepository
    {
        Task<int> AddProjectNode(ProjectNodeItem projectNode);
        Task<int> AddProjectEdge(ProjectEdge projectEdge);
        Task<int> AddProjectNodes(List<ProjectNodeItem> projectNodes);
        Task<int> AddProjectEdges(List<ProjectEdge> projectEdges);
        IEnumerable<ProjectNodeItem> GetProjectNodes();
    }
}
