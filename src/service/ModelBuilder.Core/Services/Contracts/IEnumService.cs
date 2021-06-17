using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Data.Enums;
using Mb.Models.Data.Enums.Mapping;

namespace Mb.Core.Services.Contracts
{
    public interface IEnumService
    {
        Task<EnumBase> CreateEnum(CreateEnum createEnum);
        IEnumerable<EnumBase> GetAllOfType(EnumType enumType);
    }
}
