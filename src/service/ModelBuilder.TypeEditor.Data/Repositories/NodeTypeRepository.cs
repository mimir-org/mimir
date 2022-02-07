using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data.TypeEditor;
using Mb.TypeEditor.Data.Contracts;

namespace Mb.TypeEditor.Data.Repositories
{
    public class NodeTypeRepository : GenericRepository<ModelBuilderDbContext, NodeType>, INodeTypeRepository
    {
        public NodeTypeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}