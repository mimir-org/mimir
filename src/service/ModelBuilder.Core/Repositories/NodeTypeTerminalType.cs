using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;

namespace Mb.Core.Repositories
{
    public class NodeTypeTerminalType : GenericRepository<ModelBuilderDbContext, NodeTypeTerminalType>, INodeTypeTerminalType
    {
        public NodeTypeTerminalType(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
