using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace Mb.Data.Repositories
{
    public class ProjectLinkRepository : IProjectLinkRepository
    {
        private readonly ModelBuilderDbContext _modelBuilderDbContext;

        public ProjectLinkRepository(ModelBuilderDbContext modelBuilderDbContext)
        {
            _modelBuilderDbContext = modelBuilderDbContext;
        }

        public async Task<int> AddProjectNode(ProjectNodeItem projectNode)
        {
            var count = await _modelBuilderDbContext.Database.ExecuteSqlRawAsync("[dbo].[AddNodeToProject] @ProjectId, @NodeId", projectNode.CreateParameters());
            return count;
        }

        public async Task<int> AddProjectEdge(ProjectEdge projectEdge)
        {
            var count = await _modelBuilderDbContext.Database.ExecuteSqlRawAsync("[dbo].[AddEdgeToProject] @ProjectId, @EdgeId", projectEdge.CreateParameters());
            return count;
        }

        public async Task<int> AddProjectNodes(List<ProjectNodeItem> projectNodes)
        {
            var counter = 0;
            foreach (var projectNode in projectNodes)
            {
                var count = await AddProjectNode(projectNode);
                counter += count;
            }

            return counter;
        }

        public async Task<int> AddProjectEdges(List<ProjectEdge> projectEdges)
        {
            var counter = 0;
            foreach (var projectEdge in projectEdges)
            {
                var count = await AddProjectEdge(projectEdge);
                counter += count;
            }

            return counter;
        }

        public IEnumerable<ProjectNodeItem> GetProjectNodes()
        {
            var items = _modelBuilderDbContext.ProjectNodeItems.ToList();
            return items;
        }
    }
}
