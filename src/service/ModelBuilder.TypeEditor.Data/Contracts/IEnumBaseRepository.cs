using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data.TypeEditor.EnumTypes;

namespace Mb.TypeEditor.Data.Contracts
{
    public interface IEnumBaseRepository : IGenericRepository<ModelBuilderDbContext, EnumBase>
    {
        
    }
}
