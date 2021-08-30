using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories
{
    public class NodeTypeTerminalTypeRepository : GenericRepository<ModelBuilderDbContext, NodeTypeTerminalType>, INodeTypeTerminalTypeRepository
    {
        public NodeTypeTerminalTypeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
