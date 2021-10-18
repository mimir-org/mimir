﻿using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data.TypeEditor;
using Mb.TypeEditor.Data.Contracts;

namespace Mb.TypeEditor.Data.Repositories
{
    public class TerminalTypeRepository : GenericRepository<ModelBuilderDbContext, TerminalType>, ITerminalTypeRepository
    {
        public TerminalTypeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}