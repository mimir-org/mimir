﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories.Contracts
{
    public interface INodeRepository : IGenericRepository<ModelBuilderDbContext, Node>
    {
        IEnumerable<Node> UpdateInsert(ICollection<Node> original, Project project);
        Task<IEnumerable<Node>> DeleteNodes(ICollection<Node> delete, string projectId);
    }
}
