using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace Mb.Core.Repositories
{
    public class EdgeRepository : GenericRepository<ModelBuilderDbContext, Edge>, IEdgeRepository
    {
        public EdgeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }

        public async Task UpdateInsert(IList<Edge> original, Project project)
        {
            if (project?.Edges == null || !project.Edges.Any())
                return;

            var updates = original != null
                ? project.Edges.Where(x => original.All(y => y.Id != x.Id)).ToList()
                : new List<Edge>();

            foreach (var edge in project.Edges)
            {
                Attach(edge, updates.Any(x => x.Id == edge.Id) ? EntityState.Added : EntityState.Modified);
            }

            await SaveAsync();

            foreach (var edge in project.Edges)
            {
                Detach(edge);
            }
        }

        public async Task DeleteEdges(IList<Edge> delete)
        {
            foreach (var edge in delete)
            {
                await Delete(edge.Id);
            }

            await SaveAsync();

            foreach (var edge in delete)
            {
                Detach(edge);
            }
        }
    }
}
