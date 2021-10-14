using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data.Enums;

namespace Mb.TypeEditor.Data.Contracts
{
    public interface IEnumBaseRepository : IGenericRepository<ModelBuilderDbContext, EnumBase>
    {
        
    }
}
