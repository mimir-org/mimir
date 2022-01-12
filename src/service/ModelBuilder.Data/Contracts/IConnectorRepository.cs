using System.Collections.Generic;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace Mb.Data.Contracts
{
    public interface IConnectorRepository : IGenericRepository<ModelBuilderDbContext, Connector>
    {
        void AttachWithAttributes(ICollection<Connector> entities, EntityState state);
    }
}