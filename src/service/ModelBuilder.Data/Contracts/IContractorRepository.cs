﻿using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Data.Contracts
{
    public interface IContractorRepository : IGenericRepository<ModelBuilderDbContext, Contractor>
    {
    }
}