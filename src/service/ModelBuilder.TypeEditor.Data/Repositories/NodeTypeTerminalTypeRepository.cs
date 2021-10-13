using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.TypeEditor.Data.Contracts;

namespace Mb.TypeEditor.Data.Repositories
{
    public class NodeTypeTerminalTypeRepository : GenericRepository<ModelBuilderDbContext, NodeTypeTerminalType>, INodeTypeTerminalTypeRepository
    {
        public NodeTypeTerminalTypeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
