﻿using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data.TypeEditor;

namespace Mb.TypeEditor.Data.Contracts
{
    public interface ICompositeTypeRepository : IGenericRepository<ModelBuilderDbContext, CompositeType>
    {
    }
}