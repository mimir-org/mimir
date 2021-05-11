using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories.Contracts
{
    public interface IConnectorRepository : IGenericRepository<ModelBuilderDbContext, Connector>
    {
    }
}
