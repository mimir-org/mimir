﻿using System.Collections.Generic;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace Mb.Data.Contracts
{
    public interface ICompositeRepository : IGenericRepository<ModelBuilderDbContext, Composite>
    {
        void AttachWithAttributes(ICollection<Composite> entities, EntityState state);
    }
}