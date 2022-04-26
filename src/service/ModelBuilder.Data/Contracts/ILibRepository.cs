using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Data.Enums;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Data.Contracts
{
    public interface ILibRepository
    {
        T GetObjectById<T>(string id) where T : EnumBase;
        IEnumerable<T> GetObject<T>() where T : EnumBase;
        void Untrack();

        // Type Library
        Task<List<AttributeQualifierLibCm>> GetAttributeQualifiers();
    }
}