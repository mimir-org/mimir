using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Core.Services.Contracts
{
    public interface IEnumService
    {
        Task<EnumBase> CreateEnum(CreateEnum createEnum);
    }
}
