using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace Mb.Data.Contracts
{
    public interface IInterfaceRepository : IGenericRepository<ModelBuilderDbContext, Interface>
    {
        void UpdateInsert(Interface inter, EntityState entityState);
    }
}