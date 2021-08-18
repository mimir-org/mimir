using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories
{
    public class NodeTypeRepository : GenericRepository<ModelBuilderDbContext, NodeType>, INodeTypeRepository
    {
        public NodeTypeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
