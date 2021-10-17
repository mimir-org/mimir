using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data.TypeEditor;
using Mb.TypeEditor.Data.Contracts;

namespace Mb.TypeEditor.Data.Repositories
{
    public class TransportTypeRepository : GenericRepository<ModelBuilderDbContext, TransportType>, ITransportTypeRepository
    {
        public TransportTypeRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}
