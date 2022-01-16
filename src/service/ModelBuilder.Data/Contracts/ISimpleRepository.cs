using System.Collections.Generic;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace Mb.Data.Contracts
{
    public interface ISimpleRepository : IGenericRepository<ModelBuilderDbContext, Simple>
    {
        void AttachWithAttributes(ICollection<Simple> entities, EntityState state);
    }
}