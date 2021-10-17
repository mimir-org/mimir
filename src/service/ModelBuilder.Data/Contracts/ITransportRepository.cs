using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace Mb.Data.Contracts
{
    public interface ITransportRepository : IGenericRepository<ModelBuilderDbContext, Transport>
    {
        void UpdateInsert(Transport transport, EntityState entityState);
    }
}
