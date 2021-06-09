using System.Threading.Tasks;
using Mb.Core.Extensions;
using Mb.Core.Repositories.Contracts;
using Mb.Core.Services.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Core.Services
{
    public class EnumService : IEnumService
    {
        private readonly IEnumBaseRepository _enumBaseRepository;

        public EnumService(IEnumBaseRepository enumBaseRepository)
        {
            _enumBaseRepository = enumBaseRepository;
        }


        public async Task<EnumBase> CreateEnum(CreateEnum createEnum)
        {
            var enumToDb = createEnum.CreateEnum();
            await _enumBaseRepository.CreateAsync(enumToDb);
            await _enumBaseRepository.SaveAsync();
            return enumToDb;
        }
    }
}
