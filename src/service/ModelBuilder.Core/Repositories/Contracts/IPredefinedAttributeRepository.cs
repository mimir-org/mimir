using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories.Contracts
{
    public interface IPredefinedAttributeRepository : IGenericRepository<ModelBuilderDbContext, PredefinedAttribute>
    {
    }
}
