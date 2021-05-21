using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Mb.Models.Data;
using Mb.Models.Enums;
using Microsoft.AspNetCore.Http;

namespace Mb.Core.Services.Contracts
{
    public interface ITypeEditorService
    {
        Task<LibraryType> GetTypeById(string id, bool ignoreNotFound = false);
        Dictionary<int, string> GetAspects();
        Dictionary<int, string> GetObjectTypes();
        IEnumerable<Rds> GetRds(Aspect aspect);
        IEnumerable<AttributeType> GetAttributeTypes(Aspect aspect);
        IEnumerable<TerminalType> GetTerminals();
        Task<LibraryType> CreateLibraryComponent(LibraryType libraryTypeComponent);
        IEnumerable<LibraryType> GetAllTypes();
        byte[] CreateFile();
        Task LoadDataFromFile(IFormFile file, CancellationToken cancellationToken);
        Task LoadDataFromFiles();
        Task DeleteType(string id);
        Task<AttributeType> CreateAttributeType(AttributeType attributeType);
    }
}
