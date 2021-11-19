using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Data.Contracts
{
    public interface IEventLogRepository : IGenericRepository<ModelBuilderDbContext, EventLog>
    {
    }
}
