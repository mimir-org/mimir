using System.Threading.Tasks;
using Mb.Models.Configurations;
using Mb.Models.Data.Enums;

namespace Mb.Core.Repositories.Contracts
{
    public interface IEnumBaseRepository : IGenericRepository<ModelBuilderDbContext, EnumBase>
    {
        Task InitData();
    }
}
