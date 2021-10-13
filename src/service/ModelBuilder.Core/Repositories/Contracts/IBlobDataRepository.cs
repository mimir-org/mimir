using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Core.Repositories.Contracts
{
    public interface IBlobDataRepository : IGenericRepository<ModelBuilderDbContext, BlobData>
    {
    }
}
