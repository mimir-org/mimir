﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories.Contracts
{
    public interface IEdgeRepository : IGenericRepository<ModelBuilderDbContext, Edge>
    {
        IEnumerable<Edge> UpdateInsert(ICollection<Edge> original, Project project);
        Task<IEnumerable<Edge>> DeleteEdges(ICollection<Edge> delete, string projectId);
    }
}
