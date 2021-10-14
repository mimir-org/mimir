using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Application.TypeEditor;
using Mb.Models.Data.Enums;
using Mb.Models.Data.Enums.Mapping;

namespace Mb.TypeEditor.Data.Contracts
{
    public interface IEnumService
    {
        Task<EnumBase> CreateEnum(CreateEnum createEnum);
        IEnumerable<EnumBase> GetAllOfType(EnumType enumType);
        IEnumerable<LocationTypeAm> GetAllLocationTypes();
    }
}
