using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.TypeEditor.Data.Contracts
{
    public interface ITransportTypeRepository : IGenericRepository<ModelBuilderDbContext, TransportType>
    {
    }
}
