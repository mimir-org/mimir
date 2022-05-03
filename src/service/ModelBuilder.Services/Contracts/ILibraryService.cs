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
        Task<List<LibraryNodeItem>> GetNodeTypes(string searchString);
        Task<List<LibraryTransportItem>> GetTransportTypes(string searchString);
        Task<List<LibraryInterfaceItem>> GetInterfaceTypes(string searchString);
        Task<IEnumerable<LibrarySubProjectItem>> GetSubProjects(string searchString = null);

        // Type Editor
        // TODO: Should be removed after type editor client is finished
        Task<List<AttributeQualifier>> GetAttributeQualifiers();
        Task<List<AttributeSource>> GetAttributeSources();
        Task<List<AttributeFormat>> GetAttributeFormats();
        Task<List<AttributeCondition>> GetAttributeConditions();
        Task<List<Purpose>> GetPurposes();
        Task<List<LocationTypeAm>> GetAspectAttributes();
        Task<List<Unit>> GetUnits();
        Task<List<AttributeType>> GetAttributeTypes(Aspect aspect);
        Task<List<BlobDataAm>> GetBlobData();
        Task<List<SimpleType>> GetSimpleTypes();
        Task<List<PredefinedAttributeAm>> GetPredefinedAttributes();
        Task<ICollection<Rds>> GetRds();
        IEnumerable<TerminalType> GetTerminals();
        Dictionary<string, List<TerminalType>> GetTerminalsByCategory();

        // Create, edit and delete
        Task<LibraryType> GetTypeById(string id, bool ignoreNotFound = false);
        IEnumerable<CreateLibraryType> GetAllTypes();
        Task<IEnumerable<LibraryType>> CreateLibraryTypes(ICollection<CreateLibraryType> createLibraryTypes);
        Task<T> CreateLibraryType<T>(CreateLibraryType createLibraryType) where T : class, new();
        Task<T> UpdateLibraryType<T>(string id, CreateLibraryType createLibraryType, bool updateMajorVersion, bool updateMinorVersion) where T : class, new();
        Task DeleteType(string id);
        Task<CreateLibraryType> ConvertToCreateLibraryType(string id, LibraryFilter filter);
    }
}