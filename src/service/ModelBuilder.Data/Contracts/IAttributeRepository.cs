using Mb.Models.Abstract;
using Mb.Models.Configurations;

namespace Mb.Data.Contracts
{
    public interface IAttributeRepository : IGenericRepository<ModelBuilderDbContext, Mb.Models.Data.Attribute>
    {
    }
}