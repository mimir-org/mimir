﻿using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories
{
    public class NodeRepository : GenericRepository<ModelBuilderDbContext, Node>, INodeRepository
    {
        public NodeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
