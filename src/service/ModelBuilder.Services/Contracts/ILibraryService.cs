using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Services.Contracts
{
    public interface ILibraryService
    {
        //Task<Library> GetLibTypes(string searchString);
        Task<List<NodeLibCm>> GetNodeTypes(string searchString);
        Task<List<TransportLibCm>> GetTransportTypes(string searchString);
        Task<List<InterfaceLibCm>> GetInterfaceTypes(string searchString);
        Task<IEnumerable<LibrarySubProjectItem>> GetSubProjects(string searchString = null);

        // Type Editor
        // TODO: Should be removed after type editor client is finished
        //Task<List<AttributeQualifier>> GetAttributeQualifiers();
        //Task<List<AttributeSource>> GetAttributeSources();
        //Task<List<AttributeFormat>> GetAttributeFormats();
        //Task<List<AttributeCondition>> GetAttributeConditions();
        //Task<List<Purpose>> GetPurposes();
        //Task<List<LocationTypeAm>> GetAspectAttributes();
        //Task<List<Unit>> GetUnits();
        //Task<List<AttributeType>> GetAttributeTypes(Aspect aspect);
        //Task<List<BlobDataAm>> GetSymbols();
        //Task<List<SimpleType>> GetSimpleTypes();
        //Task<List<PredefinedAttributeAm>> GetPredefinedAttributes();
        //Task<ICollection<Rds>> GetRds();
        //Task<List<TerminalType>> GetTerminals();
        //Dictionary<string, List<TerminalType>> GetTerminalsByCategory();

        // Create, edit and delete
        //Task<LibraryNodeItem> CreateNodeType(CreateLibraryType createLibraryType);
        //Task<LibraryTransportItem> CreateTransportType(CreateLibraryType createLibraryType);
        //Task<LibraryInterfaceItem> CreateInterfaceType(CreateLibraryType createLibraryType);

        //Task<LibraryNodeItem> UpdateNodeItem(string id, CreateLibraryType createLibraryType);
        //Task<LibraryTransportItem> UpdateTransportItem(string id, CreateLibraryType createLibraryType);
        //Task<LibraryInterfaceItem> UpdateInterfaceItem(string id, CreateLibraryType createLibraryType);

        //Task DeleteType(string id);
        //Task<CreateLibraryType> ConvertToCreateLibraryType(string id, LibraryFilter filter);
    }
}