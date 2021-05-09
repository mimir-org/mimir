using Mb.Core.Repositories.Contracts;
using Mb.Models;
using Mb.Models.Data;

namespace Mb.Core.Repositories
{
    public class ConnectorRepository : GenericRepository<ModelBuilderDbContext, Connector>, IConnectorRepository
    {
        public ConnectorRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
