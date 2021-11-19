using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Data.Repositories
{
    public class EventLogRepository : GenericRepository<ModelBuilderDbContext, EventLog>, IEventLogRepository
    {
        public EventLogRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
