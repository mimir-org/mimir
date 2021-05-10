﻿using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories
{
    public class EdgeRepository : GenericRepository<ModelBuilderDbContext, Edge>, IEdgeRepository
    {
        public EdgeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
