using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Data;

namespace Mb.Data.Contracts
{
    public interface IProjectLinkRepository
    {
        Task<int> AddProjectNode(ProjectNode projectNode);
        Task<int> AddProjectEdge(ProjectEdge projectEdge);
        Task<int> AddProjectNodes(List<ProjectNode> projectNodes);
        Task<int> AddProjectEdges(List<ProjectEdge> projectEdges);
    }
}
