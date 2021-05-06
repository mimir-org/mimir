﻿using Mb.Core.Repositories.Contracts;
using Mb.Models;

namespace Mb.Core.Repositories
{
    public class NodeRepository : GenericRepository<ModelBuilderDbContext, Node>, INodeRepository
    {
        public NodeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
