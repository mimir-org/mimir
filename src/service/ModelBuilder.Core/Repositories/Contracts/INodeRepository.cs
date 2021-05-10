﻿using Mb.Models;
using Mb.Models.Data;

namespace Mb.Core.Repositories.Contracts
{
    public interface INodeRepository : IGenericRepository<ModelBuilderDbContext, Node>
    {
    }
}