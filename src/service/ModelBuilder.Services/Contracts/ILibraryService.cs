using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Application.TypeEditor;
using Mb.Models.Data.Enums;
using Mb.Models.Data.TypeEditor;
using Mb.Models.Enums;

namespace Mb.Services.Contracts
{
    public interface ILibraryService
    {
        Task<Library> GetLibTypes(string searchString);
        Task<IEnumerable<LibraryNodeItem>> GetNodeTypes();
        Task<IEnumerable<LibraryTransportItem>> GetTransportTypes();
        Task<IEnumerable<LibraryInterfaceItem>> GetInterfaceTypes();
        Task<IEnumerable<LibrarySubProjectItem>> GetSubProjects(string searchString = null);

        // Type Editor
        // TODO: Should be removed after type editor client is finished

        IEnumerable<AttributeType> GetAttributeTypes(Aspect aspect);
        IEnumerable<PredefinedAttributeAm> GetPredefinedAttributes();
        IEnumerable<BlobDataAm> GetBlobData();
        IEnumerable<EnumBase> GetAllOfType(EnumType enumType);
        IEnumerable<LocationTypeAm> GetAllLocationTypes();
        Task<LibraryType> GetTypeById(string id, bool ignoreNotFound = false);
        IEnumerable<CreateLibraryType> GetAllTypes();
        Task<IEnumerable<LibraryType>> CreateLibraryTypes(ICollection<CreateLibraryType> createLibraryTypes);
        Task<T> CreateLibraryType<T>(CreateLibraryType createLibraryType) where T : class, new();
        Task<T> UpdateLibraryType<T>(string id, CreateLibraryType createLibraryType, bool updateMajorVersion, bool updateMinorVersion) where T : class, new();
        Task DeleteType(string id);
        Task<CreateLibraryType> ConvertToCreateLibraryType(string id, LibraryFilter filter);
        Task<SimpleType> CreateSimpleType(SimpleTypeAm simpleType);
        Task CreateSimpleTypes(ICollection<SimpleTypeAm> simpleTypes);
        IEnumerable<SimpleType> GetSimpleTypes();
        void ClearAllChangeTracker();
        IEnumerable<Rds> GetRds();
        IEnumerable<TerminalType> GetTerminals();
        Dictionary<string, List<TerminalType>> GetTerminalsByCategory();
    }
}