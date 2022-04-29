using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Data.Enums;
using Mb.Models.Data.TypeEditor;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Data.Contracts
{
    public interface ILibraryRepository
    {
        T GetObjectById<T>(string id) where T : EnumBase;
        IEnumerable<T> GetObject<T>() where T : EnumBase;
        void Untrack();

        // Type Library
        Task<List<AttributeQualifierLibCm>> GetAttributeQualifiers();
        Task<List<AttributeSourceLibCm>> GetAttributeSources();

        Task<IEnumerable<LibraryNodeItem>> GetNodeTypes(string searchString = null);
        Task<IEnumerable<LibraryInterfaceItem>> GetInterfaceTypes(string searchString = null);
        Task<IEnumerable<LibraryTransportItem>> GetTransportTypes(string searchString = null);
        Task<T> GetLibraryItem<T>(string id) where T : class, new();
        void ClearAllChangeTracker();
        Task<IEnumerable<Rds>> GetRds();
    }
}