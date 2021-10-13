using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.TypeEditor.Data.Contracts
{
    public interface INodeTypeRepository : IGenericRepository<ModelBuilderDbContext, NodeType>
    {
    }
}
