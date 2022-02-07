using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;

namespace Mb.Data.Repositories
{
    public class CollaborationPartnerRepository : GenericRepository<ModelBuilderDbContext, CollaborationPartner>, ICollaborationPartnerRepository
    {
        public CollaborationPartnerRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }
    }
}