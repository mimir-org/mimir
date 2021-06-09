using System.Threading.Tasks;
using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Data.Enums;

namespace Mb.Core.Repositories
{
    public class EnumBaseRepository: GenericRepository<ModelBuilderDbContext, EnumBase>, IEnumBaseRepository
    {
        public EnumBaseRepository(ModelBuilderDbContext dbContext) : base(dbContext)
        {
        }

        public async Task InitData()
        {
            var unit = new Unit
            {
                Name = "xxx"
            };

            var attributeCondition = new AttributeCondition
            {
                Name = "xxx"
            };

           await CreateAsync(unit);
           await CreateAsync(attributeCondition);

           await SaveAsync();
        }
    }
}
