using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Application.Enums;
using Mb.Models.Data;
using Mb.Models.Enums;
using Microsoft.AspNetCore.Http;

namespace Mb.Core.Services.Contracts
{
    public interface ITypeEditorService
    {
        Task<LibraryType> GetTypeById(string id, bool ignoreNotFound = false);
        Dictionary<int, string> GetStatuses();
        Dictionary<int, string> GetAspects();
        Dictionary<int, string> GetObjectTypes();
        IEnumerable<Rds> GetRds(Aspect aspect);
        IEnumerable<PredefinedAttributeAm> GetPredefinedAttributes();
        IEnumerable<AttributeType> GetAttributeTypes(Aspect aspect);
        IEnumerable<TerminalType> GetTerminals();
        Dictionary<string, List<TerminalType>> GetTerminalsByCategory();
        Task<IEnumerable<LibraryType>> CreateLibraryTypes(ICollection<CreateLibraryType> createLibraryTypes);
        Task<LibraryType> CreateLibraryType(CreateLibraryType createLibraryType);
        Task<LibraryType> UpdateLibraryType(string id, CreateLibraryType createLibraryType);
        IEnumerable<CreateLibraryType> GetAllTypes();
        Task<CreateLibraryType> ConvertToCreateLibraryType(string id, LibraryFilter filter);
        byte[] CreateFile();
        Task LoadDataFromFile(IFormFile file, CancellationToken cancellationToken);
        Task DeleteType(string id);
        Task<AttributeType> CreateAttributeType(CreateAttributeType createAttributeType);
        Task<List<AttributeType>> CreateAttributeTypes(List<CreateAttributeType> attributeTypes);
        Task<TerminalType> CreateTerminalType(CreateTerminalType createTerminalType);
        Task<List<TerminalType>> CreateTerminalTypes(List<CreateTerminalType> createTerminalTypes);
        Task<Rds> CreateRds(CreateRds createRds);
        Task<List<Rds>> CreateRdsAsync(List<CreateRds> createRds);
        Task<List<PredefinedAttribute>> CreatePredefinedAttributes(List<PredefinedAttribute> attributes);
        Task CreateContractorsAsync(IEnumerable<Contractor> contractors);
    }
}
