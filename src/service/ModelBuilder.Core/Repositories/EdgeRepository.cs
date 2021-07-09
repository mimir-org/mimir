using System;
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

        public IEnumerable<Edge> UpdateInsert(ICollection<Edge> original, Project project)
        {
            if (project?.Edges == null || !project.Edges.Any())
                yield break;

            var updates = original != null
                ? project.Edges.Where(x => original.All(y => y.Id != x.Id)).ToList()
                : new List<Edge>();

            foreach (var edge in project.Edges)
            {
                if (updates.Any(x => x.Id == edge.Id))
                {
                    if (edge.MasterProjectId != project.Id)
                    {
                        Attach(edge, EntityState.Unchanged);
                        yield return edge;
                        continue;
                    }

                    Attach(edge, EntityState.Added);
                }
                else
                {
                    if (edge.MasterProjectId != project.Id)
                        continue;

                    Attach(edge, EntityState.Modified);
                }
            }
        }

        public async Task<IEnumerable<Edge>> DeleteEdges(ICollection<Edge> delete, string projectId)
        {
            var subEdges = new List<Edge>();

            foreach (var edge in delete)
            {
                if (edge.MasterProjectId != projectId)
                {
                    subEdges.Add(edge);
                    continue;
                }

                await Delete(edge.Id);
            }

            return subEdges;
        }
    }
}
