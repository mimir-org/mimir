﻿using System.Threading.Tasks;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories.Contracts
{
    public interface IEnumBaseRepository : IGenericRepository<ModelBuilderDbContext, EnumBase>
    {
        Task InitData();
    }
}