using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mb.Core.Extensions;
using Mb.Core.Repositories.Contracts;
using Mb.Core.Services.Contracts;
using Mb.Models.Application;
using Mb.Models.Data.Enums;
using Mb.Models.Data.Enums.Mapping;

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

        public IEnumerable<EnumBase> GetAllOfType(EnumType enumType)
        {
            var enumT = enumType.GetEnumTypeFromEnum();
            var method = typeof(Queryable).GetMethod("OfType");
            var generic = method?.MakeGenericMethod(new Type[] { enumT });
            var result = (IEnumerable<EnumBase>)generic?.Invoke(null, new object[] { _enumBaseRepository.GetAll() });
            return result?.ToList();
        }

        public IEnumerable<LocationTypeAm> GetAllLocationTypes()
        {
            var locationTypes = GetAllOfType(EnumType.PredefinedAttributeCategory).OfType<PredefinedAttributeCategory>().OrderBy(x => x.Name).ToList();
            var mainTypes = locationTypes.Where(x => x.ParentId == null).ToList();
            foreach (var category in mainTypes)
            {
                var locationType = ConvertLocationType(category);
                locationType.LocationSubTypes = locationTypes.Where(x => x.ParentId == category.Id).OrderBy(x => category.Name).Select(ConvertLocationType).ToList();
                yield return locationType;
            }
        }

        private LocationTypeAm ConvertLocationType(PredefinedAttributeCategory category)
        {
            return new()
            {
                Id = category.Id,
                Description = category.Description,
                Name = category.Name,
                SemanticReference = category.SemanticReference,
                LocationSubTypes = new List<LocationTypeAm>()
            };
        }
    }
}
